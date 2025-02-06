# Hosting JavaScript and TypeScript Applications on Azure Container Apps: Key Considerations

As a seasoned developer venturing into Azure Container Apps for hosting your JavaScript and TypeScript applications, there are several hosting issues you need to be aware of. This article covers configuration, security, deployment, and troubleshooting specific to the JavaScript/TypeScript ecosystem.

## Configuration

### Environment Variables
Environment variables are crucial for configuring your application. Use a `.env` file to manage these variables locally and ensure they are securely managed in production.

```bash
# .env
NODE_ENV=production
PORT=3000
AZURE_COSMOS_DB_ENDPOINT=https://your-cosmos-db.documents.azure.com:443/
```

### Dockerfile
A well-configured Dockerfile is essential for containerizing your application. Ensure you are using a Node.js base image and copying only the necessary files.

```yaml
# Use an official Node.js runtime as a parent image
FROM node:22

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["node", "dist/index.js"]
```

Here is a more robust Dockerfile example that uses multi-stage builds to separate the build layer from the runtime layer. This approach helps to reduce the final image size and improve security by only including the necessary runtime dependencies in the final image.

```yaml
# Stage 1: Build
FROM node:22 AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Runtime
FROM node:22-alpine AS runtime

# Set the working directory
WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["node", "dist/index.js"]
```

### Node.js Specific Configuration

Ensure your package.json and tsconfig.json (for TypeScript) are properly configured.


## Deployment
* Continuous Integration/Continuous Deployment (CI/CD) - Set up a CI/CD pipeline using GitHub Actions, Azure DevOps, or another CI/CD tool to automate the deployment process.

    ```yaml
    # .github/workflows/deploy.yml
    name: Deploy to Azure

    on:
    push:
        branches:
        - main

    jobs:
    build-and-deploy:
        runs-on: ubuntu-latest

        steps:
        - uses: actions/checkout@v2

        - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
            node-version: '22'

        - name: Install dependencies
        run: npm install

        - name: Build the app
        run: npm run build

        - name: Log in to Azure
        uses: azure/login@v1
        with:
            creds: ${{ secrets.AZURE_CREDENTIALS }}

        - name: Deploy to Azure Container Apps
        run: |
            az containerapp up \
            --name my-container-app \
            --resource-group my-resource-group \
            --image my-docker-image \
            --environment my-environment \
            --cpu 1 --memory 2Gi \
            --env-vars NODE_ENV=production PORT=3000
    ```

* Docker Registry - Push your Docker images to a container registry like Azure Container Registry (ACR) or Docker Hub.

    ```bash
    # Tag the image
    docker tag my-app:latest myregistry.azurecr.io/my-app:latest

    # Push the image
    docker push myregistry.azurecr.io/my-app:latest
    ```



## Security

* Secure Environment Variables
Ensure sensitive information such as database connection strings and API keys are stored securely. Use Azure Key Vault to manage secrets and environment variables securely.

    ```bash
    az keyvault secret set --vault-name myKeyVault --name "CosmosDBConnectionString" --value "<your-connection-string>"
    ```

* HTTPS and Certificates
Ensure your application is served over HTTPS. Azure Container Apps can manage SSL certificates for you. Configure your custom domain and SSL certificate in the Azure Portal.

* Dependency Management
Regularly update your dependencies to avoid security vulnerabilities. Use tools like npm audit to check for vulnerabilities.

    ```bash
    npm audit
    ```


## Error handling

Implement robust error handling in your Node.js application. Use middleware in Express to handle errors gracefully.

```typescript
// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
}
```

## Logging

In Azure Container Apps, both console.log and console.error calls are automatically captured and logged. Azure Container Apps captures the standard output (stdout) and standard error (stderr) streams from your application and makes them available in Azure Monitor and Log Analytics.

### Setting Up Logging in Azure Container Apps


To ensure that your logs are properly captured and accessible, you need to configure diagnostic settings for your Azure Container App. Here’s how you can set it up:

1. Enable Diagnostic Settings: Use the Azure CLI to enable diagnostic settings for your Azure Container App.

    ```bash
    az monitor diagnostic-settings create \
    --resource /subscriptions/{subscription-id}/resourceGroups/{resource-group}/providers/Microsoft.Web/containerApps/{container-app-name} \
    --name "containerapp-logs" \
    --workspace {log-analytics-workspace-id} \
    --logs '[{"category": "ContainerAppConsoleLogs","enabled": true}]'
    ```

Replace {subscription-id}, {resource-group}, {container-app-name}, and {log-analytics-workspace-id} with your actual values.

2. Access Logs in Azure Portal: You can access the logs in the Azure Portal by navigating to your Log Analytics workspace and querying the logs.

### Using Logging Libraries

While `console.log` and `console.error` are automatically captured, using a logging library like **Winston** provides more flexibility and control over your logging. This flexibility allow you to format logs, set log levels, and output logs to multiple destinations (e.g., files, external logging services).

Here’s an example using winston:

```typescript
// src/logger.ts
import { createLogger, transports, format } from 'winston';

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'app.log' })
  ]
});

export default logger;
```

Here's an example of using the logger in your application:

```typescript
import logger from './logger';

logger.info('This is an info message');
logger.error('This is an error message');
```


## Maintenance and Performance Considerations

### Environment Variable Changes
Each change to environment variables requires a new deployed revision. It is best to make all the changes to the app's secrets at once, then link the secrets to the revision's environment variables. This minimizes the number of revisions and helps maintain a clean deployment history.

### Resource Allocation

Monitor and adjust the CPU and memory allocation for your containers based on the application's performance and usage patterns. Over-provisioning can lead to unnecessary costs, while under-provisioning can cause performance issues.

### Dependency Updates

Regularly update your dependencies to benefit from performance improvements and security patches. Use tools like npm-check-updates to automate this process.

```bash
npm install -g npm-check-updates
ncu -u
npm install
```

### Scaling

Configure auto-scaling based on the application's load. Azure Container Apps supports horizontal scaling, which can automatically adjust the number of container instances based on CPU or memory usage.

```bash
az containerapp revision set-scale \
  --name my-container-app \
  --resource-group my-resource-group \
  --min-replicas 1 \
  --max-replicas 10 \
  --cpu 80
```

### Monitoring alerts

Set up monitoring and alerts to track the performance and health of your application. Use Azure Monitor to create alerts for specific metrics such as CPU usage, memory usage, and response times.

```bash
az monitor metrics alert create \
  --name "HighCPUUsage" \
  --resource-group my-resource-group \
  --scopes /subscriptions/{subscription-id}/resourceGroups/{resource-group}/providers/Microsoft.ContainerInstance/containerGroups/{container-group} \
  --condition "avg Percentage CPU > 80" \
  --description "Alert when CPU usage is above 80%"
```


## Troubleshooting

* Logging - Enable and configure logging to capture application logs. Use Azure Monitor and Log Analytics to collect and analyze logs.

    ```bash
    az monitor log-analytics workspace create --resource-group my-resource-group --workspace-name myWorkspace
    az monitor diagnostic-settings create --resource my-container-app --workspace myWorkspace --logs '[{"category": "ContainerAppConsoleLogs","enabled": true}]'
    ```

* Debugging - Use remote debugging tools to connect to your running container. Ensure your Dockerfile exposes the necessary ports for debugging.

    ```yaml
    # Expose the debugging port
    EXPOSE 9229
    ```

* Health Checks - Configure health checks to monitor the health of your application. This ensures that Azure Container Apps can restart your container if it becomes unresponsive.

    ```yaml
    # Azure Container Apps YAML configuration
    properties:
    configuration:
        livenessProbe:
        httpGet:
            path: /health
            port: 3000
        initialDelaySeconds: 30
        periodSeconds: 10
    ```

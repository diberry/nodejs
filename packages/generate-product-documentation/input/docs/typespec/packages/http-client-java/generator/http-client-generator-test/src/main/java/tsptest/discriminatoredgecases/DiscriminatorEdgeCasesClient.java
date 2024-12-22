// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) TypeSpec Code Generator.

package tsptest.discriminatoredgecases;

import com.azure.core.annotation.Generated;
import com.azure.core.annotation.ReturnType;
import com.azure.core.annotation.ServiceClient;
import com.azure.core.annotation.ServiceMethod;
import com.azure.core.exception.ClientAuthenticationException;
import com.azure.core.exception.HttpResponseException;
import com.azure.core.exception.ResourceModifiedException;
import com.azure.core.exception.ResourceNotFoundException;
import com.azure.core.http.rest.RequestOptions;
import com.azure.core.http.rest.Response;
import com.azure.core.util.BinaryData;
import tsptest.discriminatoredgecases.implementation.DiscriminatorEdgeCasesClientImpl;
import tsptest.discriminatoredgecases.models.ChildWithAnotherDiscriminator;
import tsptest.discriminatoredgecases.models.ChildWithRequiredPropertyAsDiscriminator;

/**
 * Initializes a new instance of the synchronous DiscriminatorEdgeCasesClient type.
 */
@ServiceClient(builder = DiscriminatorEdgeCasesClientBuilder.class)
public final class DiscriminatorEdgeCasesClient {
    @Generated
    private final DiscriminatorEdgeCasesClientImpl serviceClient;

    /**
     * Initializes an instance of DiscriminatorEdgeCasesClient class.
     * 
     * @param serviceClient the service client implementation.
     */
    @Generated
    DiscriminatorEdgeCasesClient(DiscriminatorEdgeCasesClientImpl serviceClient) {
        this.serviceClient = serviceClient;
    }

    /**
     * The getChildRequiredDiscrim operation.
     * <p><strong>Response Body Schema</strong></p>
     * 
     * <pre>
     * {@code
     * {
     *     discriminator: String (Required)
     *     aProperty: String (Required)
     *     anotherProperty: String (Required)
     * }
     * }
     * </pre>
     * 
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return the response body along with {@link Response}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Response<BinaryData> getChildRequiredDiscrimWithResponse(RequestOptions requestOptions) {
        return this.serviceClient.getChildRequiredDiscrimWithResponse(requestOptions);
    }

    /**
     * The getChildNewDiscrim operation.
     * <p><strong>Response Body Schema</strong></p>
     * 
     * <pre>
     * {@code
     * {
     *     discriminator: String (Required)
     *     aProperty: String (Required)
     *     differentDiscriminator: String (Required)
     *     yetAnotherProperty: String (Required)
     * }
     * }
     * </pre>
     * 
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return the response body along with {@link Response}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Response<BinaryData> getChildNewDiscrimWithResponse(RequestOptions requestOptions) {
        return this.serviceClient.getChildNewDiscrimWithResponse(requestOptions);
    }

    /**
     * The getChildRequiredDiscrim operation.
     * 
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     * @return the response.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public ChildWithRequiredPropertyAsDiscriminator getChildRequiredDiscrim() {
        // Generated convenience method for getChildRequiredDiscrimWithResponse
        RequestOptions requestOptions = new RequestOptions();
        return getChildRequiredDiscrimWithResponse(requestOptions).getValue()
            .toObject(ChildWithRequiredPropertyAsDiscriminator.class);
    }

    /**
     * The getChildNewDiscrim operation.
     * 
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     * @return the response.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public ChildWithAnotherDiscriminator getChildNewDiscrim() {
        // Generated convenience method for getChildNewDiscrimWithResponse
        RequestOptions requestOptions = new RequestOptions();
        return getChildNewDiscrimWithResponse(requestOptions).getValue().toObject(ChildWithAnotherDiscriminator.class);
    }
}

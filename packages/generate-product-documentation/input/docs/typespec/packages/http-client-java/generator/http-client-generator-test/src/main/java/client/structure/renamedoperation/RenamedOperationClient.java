// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) TypeSpec Code Generator.

package client.structure.renamedoperation;

import client.structure.renamedoperation.implementation.RenamedOperationClientImpl;
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

/**
 * Initializes a new instance of the synchronous RenamedOperationClient type.
 */
@ServiceClient(builder = RenamedOperationClientBuilder.class)
public final class RenamedOperationClient {
    @Generated
    private final RenamedOperationClientImpl serviceClient;

    /**
     * Initializes an instance of RenamedOperationClient class.
     * 
     * @param serviceClient the service client implementation.
     */
    @Generated
    RenamedOperationClient(RenamedOperationClientImpl serviceClient) {
        this.serviceClient = serviceClient;
    }

    /**
     * The renamedOne operation.
     * 
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return the {@link Response}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Response<Void> renamedOneWithResponse(RequestOptions requestOptions) {
        return this.serviceClient.renamedOneWithResponse(requestOptions);
    }

    /**
     * The renamedThree operation.
     * 
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return the {@link Response}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Response<Void> renamedThreeWithResponse(RequestOptions requestOptions) {
        return this.serviceClient.renamedThreeWithResponse(requestOptions);
    }

    /**
     * The renamedFive operation.
     * 
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return the {@link Response}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Response<Void> renamedFiveWithResponse(RequestOptions requestOptions) {
        return this.serviceClient.renamedFiveWithResponse(requestOptions);
    }

    /**
     * The renamedOne operation.
     * 
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public void renamedOne() {
        // Generated convenience method for renamedOneWithResponse
        RequestOptions requestOptions = new RequestOptions();
        renamedOneWithResponse(requestOptions).getValue();
    }

    /**
     * The renamedThree operation.
     * 
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public void renamedThree() {
        // Generated convenience method for renamedThreeWithResponse
        RequestOptions requestOptions = new RequestOptions();
        renamedThreeWithResponse(requestOptions).getValue();
    }

    /**
     * The renamedFive operation.
     * 
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public void renamedFive() {
        // Generated convenience method for renamedFiveWithResponse
        RequestOptions requestOptions = new RequestOptions();
        renamedFiveWithResponse(requestOptions).getValue();
    }
}

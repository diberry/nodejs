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
import com.azure.core.util.FluxUtil;
import reactor.core.publisher.Mono;

/**
 * Initializes a new instance of the asynchronous RenamedOperationClient type.
 */
@ServiceClient(builder = RenamedOperationClientBuilder.class, isAsync = true)
public final class RenamedOperationAsyncClient {
    @Generated
    private final RenamedOperationClientImpl serviceClient;

    /**
     * Initializes an instance of RenamedOperationAsyncClient class.
     * 
     * @param serviceClient the service client implementation.
     */
    @Generated
    RenamedOperationAsyncClient(RenamedOperationClientImpl serviceClient) {
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
     * @return the {@link Response} on successful completion of {@link Mono}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Mono<Response<Void>> renamedOneWithResponse(RequestOptions requestOptions) {
        return this.serviceClient.renamedOneWithResponseAsync(requestOptions);
    }

    /**
     * The renamedThree operation.
     * 
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return the {@link Response} on successful completion of {@link Mono}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Mono<Response<Void>> renamedThreeWithResponse(RequestOptions requestOptions) {
        return this.serviceClient.renamedThreeWithResponseAsync(requestOptions);
    }

    /**
     * The renamedFive operation.
     * 
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return the {@link Response} on successful completion of {@link Mono}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Mono<Response<Void>> renamedFiveWithResponse(RequestOptions requestOptions) {
        return this.serviceClient.renamedFiveWithResponseAsync(requestOptions);
    }

    /**
     * The renamedOne operation.
     * 
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     * @return A {@link Mono} that completes when a successful response is received.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Mono<Void> renamedOne() {
        // Generated convenience method for renamedOneWithResponse
        RequestOptions requestOptions = new RequestOptions();
        return renamedOneWithResponse(requestOptions).flatMap(FluxUtil::toMono);
    }

    /**
     * The renamedThree operation.
     * 
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     * @return A {@link Mono} that completes when a successful response is received.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Mono<Void> renamedThree() {
        // Generated convenience method for renamedThreeWithResponse
        RequestOptions requestOptions = new RequestOptions();
        return renamedThreeWithResponse(requestOptions).flatMap(FluxUtil::toMono);
    }

    /**
     * The renamedFive operation.
     * 
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     * @return A {@link Mono} that completes when a successful response is received.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Mono<Void> renamedFive() {
        // Generated convenience method for renamedFiveWithResponse
        RequestOptions requestOptions = new RequestOptions();
        return renamedFiveWithResponse(requestOptions).flatMap(FluxUtil::toMono);
    }
}

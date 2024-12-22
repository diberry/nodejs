// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) TypeSpec Code Generator.

package specialheaders.repeatability;

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
import specialheaders.repeatability.implementation.RepeatabilityClientImpl;

/**
 * Initializes a new instance of the asynchronous RepeatabilityClient type.
 */
@ServiceClient(builder = RepeatabilityClientBuilder.class, isAsync = true)
public final class RepeatabilityAsyncClient {
    @Generated
    private final RepeatabilityClientImpl serviceClient;

    /**
     * Initializes an instance of RepeatabilityAsyncClient class.
     * 
     * @param serviceClient the service client implementation.
     */
    @Generated
    RepeatabilityAsyncClient(RepeatabilityClientImpl serviceClient) {
        this.serviceClient = serviceClient;
    }

    /**
     * Check we recognize Repeatability-Request-ID and Repeatability-First-Sent.
     * <p><strong>Header Parameters</strong></p>
     * <table border="1">
     * <caption>Header Parameters</caption>
     * <tr><th>Name</th><th>Type</th><th>Required</th><th>Description</th></tr>
     * <tr><td>repeatability-request-id</td><td>String</td><td>No</td><td>Repeatability request ID header</td></tr>
     * <tr><td>repeatability-first-sent</td><td>String</td><td>No</td><td>Repeatability first sent header as
     * HTTP-date</td></tr>
     * </table>
     * You can add these to a request with {@link RequestOptions#addHeader}
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
    public Mono<Response<Void>> immediateSuccessWithResponse(RequestOptions requestOptions) {
        return this.serviceClient.immediateSuccessWithResponseAsync(requestOptions);
    }

    /**
     * Check we recognize Repeatability-Request-ID and Repeatability-First-Sent.
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
    public Mono<Void> immediateSuccess() {
        // Generated convenience method for immediateSuccessWithResponse
        RequestOptions requestOptions = new RequestOptions();
        return immediateSuccessWithResponse(requestOptions).flatMap(FluxUtil::toMono);
    }
}

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) TypeSpec Code Generator.

package tsptest.specialheaders;

import com.azure.core.util.ServiceVersion;

/**
 * Service version of SpecialHeadersClient.
 */
public enum SpecialHeadersServiceVersion implements ServiceVersion {
    /**
     * Enum value 2022-06-01-preview.
     */
    V2022_06_01_PREVIEW("2022-06-01-preview");

    private final String version;

    SpecialHeadersServiceVersion(String version) {
        this.version = version;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String getVersion() {
        return this.version;
    }

    /**
     * Gets the latest service version supported by this client library.
     * 
     * @return The latest {@link SpecialHeadersServiceVersion}.
     */
    public static SpecialHeadersServiceVersion getLatest() {
        return V2022_06_01_PREVIEW;
    }
}

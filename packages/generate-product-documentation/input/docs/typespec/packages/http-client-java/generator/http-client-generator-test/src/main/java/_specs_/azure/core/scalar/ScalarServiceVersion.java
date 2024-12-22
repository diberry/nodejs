// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) TypeSpec Code Generator.

package _specs_.azure.core.scalar;

import com.azure.core.util.ServiceVersion;

/**
 * Service version of ScalarClient.
 */
public enum ScalarServiceVersion implements ServiceVersion {
    /**
     * Enum value 2022-12-01-preview.
     */
    V2022_12_01_PREVIEW("2022-12-01-preview");

    private final String version;

    ScalarServiceVersion(String version) {
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
     * @return The latest {@link ScalarServiceVersion}.
     */
    public static ScalarServiceVersion getLatest() {
        return V2022_12_01_PREVIEW;
    }
}

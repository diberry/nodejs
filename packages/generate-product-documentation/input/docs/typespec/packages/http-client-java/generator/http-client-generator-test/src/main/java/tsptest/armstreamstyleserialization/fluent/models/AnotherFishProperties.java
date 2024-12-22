// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) TypeSpec Code Generator.

package tsptest.armstreamstyleserialization.fluent.models;

import com.azure.core.annotation.Fluent;
import com.azure.core.util.logging.ClientLogger;
import com.azure.json.JsonReader;
import com.azure.json.JsonSerializable;
import com.azure.json.JsonToken;
import com.azure.json.JsonWriter;
import java.io.IOException;

/**
 * The AnotherFishProperties model.
 */
@Fluent
public final class AnotherFishProperties implements JsonSerializable<AnotherFishProperties> {
    /*
     * The eyeProperties property.
     */
    private EyeProperties innerEyeProperties = new EyeProperties();

    /**
     * Creates an instance of AnotherFishProperties class.
     */
    public AnotherFishProperties() {
    }

    /**
     * Get the innerEyeProperties property: The eyeProperties property.
     * 
     * @return the innerEyeProperties value.
     */
    private EyeProperties innerEyeProperties() {
        return this.innerEyeProperties;
    }

    /**
     * Get the length property: The length property.
     * 
     * @return the length value.
     */
    public double length() {
        return this.innerEyeProperties() == null ? 0.0 : this.innerEyeProperties().length();
    }

    /**
     * Set the length property: The length property.
     * 
     * @param length the length value to set.
     * @return the AnotherFishProperties object itself.
     */
    public AnotherFishProperties withLength(double length) {
        if (this.innerEyeProperties() == null) {
            this.innerEyeProperties = new EyeProperties();
        }
        this.innerEyeProperties().withLength(length);
        return this;
    }

    /**
     * Get the patten property: The patten property.
     * 
     * @return the patten value.
     */
    public String patten() {
        return this.innerEyeProperties() == null ? null : this.innerEyeProperties().patten();
    }

    /**
     * Get the requiredString property: The requiredString property.
     * 
     * @return the requiredString value.
     */
    public String requiredString() {
        return this.innerEyeProperties() == null ? null : this.innerEyeProperties().requiredString();
    }

    /**
     * Set the requiredString property: The requiredString property.
     * 
     * @param requiredString the requiredString value to set.
     * @return the AnotherFishProperties object itself.
     */
    public AnotherFishProperties withRequiredString(String requiredString) {
        if (this.innerEyeProperties() == null) {
            this.innerEyeProperties = new EyeProperties();
        }
        this.innerEyeProperties().withRequiredString(requiredString);
        return this;
    }

    /**
     * Validates the instance.
     * 
     * @throws IllegalArgumentException thrown if the instance is not valid.
     */
    public void validate() {
        if (innerEyeProperties() == null) {
            throw LOGGER.atError()
                .log(new IllegalArgumentException(
                    "Missing required property innerEyeProperties in model AnotherFishProperties"));
        } else {
            innerEyeProperties().validate();
        }
    }

    private static final ClientLogger LOGGER = new ClientLogger(AnotherFishProperties.class);

    /**
     * {@inheritDoc}
     */
    @Override
    public JsonWriter toJson(JsonWriter jsonWriter) throws IOException {
        jsonWriter.writeStartObject();
        jsonWriter.writeJsonField("eyeProperties", this.innerEyeProperties);
        return jsonWriter.writeEndObject();
    }

    /**
     * Reads an instance of AnotherFishProperties from the JsonReader.
     * 
     * @param jsonReader The JsonReader being read.
     * @return An instance of AnotherFishProperties if the JsonReader was pointing to an instance of it, or null if it
     * was pointing to JSON null.
     * @throws IllegalStateException If the deserialized JSON object was missing any required properties.
     * @throws IOException If an error occurs while reading the AnotherFishProperties.
     */
    public static AnotherFishProperties fromJson(JsonReader jsonReader) throws IOException {
        return jsonReader.readObject(reader -> {
            AnotherFishProperties deserializedAnotherFishProperties = new AnotherFishProperties();
            while (reader.nextToken() != JsonToken.END_OBJECT) {
                String fieldName = reader.getFieldName();
                reader.nextToken();

                if ("eyeProperties".equals(fieldName)) {
                    deserializedAnotherFishProperties.innerEyeProperties = EyeProperties.fromJson(reader);
                } else {
                    reader.skipChildren();
                }
            }

            return deserializedAnotherFishProperties;
        });
    }
}

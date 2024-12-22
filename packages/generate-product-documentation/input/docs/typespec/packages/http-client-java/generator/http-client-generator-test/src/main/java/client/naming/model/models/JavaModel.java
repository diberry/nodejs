// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) TypeSpec Code Generator.

package client.naming.model.models;

import com.azure.core.annotation.Generated;
import com.azure.core.annotation.Immutable;
import com.azure.json.JsonReader;
import com.azure.json.JsonSerializable;
import com.azure.json.JsonToken;
import com.azure.json.JsonWriter;
import java.io.IOException;

/**
 * The JavaModel model.
 */
@Immutable
public final class JavaModel implements JsonSerializable<JavaModel> {
    /*
     * Pass in true
     */
    @Generated
    private final boolean defaultName;

    /**
     * Creates an instance of JavaModel class.
     * 
     * @param defaultName the defaultName value to set.
     */
    @Generated
    public JavaModel(boolean defaultName) {
        this.defaultName = defaultName;
    }

    /**
     * Get the defaultName property: Pass in true.
     * 
     * @return the defaultName value.
     */
    @Generated
    public boolean isDefaultName() {
        return this.defaultName;
    }

    /**
     * {@inheritDoc}
     */
    @Generated
    @Override
    public JsonWriter toJson(JsonWriter jsonWriter) throws IOException {
        jsonWriter.writeStartObject();
        jsonWriter.writeBooleanField("defaultName", this.defaultName);
        return jsonWriter.writeEndObject();
    }

    /**
     * Reads an instance of JavaModel from the JsonReader.
     * 
     * @param jsonReader The JsonReader being read.
     * @return An instance of JavaModel if the JsonReader was pointing to an instance of it, or null if it was pointing
     * to JSON null.
     * @throws IllegalStateException If the deserialized JSON object was missing any required properties.
     * @throws IOException If an error occurs while reading the JavaModel.
     */
    @Generated
    public static JavaModel fromJson(JsonReader jsonReader) throws IOException {
        return jsonReader.readObject(reader -> {
            boolean defaultName = false;
            while (reader.nextToken() != JsonToken.END_OBJECT) {
                String fieldName = reader.getFieldName();
                reader.nextToken();

                if ("defaultName".equals(fieldName)) {
                    defaultName = reader.getBoolean();
                } else {
                    reader.skipChildren();
                }
            }
            return new JavaModel(defaultName);
        });
    }
}

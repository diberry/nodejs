// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) TypeSpec Code Generator.

package type.union.implementation.models;

import com.azure.core.annotation.Generated;
import com.azure.core.annotation.Immutable;
import com.azure.json.JsonReader;
import com.azure.json.JsonSerializable;
import com.azure.json.JsonToken;
import com.azure.json.JsonWriter;
import java.io.IOException;
import type.union.models.GetResponseProp1;

/**
 * The SendRequest5 model.
 */
@Immutable
public final class SendRequest5 implements JsonSerializable<SendRequest5> {
    /*
     * The prop property.
     */
    @Generated
    private final GetResponseProp1 prop;

    /**
     * Creates an instance of SendRequest5 class.
     * 
     * @param prop the prop value to set.
     */
    @Generated
    public SendRequest5(GetResponseProp1 prop) {
        this.prop = prop;
    }

    /**
     * Get the prop property: The prop property.
     * 
     * @return the prop value.
     */
    @Generated
    public GetResponseProp1 getProp() {
        return this.prop;
    }

    /**
     * {@inheritDoc}
     */
    @Generated
    @Override
    public JsonWriter toJson(JsonWriter jsonWriter) throws IOException {
        jsonWriter.writeStartObject();
        jsonWriter.writeNumberField("prop", this.prop == null ? null : this.prop.toDouble());
        return jsonWriter.writeEndObject();
    }

    /**
     * Reads an instance of SendRequest5 from the JsonReader.
     * 
     * @param jsonReader The JsonReader being read.
     * @return An instance of SendRequest5 if the JsonReader was pointing to an instance of it, or null if it was
     * pointing to JSON null.
     * @throws IllegalStateException If the deserialized JSON object was missing any required properties.
     * @throws IOException If an error occurs while reading the SendRequest5.
     */
    @Generated
    public static SendRequest5 fromJson(JsonReader jsonReader) throws IOException {
        return jsonReader.readObject(reader -> {
            GetResponseProp1 prop = null;
            while (reader.nextToken() != JsonToken.END_OBJECT) {
                String fieldName = reader.getFieldName();
                reader.nextToken();

                if ("prop".equals(fieldName)) {
                    prop = GetResponseProp1.fromDouble(reader.getDouble());
                } else {
                    reader.skipChildren();
                }
            }
            return new SendRequest5(prop);
        });
    }
}

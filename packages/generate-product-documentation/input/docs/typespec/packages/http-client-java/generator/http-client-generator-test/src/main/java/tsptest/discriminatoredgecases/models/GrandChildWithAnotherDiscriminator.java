// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) TypeSpec Code Generator.

package tsptest.discriminatoredgecases.models;

import com.azure.core.annotation.Generated;
import com.azure.core.annotation.Immutable;
import com.azure.json.JsonReader;
import com.azure.json.JsonToken;
import com.azure.json.JsonWriter;
import java.io.IOException;

/**
 * The GrandChildWithAnotherDiscriminator model.
 */
@Immutable
public final class GrandChildWithAnotherDiscriminator extends ChildWithAnotherDiscriminator {
    /*
     * Discriminator property for ChildWithAnotherDiscriminator.
     */
    @Generated
    private String differentDiscriminator = "anotherValue";

    /**
     * Creates an instance of GrandChildWithAnotherDiscriminator class.
     * 
     * @param discriminator the discriminator value to set.
     * @param aProperty the aProperty value to set.
     * @param yetAnotherProperty the yetAnotherProperty value to set.
     */
    @Generated
    private GrandChildWithAnotherDiscriminator(String discriminator, String aProperty, String yetAnotherProperty) {
        super(discriminator, aProperty, yetAnotherProperty);
    }

    /**
     * Get the differentDiscriminator property: Discriminator property for ChildWithAnotherDiscriminator.
     * 
     * @return the differentDiscriminator value.
     */
    @Generated
    @Override
    public String getDifferentDiscriminator() {
        return this.differentDiscriminator;
    }

    /**
     * {@inheritDoc}
     */
    @Generated
    @Override
    public JsonWriter toJson(JsonWriter jsonWriter) throws IOException {
        jsonWriter.writeStartObject();
        jsonWriter.writeStringField("discriminator", getDiscriminator());
        jsonWriter.writeStringField("aProperty", getAProperty());
        jsonWriter.writeStringField("yetAnotherProperty", getYetAnotherProperty());
        jsonWriter.writeStringField("differentDiscriminator", this.differentDiscriminator);
        return jsonWriter.writeEndObject();
    }

    /**
     * Reads an instance of GrandChildWithAnotherDiscriminator from the JsonReader.
     * 
     * @param jsonReader The JsonReader being read.
     * @return An instance of GrandChildWithAnotherDiscriminator if the JsonReader was pointing to an instance of it, or
     * null if it was pointing to JSON null.
     * @throws IllegalStateException If the deserialized JSON object was missing any required properties.
     * @throws IOException If an error occurs while reading the GrandChildWithAnotherDiscriminator.
     */
    @Generated
    public static GrandChildWithAnotherDiscriminator fromJson(JsonReader jsonReader) throws IOException {
        return jsonReader.readObject(reader -> {
            String discriminator = null;
            String aProperty = null;
            String yetAnotherProperty = null;
            String differentDiscriminator = "anotherValue";
            while (reader.nextToken() != JsonToken.END_OBJECT) {
                String fieldName = reader.getFieldName();
                reader.nextToken();

                if ("discriminator".equals(fieldName)) {
                    discriminator = reader.getString();
                } else if ("aProperty".equals(fieldName)) {
                    aProperty = reader.getString();
                } else if ("yetAnotherProperty".equals(fieldName)) {
                    yetAnotherProperty = reader.getString();
                } else if ("differentDiscriminator".equals(fieldName)) {
                    differentDiscriminator = reader.getString();
                } else {
                    reader.skipChildren();
                }
            }
            GrandChildWithAnotherDiscriminator deserializedGrandChildWithAnotherDiscriminator
                = new GrandChildWithAnotherDiscriminator(discriminator, aProperty, yetAnotherProperty);
            deserializedGrandChildWithAnotherDiscriminator.differentDiscriminator = differentDiscriminator;

            return deserializedGrandChildWithAnotherDiscriminator;
        });
    }
}

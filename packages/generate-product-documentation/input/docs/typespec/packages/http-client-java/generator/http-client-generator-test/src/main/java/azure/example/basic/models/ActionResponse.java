// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) TypeSpec Code Generator.

package azure.example.basic.models;

import com.azure.core.annotation.Generated;
import com.azure.core.annotation.Immutable;
import com.azure.json.JsonReader;
import com.azure.json.JsonSerializable;
import com.azure.json.JsonToken;
import com.azure.json.JsonWriter;
import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * The ActionResponse model.
 */
@Immutable
public final class ActionResponse implements JsonSerializable<ActionResponse> {
    /*
     * The stringProperty property.
     */
    @Generated
    private final String stringProperty;

    /*
     * The modelProperty property.
     */
    @Generated
    private Model modelProperty;

    /*
     * The arrayProperty property.
     */
    @Generated
    private List<String> arrayProperty;

    /*
     * The recordProperty property.
     */
    @Generated
    private Map<String, String> recordProperty;

    /**
     * Creates an instance of ActionResponse class.
     * 
     * @param stringProperty the stringProperty value to set.
     */
    @Generated
    private ActionResponse(String stringProperty) {
        this.stringProperty = stringProperty;
    }

    /**
     * Get the stringProperty property: The stringProperty property.
     * 
     * @return the stringProperty value.
     */
    @Generated
    public String getStringProperty() {
        return this.stringProperty;
    }

    /**
     * Get the modelProperty property: The modelProperty property.
     * 
     * @return the modelProperty value.
     */
    @Generated
    public Model getModelProperty() {
        return this.modelProperty;
    }

    /**
     * Get the arrayProperty property: The arrayProperty property.
     * 
     * @return the arrayProperty value.
     */
    @Generated
    public List<String> getArrayProperty() {
        return this.arrayProperty;
    }

    /**
     * Get the recordProperty property: The recordProperty property.
     * 
     * @return the recordProperty value.
     */
    @Generated
    public Map<String, String> getRecordProperty() {
        return this.recordProperty;
    }

    /**
     * {@inheritDoc}
     */
    @Generated
    @Override
    public JsonWriter toJson(JsonWriter jsonWriter) throws IOException {
        jsonWriter.writeStartObject();
        jsonWriter.writeStringField("stringProperty", this.stringProperty);
        jsonWriter.writeJsonField("modelProperty", this.modelProperty);
        jsonWriter.writeArrayField("arrayProperty", this.arrayProperty,
            (writer, element) -> writer.writeString(element));
        jsonWriter.writeMapField("recordProperty", this.recordProperty,
            (writer, element) -> writer.writeString(element));
        return jsonWriter.writeEndObject();
    }

    /**
     * Reads an instance of ActionResponse from the JsonReader.
     * 
     * @param jsonReader The JsonReader being read.
     * @return An instance of ActionResponse if the JsonReader was pointing to an instance of it, or null if it was
     * pointing to JSON null.
     * @throws IllegalStateException If the deserialized JSON object was missing any required properties.
     * @throws IOException If an error occurs while reading the ActionResponse.
     */
    @Generated
    public static ActionResponse fromJson(JsonReader jsonReader) throws IOException {
        return jsonReader.readObject(reader -> {
            String stringProperty = null;
            Model modelProperty = null;
            List<String> arrayProperty = null;
            Map<String, String> recordProperty = null;
            while (reader.nextToken() != JsonToken.END_OBJECT) {
                String fieldName = reader.getFieldName();
                reader.nextToken();

                if ("stringProperty".equals(fieldName)) {
                    stringProperty = reader.getString();
                } else if ("modelProperty".equals(fieldName)) {
                    modelProperty = Model.fromJson(reader);
                } else if ("arrayProperty".equals(fieldName)) {
                    arrayProperty = reader.readArray(reader1 -> reader1.getString());
                } else if ("recordProperty".equals(fieldName)) {
                    recordProperty = reader.readMap(reader1 -> reader1.getString());
                } else {
                    reader.skipChildren();
                }
            }
            ActionResponse deserializedActionResponse = new ActionResponse(stringProperty);
            deserializedActionResponse.modelProperty = modelProperty;
            deserializedActionResponse.arrayProperty = arrayProperty;
            deserializedActionResponse.recordProperty = recordProperty;

            return deserializedActionResponse;
        });
    }
}

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) TypeSpec Code Generator.

package type.property.additionalproperties.models;

import com.azure.core.annotation.Generated;
import com.azure.core.annotation.Immutable;
import com.azure.json.JsonReader;
import com.azure.json.JsonToken;
import com.azure.json.JsonWriter;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * The model extends from a model that spread Record&lt;string&gt; with the different known property type.
 */
@Immutable
public final class DifferentSpreadStringDerived extends DifferentSpreadStringRecord {
    /*
     * The index property
     */
    @Generated
    private final String derivedProp;

    /**
     * Creates an instance of DifferentSpreadStringDerived class.
     * 
     * @param id the id value to set.
     * @param derivedProp the derivedProp value to set.
     */
    @Generated
    public DifferentSpreadStringDerived(double id, String derivedProp) {
        super(id);
        this.derivedProp = derivedProp;
    }

    /**
     * Get the derivedProp property: The index property.
     * 
     * @return the derivedProp value.
     */
    @Generated
    public String getDerivedProp() {
        return this.derivedProp;
    }

    /**
     * {@inheritDoc}
     */
    @Generated
    @Override
    public JsonWriter toJson(JsonWriter jsonWriter) throws IOException {
        jsonWriter.writeStartObject();
        jsonWriter.writeDoubleField("id", getId());
        jsonWriter.writeStringField("derivedProp", this.derivedProp);
        if (getAdditionalProperties() != null) {
            for (Map.Entry<String, String> additionalProperty : getAdditionalProperties().entrySet()) {
                jsonWriter.writeUntypedField(additionalProperty.getKey(), additionalProperty.getValue());
            }
        }
        return jsonWriter.writeEndObject();
    }

    /**
     * Reads an instance of DifferentSpreadStringDerived from the JsonReader.
     * 
     * @param jsonReader The JsonReader being read.
     * @return An instance of DifferentSpreadStringDerived if the JsonReader was pointing to an instance of it, or null
     * if it was pointing to JSON null.
     * @throws IllegalStateException If the deserialized JSON object was missing any required properties.
     * @throws IOException If an error occurs while reading the DifferentSpreadStringDerived.
     */
    @Generated
    public static DifferentSpreadStringDerived fromJson(JsonReader jsonReader) throws IOException {
        return jsonReader.readObject(reader -> {
            double id = 0.0;
            String derivedProp = null;
            Map<String, String> additionalProperties = null;
            while (reader.nextToken() != JsonToken.END_OBJECT) {
                String fieldName = reader.getFieldName();
                reader.nextToken();

                if ("id".equals(fieldName)) {
                    id = reader.getDouble();
                } else if ("derivedProp".equals(fieldName)) {
                    derivedProp = reader.getString();
                } else {
                    if (additionalProperties == null) {
                        additionalProperties = new LinkedHashMap<>();
                    }

                    additionalProperties.put(fieldName, reader.getString());
                }
            }
            DifferentSpreadStringDerived deserializedDifferentSpreadStringDerived
                = new DifferentSpreadStringDerived(id, derivedProp);
            deserializedDifferentSpreadStringDerived.setAdditionalProperties(additionalProperties);

            return deserializedDifferentSpreadStringDerived;
        });
    }
}

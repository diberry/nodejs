// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) TypeSpec Code Generator.

package tsptest.wiretype.models;

import com.azure.core.annotation.Generated;
import com.azure.core.annotation.Immutable;
import com.azure.core.util.CoreUtils;
import com.azure.core.util.DateTimeRfc1123;
import com.azure.json.JsonReader;
import com.azure.json.JsonToken;
import com.azure.json.JsonWriter;
import java.io.IOException;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

/**
 * The SubClass model.
 */
@Immutable
public final class SubClass extends SuperClassMismatch {
    /*
     * The dateTime property.
     */
    @Generated
    private final OffsetDateTime dateTime;

    /**
     * Creates an instance of SubClass class.
     * 
     * @param dateTimeRfc7231 the dateTimeRfc7231 value to set.
     * @param dateTime the dateTime value to set.
     */
    @Generated
    public SubClass(OffsetDateTime dateTimeRfc7231, OffsetDateTime dateTime) {
        super(dateTimeRfc7231);
        this.dateTime = dateTime;
    }

    /**
     * Get the dateTime property: The dateTime property.
     * 
     * @return the dateTime value.
     */
    @Generated
    public OffsetDateTime getDateTime() {
        return this.dateTime;
    }

    /**
     * {@inheritDoc}
     */
    @Generated
    @Override
    public JsonWriter toJson(JsonWriter jsonWriter) throws IOException {
        jsonWriter.writeStartObject();
        if (getDateTimeRfc7231() != null) {
            jsonWriter.writeStringField("dateTimeRfc7231",
                Objects.toString(new DateTimeRfc1123(getDateTimeRfc7231()), null));
        }
        jsonWriter.writeStringField("dateTime",
            this.dateTime == null ? null : DateTimeFormatter.ISO_OFFSET_DATE_TIME.format(this.dateTime));
        return jsonWriter.writeEndObject();
    }

    /**
     * Reads an instance of SubClass from the JsonReader.
     * 
     * @param jsonReader The JsonReader being read.
     * @return An instance of SubClass if the JsonReader was pointing to an instance of it, or null if it was pointing
     * to JSON null.
     * @throws IllegalStateException If the deserialized JSON object was missing any required properties.
     * @throws IOException If an error occurs while reading the SubClass.
     */
    @Generated
    public static SubClass fromJson(JsonReader jsonReader) throws IOException {
        return jsonReader.readObject(reader -> {
            OffsetDateTime dateTimeRfc7231 = null;
            OffsetDateTime dateTime = null;
            while (reader.nextToken() != JsonToken.END_OBJECT) {
                String fieldName = reader.getFieldName();
                reader.nextToken();

                if ("dateTimeRfc7231".equals(fieldName)) {
                    DateTimeRfc1123 dateTimeRfc7231Holder
                        = reader.getNullable(nonNullReader -> new DateTimeRfc1123(nonNullReader.getString()));
                    if (dateTimeRfc7231Holder != null) {
                        dateTimeRfc7231 = dateTimeRfc7231Holder.getDateTime();
                    }
                } else if ("dateTime".equals(fieldName)) {
                    dateTime = reader
                        .getNullable(nonNullReader -> CoreUtils.parseBestOffsetDateTime(nonNullReader.getString()));
                } else {
                    reader.skipChildren();
                }
            }
            return new SubClass(dateTimeRfc7231, dateTime);
        });
    }
}

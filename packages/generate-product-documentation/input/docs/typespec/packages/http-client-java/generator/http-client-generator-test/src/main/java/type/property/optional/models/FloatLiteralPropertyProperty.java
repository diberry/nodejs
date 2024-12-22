// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) TypeSpec Code Generator.

package type.property.optional.models;

/**
 * Defines values for FloatLiteralPropertyProperty.
 */
public enum FloatLiteralPropertyProperty {
    /**
     * Enum value 1.25.
     */
    ONE_TWO_FIVE(1.25);

    /**
     * The actual serialized value for a FloatLiteralPropertyProperty instance.
     */
    private final double value;

    FloatLiteralPropertyProperty(double value) {
        this.value = value;
    }

    /**
     * Parses a serialized value to a FloatLiteralPropertyProperty instance.
     * 
     * @param value the serialized value to parse.
     * @return the parsed FloatLiteralPropertyProperty object, or null if unable to parse.
     */
    public static FloatLiteralPropertyProperty fromDouble(double value) {
        FloatLiteralPropertyProperty[] items = FloatLiteralPropertyProperty.values();
        for (FloatLiteralPropertyProperty item : items) {
            if (Double.doubleToLongBits(item.toDouble()) == Double.doubleToLongBits(value)) {
                return item;
            }
        }
        return null;
    }

    /**
     * De-serializes the instance to double value.
     * 
     * @return the double value.
     */
    public double toDouble() {
        return this.value;
    }
}

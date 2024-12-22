// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) TypeSpec Code Generator.

package azure.example.basic.generated;

import azure.example.basic.models.ActionRequest;
import azure.example.basic.models.ActionResponse;
import azure.example.basic.models.Enum;
import azure.example.basic.models.Model;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

@Disabled
public final class BasicActionTests extends AzureExampleClientTestBase {
    @Test
    @Disabled
    public void testBasicActionTests() {
        // method invocation
        ActionResponse response = azureExampleClient.basicAction("query", "header",
            new ActionRequest("text")
                .setModelProperty(
                    new Model().setInt32Property(1).setFloat32Property(1.5D).setEnumProperty(Enum.ENUM_VALUE1))
                .setArrayProperty(Arrays.asList("item"))
                .setRecordProperty(mapOf("record", "value")));

        // response assertion
    }

    // Use "Map.of" if available
    @SuppressWarnings("unchecked")
    private static <T> Map<String, T> mapOf(Object... inputs) {
        Map<String, T> map = new HashMap<>();
        for (int i = 0; i < inputs.length; i += 2) {
            String key = (String) inputs[i];
            T value = (T) inputs[i + 1];
            map.put(key, value);
        }
        return map;
    }
}

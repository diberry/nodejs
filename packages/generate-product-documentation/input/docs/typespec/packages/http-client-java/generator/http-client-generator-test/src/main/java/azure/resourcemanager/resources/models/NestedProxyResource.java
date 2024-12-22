// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) TypeSpec Code Generator.

package azure.resourcemanager.resources.models;

import azure.resourcemanager.resources.fluent.models.NestedProxyResourceInner;
import com.azure.core.management.SystemData;
import com.azure.core.util.Context;

/**
 * An immutable client-side representation of NestedProxyResource.
 */
public interface NestedProxyResource {
    /**
     * Gets the id property: Fully qualified resource Id for the resource.
     * 
     * @return the id value.
     */
    String id();

    /**
     * Gets the name property: The name of the resource.
     * 
     * @return the name value.
     */
    String name();

    /**
     * Gets the type property: The type of the resource.
     * 
     * @return the type value.
     */
    String type();

    /**
     * Gets the properties property: The resource-specific properties for this resource.
     * 
     * @return the properties value.
     */
    NestedProxyResourceProperties properties();

    /**
     * Gets the systemData property: Azure Resource Manager metadata containing createdBy and modifiedBy information.
     * 
     * @return the systemData value.
     */
    SystemData systemData();

    /**
     * Gets the name of the resource group.
     * 
     * @return the name of the resource group.
     */
    String resourceGroupName();

    /**
     * Gets the inner azure.resourcemanager.resources.fluent.models.NestedProxyResourceInner object.
     * 
     * @return the inner object.
     */
    NestedProxyResourceInner innerModel();

    /**
     * The entirety of the NestedProxyResource definition.
     */
    interface Definition
        extends DefinitionStages.Blank, DefinitionStages.WithParentResource, DefinitionStages.WithCreate {
    }

    /**
     * The NestedProxyResource definition stages.
     */
    interface DefinitionStages {
        /**
         * The first stage of the NestedProxyResource definition.
         */
        interface Blank extends WithParentResource {
        }

        /**
         * The stage of the NestedProxyResource definition allowing to specify parent resource.
         */
        interface WithParentResource {
            /**
             * Specifies resourceGroupName, topLevelTrackedResourceName.
             * 
             * @param resourceGroupName The name of the resource group. The name is case insensitive.
             * @param topLevelTrackedResourceName arm resource name for path.
             * @return the next definition stage.
             */
            WithCreate withExistingTopLevelTrackedResource(String resourceGroupName,
                String topLevelTrackedResourceName);
        }

        /**
         * The stage of the NestedProxyResource definition which contains all the minimum required properties for the
         * resource to be created, but also allows for any other optional properties to be specified.
         */
        interface WithCreate extends DefinitionStages.WithProperties {
            /**
             * Executes the create request.
             * 
             * @return the created resource.
             */
            NestedProxyResource create();

            /**
             * Executes the create request.
             * 
             * @param context The context to associate with this operation.
             * @return the created resource.
             */
            NestedProxyResource create(Context context);
        }

        /**
         * The stage of the NestedProxyResource definition allowing to specify properties.
         */
        interface WithProperties {
            /**
             * Specifies the properties property: The resource-specific properties for this resource..
             * 
             * @param properties The resource-specific properties for this resource.
             * @return the next definition stage.
             */
            WithCreate withProperties(NestedProxyResourceProperties properties);
        }
    }

    /**
     * Begins update for the NestedProxyResource resource.
     * 
     * @return the stage of resource update.
     */
    NestedProxyResource.Update update();

    /**
     * The template for NestedProxyResource update.
     */
    interface Update extends UpdateStages.WithProperties {
        /**
         * Executes the update request.
         * 
         * @return the updated resource.
         */
        NestedProxyResource apply();

        /**
         * Executes the update request.
         * 
         * @param context The context to associate with this operation.
         * @return the updated resource.
         */
        NestedProxyResource apply(Context context);
    }

    /**
     * The NestedProxyResource update stages.
     */
    interface UpdateStages {
        /**
         * The stage of the NestedProxyResource update allowing to specify properties.
         */
        interface WithProperties {
            /**
             * Specifies the properties property: The resource-specific properties for this resource..
             * 
             * @param properties The resource-specific properties for this resource.
             * @return the next definition stage.
             */
            Update withProperties(NestedProxyResourceProperties properties);
        }
    }

    /**
     * Refreshes the resource to sync with Azure.
     * 
     * @return the refreshed resource.
     */
    NestedProxyResource refresh();

    /**
     * Refreshes the resource to sync with Azure.
     * 
     * @param context The context to associate with this operation.
     * @return the refreshed resource.
     */
    NestedProxyResource refresh(Context context);
}

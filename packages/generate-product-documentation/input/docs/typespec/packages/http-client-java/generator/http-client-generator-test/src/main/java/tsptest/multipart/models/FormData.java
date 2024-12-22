// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) TypeSpec Code Generator.

package tsptest.multipart.models;

import com.azure.core.annotation.Fluent;
import com.azure.core.annotation.Generated;
import java.util.List;

/**
 * The FormData model.
 */
@Fluent
public final class FormData {
    /*
     * The name property.
     */
    @Generated
    private final String name;

    /*
     * The resolution property.
     */
    @Generated
    private final int resolution;

    /*
     * The type property.
     */
    @Generated
    private final ImageType type;

    /*
     * The size property.
     */
    @Generated
    private final Size size;

    /*
     * The image property.
     */
    @Generated
    private final ImageFileDetails image;

    /*
     * The fileData property.
     */
    @Generated
    private List<FileDataFileDetails> fileData;

    /**
     * Creates an instance of FormData class.
     * 
     * @param name the name value to set.
     * @param resolution the resolution value to set.
     * @param type the type value to set.
     * @param size the size value to set.
     * @param image the image value to set.
     */
    @Generated
    public FormData(String name, int resolution, ImageType type, Size size, ImageFileDetails image) {
        this.name = name;
        this.resolution = resolution;
        this.type = type;
        this.size = size;
        this.image = image;
    }

    /**
     * Get the name property: The name property.
     * 
     * @return the name value.
     */
    @Generated
    public String getName() {
        return this.name;
    }

    /**
     * Get the resolution property: The resolution property.
     * 
     * @return the resolution value.
     */
    @Generated
    public int getResolution() {
        return this.resolution;
    }

    /**
     * Get the type property: The type property.
     * 
     * @return the type value.
     */
    @Generated
    public ImageType getType() {
        return this.type;
    }

    /**
     * Get the size property: The size property.
     * 
     * @return the size value.
     */
    @Generated
    public Size getSize() {
        return this.size;
    }

    /**
     * Get the image property: The image property.
     * 
     * @return the image value.
     */
    @Generated
    public ImageFileDetails getImage() {
        return this.image;
    }

    /**
     * Get the fileData property: The fileData property.
     * 
     * @return the fileData value.
     */
    @Generated
    public List<FileDataFileDetails> getFileData() {
        return this.fileData;
    }

    /**
     * Set the fileData property: The fileData property.
     * 
     * @param fileData the fileData value to set.
     * @return the FormData object itself.
     */
    @Generated
    public FormData setFileData(List<FileDataFileDetails> fileData) {
        this.fileData = fileData;
        return this;
    }
}

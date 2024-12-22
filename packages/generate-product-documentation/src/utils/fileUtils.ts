import { promises as fs, Stats } from 'fs'
import * as path from 'path'

export interface RequestConfiguration {
  extensions: string[]
  maxFiles: number
}

export interface FileRequest {
  item: string
}
export interface FileResult {
  itemPath: string
  exists: boolean
  files: string[]
  fullPath: string
  error: string | null
}

export interface ProcessRequest {
  requestItemPaths: FileRequest[]
  requestConfiguration: RequestConfiguration
}
export interface ProcessResult {
  requestItemPaths: FileRequest[]
  requestConfiguration: RequestConfiguration
  responseItems: FileResult[]
}

export default class FileUtils {
  static async processFilesAndDirs(
    request: ProcessRequest,
  ): Promise<ProcessResult> {
    const results: ProcessResult = {
      requestItemPaths: request.requestItemPaths,
      requestConfiguration: request.requestConfiguration,
      responseItems: [],
    }
    const basePath = path.resolve('.') // Resolve the base path of the project


    for (const item of request.requestItemPaths) {
      let result: FileResult = {
        itemPath: item.item,
        exists: false,
        files: [],
        fullPath: item.item,
        error: null,
      }
      try {
        if (!item.item || typeof item.item !== 'string') {
          result.error = 'Invalid item path'

          break
        }
        const currentPath = item.item
        const currentAbsolutePath = path.resolve(basePath, currentPath) // Resolve the absolute path relative to the project base path
        result.fullPath = currentAbsolutePath

        console.log(currentAbsolutePath)

        const stats = await fs.stat(currentAbsolutePath)

        const filesList: string[] = await FileUtils.getFiles(stats, currentAbsolutePath, request);
        result.files = filesList;

        results.responseItems.push(result)
      } catch (error: unknown) {
        result.error = error instanceof Error ? error.message : 'An error occurred';
        results.responseItems.push(result)
      }
    }

    return results
  }
  static async getFiles(stats: Stats, currentAbsolutePath: string, request: ProcessRequest): Promise<string[]> {

    const files: string[] = [];

    if (stats.isDirectory()) {
      await this.traverse(
        currentAbsolutePath,
        request.requestConfiguration.extensions,
        request.requestConfiguration.maxFiles,
        files,
      ) // Use traverse for directories
    } else if (
      stats.isFile() &&
      this.isValidExtension(
        currentAbsolutePath,
        request.requestConfiguration.extensions,
      )
    ) {
      files.push(currentAbsolutePath) // Add files directly to the list
    }
    return files;
  }

  static async readFilesFromDir(
    dirPath: string,
    fileExtensions: string[] = ['.md'],
    maxFiles: number = 3,
  ): Promise<string[]> {
    if (!dirPath || typeof dirPath !== 'string') {
      throw new Error('Invalid directory path')
    }

    if (
      !Array.isArray(fileExtensions) ||
      fileExtensions.some(
        (ext) => typeof ext !== 'string' || !ext.startsWith('.'),
      )
    ) {
      throw new Error('Invalid file extensions')
    }

    if (typeof maxFiles !== 'number' || maxFiles <= 0) {
      throw new Error('Invalid maxFiles value')
    }

    const files: string[] = []
    await this.traverse(dirPath, fileExtensions, maxFiles, files)
    return files
  }

  private static async traverse(
    currentPath: string,
    fileExtensions: string[],
    maxFiles: number,
    files: string[],
  ): Promise<void> {
    if (files.length >= maxFiles) return // Stop if maxFiles limit is reached

    const items = await fs.readdir(currentPath)
    for (const item of items) {
      if (files.length >= maxFiles) break // Stop if maxFiles limit is reached

      const fullPath = path.join(currentPath, item)
      const stats = await fs.stat(fullPath)

      if (stats.isDirectory()) {
        await this.traverse(fullPath, fileExtensions, maxFiles, files) // Recursive call for subdirectories
      } else if (
        stats.isFile() &&
        this.isValidExtension(fullPath, fileExtensions)
      ) {
        files.push(fullPath) // Add matching files to the list
      }
    }
  }

  private static isValidExtension(
    filePath: string,
    fileExtensions: string[],
  ): boolean {

    console.log(filePath);
    console.log(fileExtensions);

    const result =  fileExtensions.some((ext) => filePath.endsWith(ext))
    return result;
  }
}

// Example Usage
// (async () => {
//   const markdownFiles = await FileUtils.readFilesFromDir('./path-to-github-repo');
//   console.log(markdownFiles); // List of all Markdown files
// })();

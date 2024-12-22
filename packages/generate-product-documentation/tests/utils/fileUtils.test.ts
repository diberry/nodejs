import 'module-alias/register';
import FileUtils, { FileRequest, FileResult, ProcessRequest, ProcessResult, RequestConfiguration } from '../../src/utils/fileUtils';

/*
const nonTestingCatalog = [

{
    description: 'should return an empty array for an empty input array',
    inputs: [],
    expected: [],
  },

{
  description: 'should process valid files and directories correctly',
  inputs: [
    './input/docs/typescript/README.md',
    './input/docs/typescript/website/src/content/docs/docs',
  ],
  expected: [
    {
      itemPath: './input/docs/typescript/README.md',
      exists: true,
      files: expect.arrayContaining([expect.stringMatching(/.*\.md$/)]),
      fullPath: expect.any(String),
      error: null,
    },
    {
      itemPath: './input/docs/typescript/website/src/content/docs/docs',
      exists: true,
      files: expect.arrayContaining([expect.stringMatching(/.*\.md$/)]),
      fullPath: expect.any(String),
      error: null,
    },
  ],
  {
    description: 'should return an array with objects having exists property as false if no valid files are found',
    inputs: ['./input/non-existent'],
    expected: [
      {
        itemPath: './input/non-existent',
        exists: false,
        files: [],
        fullPath: expect.any(String),
        error: expect.any(String),
      },
    ],
  },
];
*/
const testCatalog = [
  {
    description: 'should process valid files and directories correctly',
    inputs: [
    './input/docs/typespec/README.md'
    ],
    expected: [
      {
        itemPath: './input/docs/typespec/README.md',
        exists: true,
        files: [],
        fullPath: expect.any(String),
        error: null,
      },
    ],
  }

];

describe('File Utilities - processFilesAndDirs', () => {
  testCatalog.forEach(({ description, inputs, expected }) => {
    it(description, async () => {
      const fileRequests: FileRequest[] = inputs.map(item => ({ item }));
      const requestConfiguration: RequestConfiguration = { extensions: ['.md'], maxFiles: 3 };
      const processRequest: ProcessRequest = { requestItemPaths: fileRequests, requestConfiguration };

      const result: ProcessResult = await FileUtils.processFilesAndDirs(processRequest);

      result.responseItems.forEach((res: FileResult, index: number) => {

        console.log(res);

        if (expected.length>0) {
          expect(res.itemPath).toBe(expected[index].itemPath);
          expect(res.exists).toBe(expected[index].exists);
          expect(res.fullPath).toBe(expected[index].fullPath);
          expect(res.error).toBe(expected[index].error);
          if (res.exists) {
            expect(res.files).toEqual(expected[index].files);
          }
        } else {
          expect(res.itemPath).toBe(expected[index].itemPath);
        }


      });
    });
  });
});
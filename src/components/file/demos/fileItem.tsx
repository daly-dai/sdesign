/**
 * title: 文件展示
 * description: 单独渲染file数据
 */

import React from 'react';

import { SFile } from '@daly/sdesign';

const FileList = () => {
  return (
    <>
      <SFile
        style={{ marginBottom: '40px' }}
        fileData={{
          fileName: '这是超级超级超级超级超级超级长的文件名称.jpg',
          fileUrl: 'test/test/test.jpg',
        }}
      ></SFile>

      <SFile
        canClickName={false}
        fileData={{
          fileName: '测试文档三.jpg',
          fileUrl: 'test/test/test.jpg',
        }}
      ></SFile>
    </>
  );
};

export default FileList;

/**
 * title: 文件列表回显
 * description: 可设置列表渲染方向
 */

import React from 'react';

import { SFile } from '@daly/sdesign';

const fileList = [
  {
    fileName: '测试文档一.png',
    fileUrl: 'test/test/test.png',
  },
  {
    fileName: '测试文档二.pdf',
    fileUrl: 'test/test/test.pdf',
  },
  {
    fileName: '测试文档三.jpg',
    fileUrl: 'test/test/test.jpg',
  },
  null,
];

const FileList = () => {
  return (
    <>
      <SFile.List fileList={fileList}></SFile.List>
      <div>横向渲染</div>
      <SFile.List direction="line" fileList={fileList}></SFile.List>
      <div>对null[]的渲染</div>
      <SFile.List direction="line" fileList={[null, null, null]}></SFile.List>
    </>
  );
};

export default FileList;

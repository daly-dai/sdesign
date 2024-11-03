/**
 * title: 文件属性映射
 * description: reflect 设置文件属性映射
 */

import React from 'react';

import { SFile } from '@dalydb/sdesign';

const fileList = [
  {
    name: '测试文档一.png',
    url: 'test/test/test.png',
  },
  {
    name: '测试文档二.pdf',
    url: 'test/test/test.pdf',
  },
  {
    name: '测试文档三.jpg',
    url: 'test/test/test.jpg',
  },
];

const reflectProps = {
  fileName: 'name',
  fileUrl: 'url',
};

const ReflectFileList = () => {
  return <SFile.List fileList={fileList} reflect={reflectProps}></SFile.List>;
};

export default ReflectFileList;

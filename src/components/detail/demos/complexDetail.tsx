/**
 * title: 复杂列
 * description: 字典值可传入数组，默认为key，label。也可传入映射值
 */

import React from 'react';

import { SDetail, SDetailItem } from '@dalydb/sdesign';

const objDict = {
  inner: '内链',
  outer: '外链',
};

const dictList = [
  {
    label: '外链',
    name: 'outer',
  },
  {
    label: '内链',
    name: 'inner',
  },
];

const dictReflectList = [
  {
    label: '外链',
    value: 'outer',
  },
  {
    label: '内链',
    value: 'inner',
  },
];

const detailData = {
  accessLineMode: 'inner',
};

const FileList = () => {
  const businessDetail1: SDetailItem[] = [
    {
      label: '对象字典回显',
      name: 'accessLineMode',
      type: 'dict',
      dictMap: objDict,
    },
    {
      label: '数组字典回显',
      name: 'accessLineMode',
      type: 'dict',
      dictMap: dictList,
    },
    {
      label: '数组字典映射回显',
      name: 'accessLineMode',
      type: 'dict',
      dictMap: dictReflectList,
      dictReflect: {
        label: 'label',
        name: 'value',
      },
    },
  ];

  return (
    <>
      <SDetail
        title="字典回显示例"
        dataSource={detailData}
        items={businessDetail1}
      ></SDetail>
    </>
  );
};

export default FileList;

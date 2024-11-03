/**
 * title: 字段映射
 * description: 初始状态
 */
import { Button } from 'antd';
import React, { useState } from 'react';

import { SUpload } from '@dalydb/sdesign';

const DragUpload = () => {
  const [fileList, setFileList] = useState([]);

  const setFormData = () => {
    setFileList([
      {
        name: 'wallhaven-gpddld',
        url: '/szhz-dev-S/S-front/2023-10-11/wallhaven-gpddld1711986231625183232.jpg',
      },
      {
        name: 'wallhaven-7pllqo',
        url: '/szhz-dev-S/S-front/2023-10-11/wallhaven-7pllqo1711986241808953344.jpg',
      },
    ] as any);
  };

  return (
    <>
      <SUpload.Dragger
        value={fileList}
        reflect={{
          fileName: 'name',
          fileUrl: 'url',
        }}
        multiple
        maxCount={5}
        limit={15}
        limitSizeType="M"
        onChange={(data) => {
          console.log(data, 'uploadFile');
        }}
      ></SUpload.Dragger>
      <Button
        style={{ marginTop: '20px' }}
        type="primary"
        onClick={setFormData}
      >
        设置数据
      </Button>
    </>
  );
};

export default DragUpload;

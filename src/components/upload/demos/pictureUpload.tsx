/**
 * title: 图片上传
 * description: 初始状态
 */

import React from 'react';

import { SUpload } from '@daly/sdesign';

const PictureUpload = () => {
  const handleChange = (data: any) => {
    console.log(data, 'data');
  };
  return (
    <>
      <h4>普通使用</h4>
      <SUpload.Picture onChange={handleChange}></SUpload.Picture>

      <h4> 限制图片像素</h4>
      <SUpload.Picture width={100} height={100}></SUpload.Picture>
    </>
  );
};

export default PictureUpload;

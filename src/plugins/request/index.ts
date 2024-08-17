import { message } from 'antd';
import { AxiosRequestConfig } from 'axios';
import set from 'lodash/set';

import { requestForm, requestGet, requestPost, requestUpload } from './request';
import { ResponseStructure } from './types';

// 获取页面的token，前置拦截器中使用
const getToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const token = localStorage?.getItem('token') || '';

  if (token) {
    set(config, 'headers.Authorization', token);
  }

  return config;
};

// token过期之后的方法
const tokenFailure = (response: ResponseStructure<any>) => {
  message.error(response.msg);
  console.log(response);
};

export {
  getToken,
  requestForm,
  requestGet,
  requestPost,
  requestUpload,
  tokenFailure,
};

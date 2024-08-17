import { message, notification } from 'antd';
import axios, { AxiosError } from 'axios';
import get from 'lodash/get';

import { DEFAULT_CONFIG, ERROR_MESSAGE_MAP } from './static';
import { CustomizeResultHeader, ResponseStructure } from './types';

import { getToken, tokenFailure } from './index';
// 注意：在使用代理的时候不要设置baseUrl
const http = axios.create({
  // baseURL: '/S-api',
  timeout: 10000,
});

http.interceptors.request.use(
  (config: any) => {
    return getToken(config) as any;
  },
  (err) => {
    message.error('请求出错');

    return Promise.reject(err);
  },
);

/**
 * 获取自定义配置属性
 * @param response
 * @returns
 */
function getCustomConfig(response: any): CustomizeResultHeader {
  const data = get(response, 'config.headers', {});

  const { getResponse, skipErrorHandler } = data;

  return { getResponse, skipErrorHandler };
}

http.interceptors.response.use(
  (response) => {
    const { data = {}, status } = response;
    const { getResponse } = getCustomConfig(response);

    const { data: resultData } = data;

    if (DEFAULT_CONFIG.LOGIN_TIMEOUT_CODE.includes(data.code)) {
      // 未登录
      tokenFailure(data);
      return Promise.reject(data);
    }

    if (Object.prototype.toString.call(data) === '[object Blob]')
      return response;

    if (data.code === DEFAULT_CONFIG.CODE_OK) {
      // 根据自定义属性设置
      const responseData = getResponse === '1' ? data : resultData;

      return Promise.resolve(responseData);
    }

    if (status !== DEFAULT_CONFIG.CODE_OK) {
      message.error(data.msg);

      return Promise.reject(data);
    }

    return Promise.reject(data);
  },
  (err) => {
    const { skipErrorHandler } = getCustomConfig(err);
    const { message, response, config } = err as AxiosError;
    const { code, msg } = err as unknown as ResponseStructure<any>;
    // 如果选择跳过错误处理则只抛出异常
    if (skipErrorHandler === '1') {
      return Promise.reject(err);
    }

    if (response?.status) {
      const errorText =
        ERROR_MESSAGE_MAP[response.status] || response.statusText;
      const { status } = response;
      notification.error({
        message: errorText,
        description: `请求错误 ${status}`,
      });

      return Promise.reject(err);
    }

    if (code && !config) {
      const errorText = ERROR_MESSAGE_MAP[code] || msg || message;
      notification.error({
        message: code,
        description: errorText,
      });

      return Promise.reject(err);
    }

    if (message) {
      notification.error({
        message: '网络异常',
        description: message,
      });

      return Promise.reject(err);
    }

    notification.error({
      message: '网络异常',
      description: '您的网络发生异常，无法连接服务器',
    });

    return Promise.reject(err);
  },
);

export default http;

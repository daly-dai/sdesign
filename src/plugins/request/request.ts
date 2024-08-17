/* eslint-disable */
import { AxiosRequestConfig } from 'axios';

import keys from 'lodash/keys';
import omit from 'lodash/omit';
import set from 'lodash/set';
import http from './axiosConfig';
import { CUSTOMIZE_CONFIG } from './static';
import { RequestType, VoidFn } from './types';

// 一次性前置拦截器
let requestInterceptorsToEject: any = null;
// 一次性后置拦截器
let responseInterceptorsToEject: any = null;

/**
 * 清除方法自定义拦截器
 * @returns
 */
function clearCustomizeInterceptors() {
  if (!requestInterceptorsToEject && !responseInterceptorsToEject) return;

  if (requestInterceptorsToEject) {
    requestInterceptorsToEject?.forEach((interceptor: number) => {
      http.interceptors.request.eject(interceptor);
    });
  }

  if (responseInterceptorsToEject) {
    responseInterceptorsToEject?.forEach((interceptor: number) => {
      http.interceptors.response.eject(interceptor);
    });
  }
}

/**
 * 处理请求的配置
 * @param config
 * @returns
 */
function dispatchConfig(config: RequestType): AxiosRequestConfig {
  clearCustomizeInterceptors();

  if (!config) return {};

  if (!Object.keys(config)?.length) return {};

  // 去除自定义属性
  const result: RequestType = omit(config, CUSTOMIZE_CONFIG);

  // 处理自定义属性
  const configFnByType: VoidFn = {
    skipErrorHandler: () => {
      set(
        result,
        'headers.skipErrorHandler',
        config.skipErrorHandler ? '1' : '0',
      );
    },
    getResponse: () => {
      set(result, 'headers.getResponse', config.getResponse ? '1' : '0');
    },
    requestInterceptors: () => {
      // 设置前置拦截器
      const requestInterceptors = config.requestInterceptors;

      requestInterceptorsToEject = requestInterceptors?.map((interceptor) => {
        if (interceptor instanceof Array) {
          return http.interceptors.request.use((config) => {
            if (interceptor[0].length === 2) {
              const options = interceptor[0](config);
              return options;
            }

            return interceptor[0](config);
          }, interceptor[1]);
        }

        return http.interceptors.request.use((config) => {
          if (interceptor.length === 2) {
            const options = interceptor(config);
            return options;
          }

          return interceptor(config);
        });
      });
    },
    responseInterceptors: () => {
      const { responseInterceptors } = config;
      // 后置拦截器一次性
      responseInterceptorsToEject = responseInterceptors?.map((interceptor) => {
        return interceptor instanceof Array
          ? http.interceptors.response.use(interceptor[0], interceptor[1])
          : http.interceptors.response.use(interceptor);
      });
    },
  };

  // 处理特殊的参数
  keys(configFnByType).forEach((key: string) => {
    if (key in config) {
      configFnByType[key]();
    }
  });

  return result;
}

async function requestGet<T = any>(
  url: string,
  params?: any,
  config?: RequestType,
): Promise<T> {
  const options = dispatchConfig(config as RequestType) as AxiosRequestConfig;

  if (params) {
    return http(url, { method: 'get', params, ...options });
  }

  return http.get(url, options);
}

async function requestPost<T>(
  url: string,
  data: any,
  config?: RequestType,
): Promise<T> {
  const options = dispatchConfig(config as RequestType) as AxiosRequestConfig;

  return http.post(url, data, options);
}

async function requestForm<T = any>(
  url: string,
  data: any,
  config?: RequestType,
): Promise<T> {
  const options = dispatchConfig(config as RequestType) as AxiosRequestConfig;

  const formData = new FormData();

  if (Object.keys(data)?.length) {
    Object.keys(data).map((key: string) => {
      formData.append(key, `${data[key]}`);
    });
  }

  set(options, 'headers.content-type', 'multipart/form-data');

  return http.post(url, formData, options);
}

async function requestUpload<T = any>(
  url: string,
  data: any,
  config?: RequestType,
): Promise<T> {
  const options = dispatchConfig(config as RequestType) as AxiosRequestConfig;

  const formData = new FormData();

  if (Object.keys(data)?.length) {
    Object.keys(data).map((key: string) => {
      formData.append(key, data[key]);
    });
  }

  set(options, 'headers.content-type', 'multipart/form-data');

  return http.post(url, formData, options);
}

export { requestGet, requestPost, requestForm, requestUpload };

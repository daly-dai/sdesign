import { AxiosRequestConfig } from 'axios';

export interface ResponseStructure<T> {
  success: boolean;
  data: T;
  code: number;
  msg?: string;
}

export type Params = { [key: string]: unknown };

export type AsyncFn = (res: any) => Promise<any>;
export type VoidFn = { [key: string]: () => void };

export interface RequestConfig {
  skipErrorHandler?: boolean | string;
  getResponse?: boolean;
  requestInterceptors?: AsyncFn[];
  responseInterceptors?: AsyncFn[];
}

export interface CustomizeResultHeader {
  skipErrorHandler: '0' | '1';
  getResponse: '0' | '1';
}

export type RequestType = RequestConfig & AxiosRequestConfig;

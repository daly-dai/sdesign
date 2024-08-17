import isArray from 'lodash/isArray';
import isString from 'lodash/isString';

import { ValueType } from '../components/cascader/types';

/**
 * 计算文字宽度
 *
 * @param {string} text - 文字
 * @param {string} font - '14px sans-serif' 字号 字体
 * @return {*}
 * @example
 */
export const getTextWidth = (text: string, font: string): number => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) return 0;

  context.font = font;
  const metrics = context.measureText(text + '');
  const actual =
    Math.abs(metrics.actualBoundingBoxLeft) +
    Math.abs(metrics.actualBoundingBoxRight);
  return Math.max(metrics.width, actual);
};

/**
 * 通过DOM获取文本的宽度
 * @param text - 待计算宽度的文本
 * @param font - 文本的字体大小和样式
 * @returns 文本的宽度
 */
export function getTextWidthByDom(text: string, font: string) {
  const span = document.createElement('span');
  span.style.fontSize = font;
  span.textContent = text;

  document.body.appendChild(span);

  const textWidth = span.offsetWidth;

  document.body.removeChild(span);

  return textWidth;
}

/**
 * 字符串首位是字母转大写
 * @param {string} name - 字符串
 * @return {string} 返回首字母转换成大写的字符串
 * @example
 * ```
 */
export function initialToCapital(str: string): string {
  // 检查输入是否为字符串
  if (typeof str !== 'string') return '';

  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 删除字符串中的空格
 *
 * @param {string} str - 要操作的字符串
 * @return {string} 返回去除空格后的新字符串
 * @example
 */
export const removeSpaces = (str: string): string => str.replace(/\s/g, '');

/**
 * 字符替换
 *
 * @param {*} str - 表示将要替换的字符串
 * @param {*} oldChar - 表示你将要替换的字符
 * @param {*} newChar - 表示你想要替换的字符
 * @return {string} 返回替换后的字符串
 * @example
 *
 */
export const transFormat = (str: string, oldChar: string, newChar: string) => {
  const reg = new RegExp(oldChar, 'g'); // g表示全部替换，默认替换第一个
  const result = str.replace(reg, newChar);

  return result;
};

/**
 * 获取URL参数并返回JSON字符串
 * @param URL URL字符串
 * @returns JSON字符串
 */
export function getParameters(paramStr: string) {
  const paramsRegex = /([^?&=]+)=([^?&=]*)/g;
  const params = new URL(paramStr).searchParams;

  const result: Record<string, any> = {};
  let match;

  while ((match = paramsRegex.exec(params.toString())) !== null) {
    // The match array will be ["key=value", "key", "value"]
    result[decodeURIComponent(match[2])] = decodeURIComponent(match[1]);
  }

  return result;
}

/**
 * 获取选中的文本内容
 * @returns {string} 选中的文本内容
 */
export function getSelectedText() {
  return window?.getSelection()?.toString();
}

// 级联选择器
export function dispatchCascader(
  value: string[] | string[][] | null,
  multiple: boolean = false,
): string | null {
  try {
    if (!value) return '';

    if (!Array.isArray(value)) return value;

    //   如果是多选的情况，则返回逗号与斜杠混合分割
    if (multiple) {
      return value?.map((item) => (item as string[])?.join('/'))?.join(',');
    }

    return value?.join('/');
  } catch (error) {
    console.log('error-2', error);

    return null;
  }
}

// 反向处理级联选择器
export function echoCascader(
  value: string | undefined,
  multiple: boolean = false,
): ValueType | null | string {
  if (!value) return null;

  if (isString(value) && multiple) {
    return value?.split(',').map((item) => item.split('/'));
  }

  if (isArray(value)) return value;

  if (value?.includes('/')) return value?.split('/');

  return value;
}

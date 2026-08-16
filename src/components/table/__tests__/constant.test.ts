import { describe, expect, it } from 'vitest';

import { convertToText } from '../constant';

describe('convertToText', () => {
  it('null 返回 "-"', () => {
    expect(convertToText(null)).toBe('-');
  });

  it('undefined 返回 "-"', () => {
    expect(convertToText(undefined)).toBe('-');
  });

  it('0 是合法值，原样返回', () => {
    expect(convertToText(0)).toBe(0);
  });

  it('空字符串返回 "-"', () => {
    expect(convertToText('')).toBe('-');
  });

  it('非空字符串原样返回', () => {
    expect(convertToText('hello')).toBe('hello');
  });

  it('数组连接为字符串', () => {
    expect(convertToText([1, 2, 3])).toBe('1, 2, 3');
  });

  it('空数组返回 "-"', () => {
    expect(convertToText([])).toBe('-');
  });

  it('对象返回 "-"', () => {
    expect(convertToText({})).toBe('-');
  });

  it('负数原样返回', () => {
    expect(convertToText(-1)).toBe(-1);
  });

  it('布尔 true 返回 "true"', () => {
    expect(convertToText(true)).toBe('true');
  });

  it('布尔 false 返回 "false"', () => {
    expect(convertToText(false)).toBe('false');
  });

  it('bigint 转字符串', () => {
    expect(convertToText(9007199254740993n)).toBe('9007199254740993');
  });
});

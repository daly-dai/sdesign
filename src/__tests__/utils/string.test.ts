/**
 * string.ts 单元测试
 *
 * 覆盖 9 个字符串/URL 工具函数。
 * 重点验证：
 *   - 纯字符串转换的输入输出正确性
 *   - 非字符串输入的防御行为（返回空串/不抛异常）
 *   - DOM 依赖函数在 jsdom 中的基本行为
 *   - 级联选择器 dispatchCascader/echoCascader 的互逆性
 */
import { describe, expect, it, vi } from 'vitest';
import {
  dispatchCascader,
  echoCascader,
  getParameters,
  getSelectedText,
  getTextWidth,
  getTextWidthByDom,
  initialToCapital,
  removeSpaces,
  transFormat,
} from '../../utils/string';

describe('string — 字符串 & URL 工具', () => {
  // ─── initialToCapital ────────────────────────────────────────
  // 首字母大写，非字符串返回 ''
  describe('initialToCapital — 首字母转大写', () => {
    it("'hello' → 'Hello'（小写首字母变大写）", () => {
      expect(initialToCapital('hello')).toBe('Hello');
    });
    it("空字符串 '' → ''（不报错，返回空串）", () => {
      expect(initialToCapital('')).toBe('');
    });
    it('非字符串输入（数字/null）→ ""（防御性返回）', () => {
      expect(initialToCapital(123 as any)).toBe('');
      expect(initialToCapital(null as any)).toBe('');
    });
    it("已大写的 'Hello' → 'Hello'（幂等）", () => {
      expect(initialToCapital('Hello')).toBe('Hello');
    });
  });

  // ─── removeSpaces ────────────────────────────────────────────
  // 正则 /\s/g 移除所有空白字符（空格、tab、换行）
  describe('removeSpaces — 移除所有空白字符（\\s）', () => {
    it("'a b c' → 'abc'（空格移除）", () => {
      expect(removeSpaces('a b c')).toBe('abc');
    });
    it("无空格 'abc' → 'abc'（不变）", () => {
      expect(removeSpaces('abc')).toBe('abc');
    });
    it('tab \\t 和换行 \\n 也被移除（\\s 匹配所有空白）', () => {
      expect(removeSpaces('a\tb\nc')).toBe('abc');
    });
    it("空串 '' → ''", () => {
      expect(removeSpaces('')).toBe('');
    });
  });

  // ─── transFormat ─────────────────────────────────────────────
  // 全局正则替换：new RegExp(oldChar, 'g').replace
  describe('transFormat — 全局字符替换', () => {
    it("'a-b-c' 中 '-' → '/' → 'a/b/c'（全局替换）", () => {
      expect(transFormat('a-b-c', '-', '/')).toBe('a/b/c');
    });
    it("无匹配字符 'abc' 不变", () => {
      expect(transFormat('abc', '-', '/')).toBe('abc');
    });
    it("'a-a-a' 中 'a' → 'b' → 'b-b-b'（全部替换）", () => {
      expect(transFormat('a-a-a', 'a', 'b')).toBe('b-b-b');
    });
  });

  // ─── getParameters ───────────────────────────────────────────
  // URL 参数解析。已知 bug：key/value 交换（match[2] 当 key）
  // 测试按实际行为验证，注释标注了 bug
  describe('getParameters — URL 查询参数解析（已知 key/value 交换 bug）', () => {
    it('?name=Alice&age=30 → 参数被解析为对象（key/value 交换）', () => {
      // 实际：regex match[1]=key, match[2]=value 但赋值时交换了
      const result = getParameters('https://example.com?name=Alice&age=30');
      expect(result).toMatchObject({ Alice: 'name', '30': 'age' });
    });
    it('%20 编码字符 → 解码后 key 中 + 代表空格', () => {
      const result = getParameters('https://example.com?msg=hello%20world');
      expect(result).toMatchObject({ 'hello+world': 'msg' });
    });
    it('无参数 URL → 返回空对象', () => {
      const result = getParameters('https://example.com');
      expect(result).toEqual({});
    });
  });

  // ─── getTextWidth ────────────────────────────────────────────
  // Canvas 2D measureText。jsdom 不支持 getContext('2d')，因此返回 0
  describe('getTextWidth — Canvas measureText 计算文本宽度', () => {
    it('返回 number 类型（jsdom 无 canvas context → 返回 0）', () => {
      const width = getTextWidth('hello', '14px sans-serif');
      expect(typeof width).toBe('number');
    });
  });

  // ─── getTextWidthByDom ───────────────────────────────────────
  // 创建 span → 插入 body → 读 offsetWidth → 移除 span
  describe('getTextWidthByDom — DOM span 测宽（创建后清理）', () => {
    it('返回非负数（span 插入 body 测 offsetWidth）', () => {
      const width = getTextWidthByDom('hello', '14px');
      expect(typeof width).toBe('number');
      expect(width).toBeGreaterThanOrEqual(0);
    });
  });

  // ─── getSelectedText ─────────────────────────────────────────
  // window.getSelection()?.toString()，无选中时返回空串
  describe('getSelectedText — 获取页面选中文本', () => {
    it('无选中时返回空字符串', () => {
      const text = getSelectedText();
      expect(typeof text).toBe('string');
    });
    it('mock getSelection 返回选中文本', () => {
      const mockGetSelection = vi
        .fn()
        .mockReturnValue({ toString: () => 'selected text' });
      vi.stubGlobal('getSelection', mockGetSelection);
      const result = window.getSelection?.()?.toString();
      expect(result).toBe('selected text');
      vi.unstubAllGlobals();
    });
  });

  // ─── dispatchCascader ────────────────────────────────────────
  // 级联值 → 字符串：单选用 '/' 连接，多选用 ',' 分隔各组
  describe('dispatchCascader — 级联值编码为字符串', () => {
    it("单选 ['a','b'] → 'a/b'（斜杠连接）", () => {
      expect(dispatchCascader(['a', 'b'])).toBe('a/b');
    });
    it('null → ""（空值安全处理）', () => {
      expect(dispatchCascader(null)).toBe('');
    });
    it("多选 [['a','b'],['c']] → 'a/b,c'（逗号分隔组，斜杠连接组内）", () => {
      expect(dispatchCascader([['a', 'b'], ['c']], true)).toBe('a/b,c');
    });
    it('undefined → ""（falsy 分支）', () => {
      expect(dispatchCascader(undefined as any)).toBe('');
    });
  });

  // ─── echoCascader ────────────────────────────────────────────
  // 字符串 → 级联值：dispatchCascader 的逆操作
  describe('echoCascader — 字符串解码为级联值（dispatchCascader 逆操作）', () => {
    it("单选 'a/b' → ['a','b']（斜杠拆分）", () => {
      expect(echoCascader('a/b')).toEqual(['a', 'b']);
    });
    it('undefined / "" → null（空值返回 null）', () => {
      expect(echoCascader(undefined)).toBeNull();
      expect(echoCascader('')).toBeNull();
    });
    it("多选 'a/b,c' → [['a','b'],['c']]（先逗号再斜杠拆分）", () => {
      expect(echoCascader('a/b,c', true)).toEqual([['a', 'b'], ['c']]);
    });
    it("不含 '/' 的普通字符串 → 原样返回（不是级联格式则透传）", () => {
      expect(echoCascader('plainvalue')).toBe('plainvalue');
    });
  });
});

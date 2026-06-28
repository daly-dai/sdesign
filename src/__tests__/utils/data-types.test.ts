/**
 * data-types.ts 单元测试
 *
 * 覆盖 8 个类型判断工具函数。
 * 这些是组件库中最基础的类型守卫，被 dict、tree、form 等模块大量使用。
 * 重点验证：
 *   - 合法输入返回正确类型断言
 *   - 边界值（null/undefined/0/''/NaN）行为符合预期
 *   - 类型守卫对 TypeScript 的类型收窄正确
 */
import { describe, expect, it } from 'vitest';
import {
  isBoolean,
  isElement,
  isEmpty,
  isNumber,
  isPropAbsent,
  isStringNumber,
  isUndefined,
  isWindow,
} from '../../utils/data-types';

describe('data-types — 类型判断工具', () => {
  // ─── isUndefined ─────────────────────────────────────────────
  // 严格 === undefined，不包含 null（区别于 lodash.isNil）
  // 边界：null / 0 / '' / false 均不视为 undefined
  describe('isUndefined — 严格 undefined 检查（不含 null）', () => {
    it('undefined → true（唯一命中值）', () => {
      expect(isUndefined(undefined)).toBe(true);
    });
    it('null → false（null ≠ undefined，区分于 isNil）', () => {
      expect(isUndefined(null)).toBe(false);
    });
    it('falsy 值 0 / "" / false → false（不会被误判）', () => {
      expect(isUndefined(0)).toBe(false);
      expect(isUndefined('')).toBe(false);
      expect(isUndefined(false)).toBe(false);
    });
    it('对象 → false', () => {
      expect(isUndefined({})).toBe(false);
    });
  });

  // ─── isBoolean ───────────────────────────────────────────────
  // typeof val === 'boolean'，只有 true/false 字面量命中
  // 边界：0/1（number）、'true'/'false'（string）不命中
  describe('isBoolean — 严格 boolean 类型判断', () => {
    it('true / false → true（仅二字面量）', () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
    });
    it('数字 0 / 1 → false（typeof number ≠ boolean）', () => {
      expect(isBoolean(0)).toBe(false);
      expect(isBoolean(1)).toBe(false);
    });
    it('字符串 "true" / "false" → false（typeof string）', () => {
      expect(isBoolean('true')).toBe(false);
      expect(isBoolean('false')).toBe(false);
    });
    it('null / undefined → false', () => {
      expect(isBoolean(null)).toBe(false);
      expect(isBoolean(undefined)).toBe(false);
    });
  });

  // ─── isNumber ────────────────────────────────────────────────
  // typeof val === 'number'，注意 NaN/Infinity 也是 number
  describe('isNumber — 严格 number 类型判断（含 NaN/Infinity）', () => {
    it('0 / 1 / NaN / Infinity → true（typeof 均为 number）', () => {
      expect(isNumber(0)).toBe(true);
      expect(isNumber(1)).toBe(true);
      expect(isNumber(NaN)).toBe(true); // NaN 的 typeof 是 number
      expect(isNumber(Infinity)).toBe(true); // Infinity 同理
    });
    it('字符串数字 "1" / "abc" → false（typeof string）', () => {
      expect(isNumber('1')).toBe(false);
      expect(isNumber('abc')).toBe(false);
    });
    it('null / undefined → false', () => {
      expect(isNumber(null)).toBe(false);
      expect(isNumber(undefined)).toBe(false);
    });
  });

  // ─── isEmpty ─────────────────────────────────────────────────
  // 判断"空值"：falsy（除 0）、空数组、空对象
  // 边界：0 不是空值（!0 = true 但显式排除），[1] / {a:1} 不空
  describe('isEmpty — 空值判断（falsy+空数组+空对象，0 除外）', () => {
    it('"" / [] / {} → true（典型空值）', () => {
      expect(isEmpty('')).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
    });
    it('null / undefined → true（falsy 且非 0）', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
    });
    it('0 → false（关键边界：0 不是空值）', () => {
      expect(isEmpty(0)).toBe(false);
    });
    it('非空数组/对象 → false', () => {
      expect(isEmpty([1])).toBe(false);
      expect(isEmpty({ a: 1 })).toBe(false);
    });
    it('非空字符串 → false', () => {
      expect(isEmpty('hello')).toBe(false);
    });
  });

  // ─── isElement ───────────────────────────────────────────────
  // e instanceof Element，依赖 DOM 环境
  describe('isElement — DOM Element 实例判断', () => {
    it('document.createElement 产物 → true', () => {
      const div = document.createElement('div');
      expect(isElement(div)).toBe(true);
    });
    it('普通对象 → false', () => {
      expect(isElement({})).toBe(false);
    });
    it('null / undefined → false（安全处理）', () => {
      expect(isElement(null)).toBe(false);
      expect(isElement(undefined)).toBe(false);
    });
  });

  // ─── isPropAbsent ────────────────────────────────────────────
  // 基于 lodash.isNil：null 和 undefined 都算 absent
  describe('isPropAbsent — Props 缺失判断（null | undefined）', () => {
    it('null / undefined → true（Props 未传）', () => {
      expect(isPropAbsent(null)).toBe(true);
      expect(isPropAbsent(undefined)).toBe(true);
    });
    it('0 / "" / false → false（明确传了值，即便 falsy）', () => {
      expect(isPropAbsent(0)).toBe(false);
      expect(isPropAbsent('')).toBe(false);
      expect(isPropAbsent(false)).toBe(false);
    });
  });

  // ─── isStringNumber ──────────────────────────────────────────
  // 判断字符串是否能转为合法数字（Number() 后非 NaN）
  // 边界：'' → Number('')=0 → !isNaN(0) → true（已知行为）
  describe('isStringNumber — 字符串是否为合法数字', () => {
    it('"123" / "0" / "1.5" → true（整数、零、小数）', () => {
      expect(isStringNumber('123')).toBe(true);
      expect(isStringNumber('0')).toBe(true);
      expect(isStringNumber('1.5')).toBe(true);
    });
    it('"abc" / "12a" → false（含非数字字符）', () => {
      expect(isStringNumber('abc')).toBe(false);
      expect(isStringNumber('12a')).toBe(false);
    });
    it('数字类型 123 → false（先检查 isString，非字符串直接 false）', () => {
      expect(isStringNumber(123 as any)).toBe(false);
    });
    it('"" → true（Number("") = 0，非 NaN，已知行为）', () => {
      expect(isStringNumber('')).toBe(true);
    });
  });

  // ─── isWindow ────────────────────────────────────────────────
  // val === window，引用相等判断
  describe('isWindow — 全局 window 对象判断', () => {
    it('window → true（引用相等）', () => {
      expect(isWindow(window)).toBe(true);
    });
    it('普通对象 → false', () => {
      expect(isWindow({})).toBe(false);
    });
    it('null → false', () => {
      expect(isWindow(null)).toBe(false);
    });
  });
});

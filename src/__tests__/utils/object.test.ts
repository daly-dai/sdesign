/**
 * object.ts 单元测试
 *
 * 覆盖 isDeepEqualReact 函数。
 * 这是 sdesign 中最重要的深度比较函数，被 useProTable 的 refreshDeps、
 * SDetail 的 dataSource 比较、以及组件 memo 的 props 比较大量使用。
 * 重点验证：
 *   - 普通对象/嵌套对象的深度比较
 *   - 特殊类型：Array / Map / Set / RegExp / TypedArray
 *   - React 特殊处理：_owner + $$typeof 跳过
 *   - ignoreKeys 自定义忽略
 *   - null/undefined 边界
 */
import { describe, expect, it } from 'vitest';
import { isDeepEqualReact } from '../../utils/object';

describe('object — 深度比较（isDeepEqualReact）', () => {
  describe('isDeepEqualReact — React 感知的深度相等判断', () => {
    // ── 基本对象比较 ──
    it('同值同键对象 → true', () => {
      expect(isDeepEqualReact({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    });
    it('同键不同值 → false', () => {
      expect(isDeepEqualReact({ a: 1 }, { a: 2 })).toBe(false);
    });
    it('不同键 → false（键集合不一致）', () => {
      expect(isDeepEqualReact({ a: 1 }, { b: 1 })).toBe(false);
    });

    // ── 嵌套对象 ──
    it('嵌套对象同值 → true（递归比较）', () => {
      expect(isDeepEqualReact({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true);
    });
    it('嵌套对象不同值 → false（递归深入发现差异）', () => {
      expect(isDeepEqualReact({ a: { b: 1 } }, { a: { b: 2 } })).toBe(false);
    });

    // ── 数组 ──
    it('数组同值同序 → true', () => {
      expect(isDeepEqualReact([1, 2, 3], [1, 2, 3])).toBe(true);
    });
    it('数组长度相同但元素不同 → false', () => {
      expect(isDeepEqualReact([1, 2], [1, 3])).toBe(false);
    });

    // ── Map ──
    it('Map 同键同值 → true', () => {
      expect(
        isDeepEqualReact(new Map([['k', 'v']]), new Map([['k', 'v']])),
      ).toBe(true);
    });
    it('Map 同键不同值 → false', () => {
      expect(
        isDeepEqualReact(new Map([['k', 'v1']]), new Map([['k', 'v2']])),
      ).toBe(false);
    });

    // ── Set ──
    it('Set 同元素 → true', () => {
      expect(isDeepEqualReact(new Set([1, 2]), new Set([1, 2]))).toBe(true);
    });
    it('Set 不同元素 → false', () => {
      expect(isDeepEqualReact(new Set([1]), new Set([2]))).toBe(false);
    });

    // ── RegExp ──
    it('RegExp 同 source + flags → true', () => {
      expect(isDeepEqualReact(/abc/g, /abc/g)).toBe(true);
    });
    it('RegExp 不同 flags → false', () => {
      expect(isDeepEqualReact(/abc/g, /abc/i)).toBe(false);
    });

    // ── ignoreKeys ──
    it('ignoreKeys=["b"] → 忽略键 b 的差异，视为相等', () => {
      expect(isDeepEqualReact({ a: 1, b: 'x' }, { a: 1, b: 'y' }, ['b'])).toBe(
        true,
      );
    });

    // ── React 特殊处理 ──
    it('_owner 键在有 $$typeof 时跳过（React 元素内部属性）', () => {
      // React 元素的 _owner 是内部引用，不应参与比较
      // 两个对象都需要 $$typeof 以通过键数量检查
      expect(
        isDeepEqualReact(
          { a: 1, _owner: 'something', $$typeof: Symbol.for('react.element') },
          { a: 1, _owner: 'different', $$typeof: Symbol.for('react.element') },
        ),
      ).toBe(true);
    });

    // ── null/undefined 边界 ──
    it('null === null → true（引用相等快捷路径）', () => {
      expect(isDeepEqualReact(null, null)).toBe(true);
    });
    it('undefined === undefined → true', () => {
      expect(isDeepEqualReact(undefined, undefined)).toBe(true);
    });
    it('null !== undefined → false（类型不同）', () => {
      expect(isDeepEqualReact(null, undefined)).toBe(false);
    });
  });
});

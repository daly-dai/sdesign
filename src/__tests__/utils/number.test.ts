/**
 * number.ts 单元测试
 *
 * 覆盖 2 个数值工具函数。
 * formatPrice 依赖 toLocaleString，在不同 locale 下行为一致（Node 环境稳定）。
 */
import { describe, expect, it } from 'vitest';
import { formatPrice, genArrFromNum } from '../../utils/number';

describe('number — 数值工具', () => {
  // ─── formatPrice ─────────────────────────────────────────────
  // 千分位格式化：number.toLocaleString()
  describe('formatPrice — 千分位逗号格式化', () => {
    it('1234567 → 含逗号的字符串（千分位分隔）', () => {
      const result = formatPrice(1234567);
      expect(result).toContain(',');
      expect(typeof result).toBe('string');
    });
    it('1000 → "1,000"（恰好千位边界）', () => {
      expect(formatPrice(1000)).toBe('1,000');
    });
    it('0 → "0"（零值不加逗号）', () => {
      expect(formatPrice(0)).toBe('0');
    });
    it('999 → "999"（不足千位不加逗号）', () => {
      expect(formatPrice(999)).toBe('999');
    });
  });

  // ─── genArrFromNum ───────────────────────────────────────────
  // 生成 [1, 2, ..., num] 的数组
  describe('genArrFromNum — 生成 1..num 序列数组', () => {
    it('3 → [1, 2, 3]', () => {
      expect(genArrFromNum(3)).toEqual([1, 2, 3]);
    });
    it('0 → []（空数组）', () => {
      expect(genArrFromNum(0)).toEqual([]);
    });
    it('1 → [1]（单元素边界）', () => {
      expect(genArrFromNum(1)).toEqual([1]);
    });
  });
});

/**
 * date.ts 单元测试
 *
 * 覆盖 getDateVal 函数。
 * 该函数将多种日期输入格式统一转为 Dayjs 或 Dayjs[]。
 * 被 SDatePicker/SDatePickerRange 等组件使用。
 * 重点验证 4 种输入类型：string / string[] / Dayjs / undefined/null/invalid
 */
import dayjs, { isDayjs } from 'dayjs';
import { describe, expect, it } from 'vitest';
import { getDateVal } from '../../utils/date';

describe('date — 日期值标准化', () => {
  // ─── getDateVal ──────────────────────────────────────────────
  // 统一日期输入为 Dayjs 实例（单值）或 Dayjs 数组（范围）
  // 输入类型判别：string → Dayjs, string[] → Dayjs[], Dayjs → 原样, falsy → null
  describe('getDateVal — 多类型日期输入 → Dayjs 标准化', () => {
    it('字符串 "2024-01-15" → Dayjs 实例（format 验证）', () => {
      const result = getDateVal('2024-01-15');
      expect(isDayjs(result)).toBe(true);
      expect((result as dayjs.Dayjs).format('YYYY-MM-DD')).toBe('2024-01-15');
    });

    it('字符串数组 ["2024-01-15", "2024-02-20"] → Dayjs[]（日期范围）', () => {
      const result = getDateVal(['2024-01-15', '2024-02-20']);
      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(2);
      expect(isDayjs((result as dayjs.Dayjs[])[0])).toBe(true);
    });

    it('Dayjs 对象 → 原样返回（不创建新实例）', () => {
      const d = dayjs('2024-01-15');
      const result = getDateVal(d as any);
      expect(result).toBe(d); // 引用相等
    });

    it('undefined → null（无值安全返回）', () => {
      expect(getDateVal(undefined)).toBeNull();
    });

    it('null → null（falsy 路径）', () => {
      expect(getDateVal(null as any)).toBeNull();
    });

    it('无效日期字符串 "not-a-date" → null（dayjs 校验不通过）', () => {
      expect(getDateVal('not-a-date')).toBeNull();
    });
  });
});

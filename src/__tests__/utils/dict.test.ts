/**
 * dict.ts 单元测试
 *
 * 覆盖 3 个字典处理函数。
 * 字典系统是 sdesign 的核心基础设施，被 SDetail/SForm/STable 广泛使用。
 * 重点验证：
 *   - 两种 dictMap 格式（对象 map / 数组 map）的查找正确性
 *   - 空值/缺失的防御行为（统一返回 '-'）
 *   - dictReflect 自定义字段名映射
 *   - getDictMap 的三级回退策略（dictMap → globalDict[dictKey] → {}）
 */
import { describe, expect, it } from 'vitest';
import {
  dispatchCheckboxDictData,
  dispatchDictData,
  getDictMap,
} from '../../utils/dict';

describe('dict — 字典映射工具', () => {
  // ─── dispatchDictData ────────────────────────────────────────
  // 单值字典翻译：根据 detailValue 在 dictMap 中查找对应 label
  // 支持两种 dictMap 格式：
  //   对象格式：{ value: label } 直接索引
  //   数组格式：[{ name: value, label: text }] 遍历匹配
  describe('dispatchDictData — 单值字典翻译', () => {
    const objectMap = { a: '标签A', b: '标签B' };
    const arrayMap = [
      { name: 'a', label: '标签A' },
      { name: 'b', label: '标签B' },
    ];

    it('对象 dictMap：命中 key → 返回对应 label', () => {
      expect(dispatchDictData(objectMap, 'a')).toBe('标签A');
      expect(dispatchDictData(objectMap, 'b')).toBe('标签B');
    });
    it('对象 dictMap：未命中 key → "-"（统一占位符）', () => {
      expect(dispatchDictData(objectMap, 'c')).toBe('-');
    });
    it('数组 dictMap（默认 name/label 字段）：命中 → 返回 label', () => {
      expect(dispatchDictData(arrayMap, 'a')).toBe('标签A');
    });
    it('数组 dictMap：未命中 → "-"', () => {
      expect(dispatchDictData(arrayMap, 'c')).toBe('-');
    });
    it('detailValue 为 null/undefined → "-"（不抛异常，安全返回）', () => {
      expect(dispatchDictData(objectMap, null)).toBe('-');
      expect(dispatchDictData(objectMap, undefined)).toBe('-');
    });
    it('dictMap 本身为 null/undefined → "-"（无字典可查）', () => {
      expect(dispatchDictData(null, 'a')).toBe('-');
      expect(dispatchDictData(undefined, 'a')).toBe('-');
    });
    it('dictReflect 自定义字段名：{ name: "id", label: "title" } 映射', () => {
      // 当数组 map 的字段名不是 name/label 时，通过 dictReflect 指定
      const customMap = [{ id: 'x', title: '标题X' }];
      expect(
        dispatchDictData(customMap, 'x', { name: 'id', label: 'title' }),
      ).toBe('标题X');
    });
  });

  // ─── dispatchCheckboxDictData ────────────────────────────────
  // 多选字典翻译：逗号分隔的 value 字符串 → 斜杠分隔的 label 字符串
  // 处理流程：'a,b' → split(',') → map(dictMap[key]) → join('/')
  describe('dispatchCheckboxDictData — 多选值字典翻译（逗号→斜杠）', () => {
    const arrayMap = [
      { name: 'a', label: '标签A' },
      { name: 'b', label: '标签B' },
      { name: 'c', label: '标签C' },
    ];

    it("'a,b' → '标签A/标签B'（逗号拆分 → 逐个翻译 → 斜杠拼接）", () => {
      expect(dispatchCheckboxDictData(arrayMap, 'a,b', {})).toBe('标签A/标签B');
    });
    it('null / undefined detailValue → "-"（安全处理）', () => {
      expect(dispatchCheckboxDictData(arrayMap, null, {})).toBe('-');
      expect(dispatchCheckboxDictData(arrayMap, undefined, {})).toBe('-');
    });
    it("空字符串 '' → '-'（length 为 0 直接返回）", () => {
      expect(dispatchCheckboxDictData(arrayMap, '', {})).toBe('-');
    });
    it('dictMap 为 null → "-"（无字典可查）', () => {
      expect(dispatchCheckboxDictData(null, 'a,b', {})).toBe('-');
    });
  });

  // ─── getDictMap ──────────────────────────────────────────────
  // 三级回退策略获取字典映射：
  //   1. dictMap 直接传入 → 原样返回（优先级最高）
  //   2. dictKey + globalDict → 从全局字典查找子对象
  //   3. 都没有 → 返回 {}
  describe('getDictMap — 字典映射获取（dictMap > globalDict > {}）', () => {
    it('dictMap 有值 → 直接返回 dictMap（跳过 globalDict）', () => {
      const dictMap = { a: '标签A' };
      expect(getDictMap({ dictMap, dictKey: 'x', globalDict: {} })).toBe(
        dictMap,
      );
    });
    it('无 dictKey → 返回 {}（无法定位字典）', () => {
      expect(getDictMap({ dictKey: undefined, globalDict: {} })).toEqual({});
    });
    it('globalDict[dictKey] 匹配 → 返回对应子对象', () => {
      const globalDict = { status: { active: '启用' } } as any;
      expect(getDictMap({ dictKey: 'status', globalDict })).toEqual({
        active: '启用',
      });
    });
    it('globalDict 中无 dictKey → 返回 {}', () => {
      const globalDict = { status: { active: '启用' } } as any;
      expect(getDictMap({ dictKey: 'nonexistent', globalDict })).toEqual({});
    });
    it('dictMap 为 null → 回退到 globalDict/{}（null 是 falsy）', () => {
      expect(
        getDictMap({ dictMap: null, dictKey: 'x', globalDict: {} }),
      ).toEqual({});
    });
  });
});

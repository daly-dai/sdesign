import type { RuleObject } from 'antd/es/form';
import { describe, expect, it } from 'vitest';

import {
  genRequiredRule,
  getDefaultConfig,
  getRegData,
} from '../components/item-render/constant';

// ============================================================
describe('genRequiredRule', () => {
  it('true → [{ required: true }]', () => {
    expect(genRequiredRule(true)).toEqual([{ required: true }]);
  });

  it('string → [{ required: true, message }]', () => {
    expect(genRequiredRule('请输入')).toEqual([
      { required: true, message: '请输入' },
    ]);
  });

  it('undefined → null', () => {
    expect(genRequiredRule(undefined)).toBeNull();
  });

  it('false → null', () => {
    expect(genRequiredRule(false)).toBeNull();
  });
});

// ============================================================
describe('getDefaultConfig', () => {
  // -- 输入类 --
  it('input 非 readonly → placeholder + allowClear', () => {
    expect(getDefaultConfig('input', false)).toEqual({
      placeholder: '请输入',
      allowClear: true,
    });
  });
  it('input readonly → variant="borderless" + disabled', () => {
    expect(getDefaultConfig('input', true)).toEqual({
      variant: 'borderless',
      disabled: true,
    });
  });

  it('inputNumber 非 readonly → 请输入', () => {
    expect(getDefaultConfig('inputNumber', false)).toEqual({
      placeholder: '请输入',
      allowClear: true,
    });
  });

  it('textarea 非 readonly → 请输入', () => {
    expect(getDefaultConfig('textarea', false)).toEqual({
      placeholder: '请输入',
      allowClear: true,
    });
  });

  it('password 非 readonly → 请输入', () => {
    expect(getDefaultConfig('password', false)).toEqual({
      placeholder: '请输入',
      allowClear: true,
    });
  });

  // -- 选择类 --
  it('select 非 readonly → 请选择', () => {
    expect(getDefaultConfig('select', false)).toEqual({
      placeholder: '请选择',
      allowClear: true,
    });
  });

  it('datePicker 非 readonly → 请选择', () => {
    expect(getDefaultConfig('datePicker', false)).toEqual({
      placeholder: '请选择',
      allowClear: true,
    });
  });

  it('datePickerRange 非 readonly → 请选择', () => {
    expect(getDefaultConfig('datePickerRange', false)).toEqual({
      placeholder: '请选择',
      allowClear: true,
    });
  });

  it('treeSelect 非 readonly → 请选择', () => {
    expect(getDefaultConfig('treeSelect', false)).toEqual({
      placeholder: '请选择',
      allowClear: true,
    });
  });

  it('cascader 非 readonly → 请选择', () => {
    expect(getDefaultConfig('cascader', false)).toEqual({
      placeholder: '请选择',
      allowClear: true,
    });
  });

  // -- 时间类 --
  it('timePicker 非 readonly → placeholder="" + allowClear', () => {
    // generateDefaultConfig 用 && 短路：空字符串为 falsy，不加入 placeholder
    expect(getDefaultConfig('timePicker', false)).toEqual({
      allowClear: true,
    });
  });

  it('timePickerRange 非 readonly → placeholder="" + allowClear', () => {
    expect(getDefaultConfig('timePickerRange', false)).toEqual({
      allowClear: true,
    });
  });

  // -- 废弃别名 --
  it('SDatePicker → 与 datePicker 一致', () => {
    expect(getDefaultConfig('SDatePicker', false)).toEqual(
      getDefaultConfig('datePicker', false),
    );
  });

  it('SDatePickerRange → 与 datePickerRange 一致', () => {
    expect(getDefaultConfig('SDatePickerRange', false)).toEqual(
      getDefaultConfig('datePickerRange', false),
    );
  });

  it('SCascader → 与 cascader 一致', () => {
    expect(getDefaultConfig('SCascader', false)).toEqual(
      getDefaultConfig('cascader', false),
    );
  });

  // -- 无默认配置 --
  it('radioGroup → {}（无默认配置）', () => {
    expect(getDefaultConfig('radioGroup', false)).toEqual({});
  });

  it('switch → {}', () => {
    expect(getDefaultConfig('switch', false)).toEqual({});
  });

  it('slider → {}', () => {
    expect(getDefaultConfig('slider', false)).toEqual({});
  });

  it('checkbox → {}', () => {
    expect(getDefaultConfig('checkbox', false)).toEqual({});
  });

  // -- 边界 --
  it('未知 type → {}', () => {
    expect(getDefaultConfig('unknown' as any, false)).toEqual({});
  });

  it('undefined type → input 默认配置（fallback）', () => {
    expect(getDefaultConfig(undefined, false)).toEqual({
      placeholder: '请输入',
      allowClear: true,
    });
  });

  // -- readonly 通用行为 --
  it('任意 readonly=true 的 type → variant borderless + disabled', () => {
    expect(getDefaultConfig('select', true)).toEqual({
      variant: 'borderless',
      disabled: true,
    });
    expect(getDefaultConfig('cascader', true)).toEqual({
      variant: 'borderless',
      disabled: true,
    });
  });
});

// ============================================================
describe('getRegData', () => {
  it('已知 regKey → 返回 pattern + message', () => {
    const rules = getRegData('phone' as any);
    expect(rules).toBeTruthy();
    const rule = rules![0] as RuleObject;
    expect(rule.pattern).toBeDefined();
    expect(rule.message).toContain('手机号');
  });

  it('未知 regKey → null', () => {
    expect(getRegData('notExist' as any)).toBeNull();
  });
});

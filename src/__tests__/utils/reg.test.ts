import { describe, expect, it } from 'vitest';

import { validate } from '@dalydb/sdesign/utils';

describe('utils/reg validate', () => {
  it('命中规则返回 true', () => {
    expect(validate('phone', '13800138000')).toBe(true);
    expect(validate('intNumber', '123')).toBe(true);
    expect(validate('email', 'a@b.com')).toBe(true);
  });

  it('不命中规则返回 false', () => {
    expect(validate('phone', 'abc')).toBe(false);
    expect(validate('intNumber', '-1')).toBe(false);
  });

  it('未知规则返回 false', () => {
    expect(validate('notExist' as any, 'x')).toBe(false);
  });

  it('带 g 标志的正则连续校验结果一致（lastIndex 残留回归）', () => {
    // chinese 的 pattern 带 g 标志，修复前 test 的 lastIndex 会残留，
    // 导致第二次校验错误地返回 false
    expect(validate('chinese', '你好')).toBe(true);
    expect(validate('chinese', '世界')).toBe(true);
    expect(validate('chinese', 'abc123')).toBe(false);
    expect(validate('chinese', '中文')).toBe(true);
  });
});

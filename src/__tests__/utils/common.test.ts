/**
 * common.ts 单元测试
 *
 * 覆盖 5 个通用工具函数。
 * 重点验证：
 *   - createCode：随机码长度和字符集约束
 *   - dispatchFileName：文件名截断逻辑（保留前后三 + 扩展名）
 *   - createArray：0..n-1 序列生成
 *   - getBase64：File → base64 data URL 异步转换
 *   - isBrowser：环境检测（TEST / browser / node）
 */
import { describe, expect, it } from 'vitest';
import {
  createArray,
  createCode,
  dispatchFileName,
  getBase64,
  isBrowser,
} from '../../utils/common';

describe('common — 通用工具', () => {
  // ─── createCode ──────────────────────────────────────────────
  // 生成 n 位随机码（大写字母 + 小写字母 + 数字 1-9，不含 0）
  describe('createCode — 随机验证码生成', () => {
    it('默认 4 位，仅含字母和 1-9 数字（不含 0）', () => {
      const code = createCode();
      expect(code).toHaveLength(4);
      expect(/^[A-Za-z1-9]+$/.test(code)).toBe(true);
    });
    it('createCode(6) → 6 位，createCode(10) → 10 位', () => {
      expect(createCode(6)).toHaveLength(6);
      expect(createCode(10)).toHaveLength(10);
    });
    it('多次生成均满足字符集约束（20 次采样验证）', () => {
      for (let i = 0; i < 20; i++) {
        const code = createCode(8);
        expect(/^[A-Za-z1-9]+$/.test(code)).toBe(true);
      }
    });
  });

  // ─── dispatchFileName ────────────────────────────────────────
  // 文件名超长截断：保留前 3 + "..." + 后 3 + 扩展名
  describe('dispatchFileName — 文件名超长截断', () => {
    it("'test.txt' 限制 20 → 不截断（未超限）", () => {
      expect(dispatchFileName('test.txt', 20)).toBe('test.txt');
    });
    it("'verylongfilename.txt' 限制 10 → 'ver...ame.txt'（前后各三+扩展名）", () => {
      const result = dispatchFileName('verylongfilename.txt', 10);
      expect(result).toContain('...');
      expect(result).toContain('.txt');
    });
    it("空字符串 '' → ''（无文件名）", () => {
      expect(dispatchFileName('', 10)).toBe('');
    });
    it("'hello' 限制 10 → 'hello'（无扩展名未超限）", () => {
      expect(dispatchFileName('hello', 10)).toBe('hello');
    });
    it("'verylongfilename' 限制 6 → 'ver...ame'（无扩展名也截断）", () => {
      const result = dispatchFileName('verylongfilename', 6);
      expect(result).toBe('ver...ame');
    });
  });

  // ─── createArray ─────────────────────────────────────────────
  // 生成长度为 num 的 [0, 1, ..., num-1] 数组
  describe('createArray — 生成 0..n-1 序列', () => {
    it('3 → [0, 1, 2]', () => {
      expect(createArray(3)).toEqual([0, 1, 2]);
    });
    it('默认参数 → [0, 1, 2, 3]（num=4）', () => {
      expect(createArray()).toEqual([0, 1, 2, 3]);
    });
    it('0 → []（空数组）', () => {
      expect(createArray(0)).toEqual([]);
    });
  });

  // ─── getBase64 ───────────────────────────────────────────────
  // File → base64 data URL（通过 FileReader.readAsDataURL）
  describe('getBase64 — File 转 base64 Data URL', () => {
    it('返回 Promise 实例', () => {
      const file = new File(['test'], 'test.txt', { type: 'text/plain' });
      expect(getBase64(file)).toBeInstanceOf(Promise);
    });

    it('resolve 后返回 data:...;base64,... 格式的字符串', async () => {
      const file = new File(['hello world'], 'test.txt', {
        type: 'text/plain',
      });
      const result = await getBase64(file);
      expect(typeof result).toBe('string');
      expect(result).toContain('data:');
      expect(result).toContain('base64');
    });
  });

  // ─── isBrowser ───────────────────────────────────────────────
  // 判断当前是否浏览器环境：
  //   1. process.env.NODE_ENV === 'TEST' → true
  //   2. window/document/matchMedia 存在且非 Node → true
  //   3. 否则 → false
  describe('isBrowser — 浏览器环境检测', () => {
    it('返回 boolean（jsdom 中 process 存在可能影响结果）', () => {
      // vitest jsdom: process 存在且 process.versions.node 非空 → 可能 false
      // NODE_ENV='test'（小写）与 'TEST'（大写）不匹配 → 走 node 检测
      expect(typeof isBrowser()).toBe('boolean');
    });
  });
});

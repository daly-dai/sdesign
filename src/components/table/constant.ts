/**
 * 将给定的参数转换为字符串或数字形式（供表格单元格默认展示）。
 * - `null` / `undefined` → `'-'`
 * - `string` → 原样返回，空串返回 `'-'`
 * - `number` → 原样返回（0 是合法值）
 * - `boolean` / `bigint` → 转字符串（避免布尔列显示 `'-'`）
 * - `Array` → 元素连接为字符串，空数组返回 `'-'`
 * - 其余（对象 / symbol / 函数等）→ `'-'`
 *
 * @param t 任意类型的单元格值
 * @returns 转换后的字符串或数字
 */
export function convertToText(t: unknown): string | number {
  if (t === null || t === undefined) return '-';

  if (typeof t === 'string') return t || '-';

  if (typeof t === 'number') return t;

  if (typeof t === 'boolean' || typeof t === 'bigint') return String(t);

  if (Array.isArray(t)) return t.length === 0 ? '-' : t.join(', ');

  // 对象 / symbol / 函数等
  return '-';
}

/**
 * 将给定的参数转换为字符串或数字形式。
 * - 如果参数为 `null` 或 `undefined`，则返回 `'-'`。
 * - 如果参数为数值或字符串类型，则直接返回该参数，若参数为空字符串，则返回 `'-'`。
 * - 如果参数为数组，则将数组元素连接为字符串，如果数组为空，则返回 `'-'`。
 * - 如果参数为对象（非数组），则返回 `'-'`。额外逻辑可以针对特定对象类型进行扩展。
 * - 对于所有其他未知类型，返回 `'-'`。
 *
 * @param t 任意类型的参数，将被尝试转换为字符串或数字。
 * @returns 返回转换后的字符串或数字，特定情况下返回 `'-'`。
 */
export function convertToText(t: any): string | number {
  // 直接处理null和undefined的情况
  if (t === null || t === undefined) {
    return '-';
  }

  // 处理数值和空字符串的情况
  if (typeof t === 'number' || typeof t === 'string') {
    return t || '-';
  }

  // 特殊处理对象和数组的情况，避免将空数组误解为对象
  if (Array.isArray(t)) {
    return t.length === 0 ? '-' : t.join(', ');
  }

  if (typeof t === 'object' && t !== null && !Array.isArray(t)) {
    // 这里可以添加额外的逻辑来处理特定的对象类型
    return '-';
  }

  // 对于未知类型，返回一个默认值或者可以抛出一个异常，取决于应用的需求
  return '-';
}

// table cell 超出长度样式设置展示...
export const cellStyle = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  display: 'block',
};

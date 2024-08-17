/**
 * 数值千分位加符号
 * @param {string} price - 数值
 * @param {string} sign - 符号 默认 （,）
 * @return {string} 返回添加符号后的值
 * @example
 */
export const formatPrice = (price: number): string => {
  return price.toLocaleString();
};

/**
 *  生成的数组，长度为num，元素为从1到num的整数数组
 */
export function genArrFromNum(num: number): number[] {
  return Array.from({ length: num }, (_, i) => i + 1);
}

/**
 * 判断两个对象是否深度相等
 * @param a 第一个对象
 * @param b 第二个对象
 * @param ignoreKeys 忽略的属性名数组
 * @param debug 是否开启调试模式
 * @returns 如果两个对象深度相等，则返回true；否则返回false
 */
export function isDeepEqualReact(
  a: any,
  b: any,
  ignoreKeys?: string[],
  debug?: boolean,
): boolean {
  if (a === b) return true;

  const areBothObjects =
    a && b && typeof a === 'object' && typeof b === 'object';
  if (!areBothObjects || a.constructor !== b.constructor) return false;

  if (Array.isArray(a)) {
    if (a.length !== b.length) return false;
    for (let i = a.length - 1; i >= 0; i--) {
      if (!isDeepEqualReact(a[i], b[i], ignoreKeys, debug)) return false;
    }
    return true;
  }

  if (a instanceof Map && b instanceof Map) {
    if (a.size !== b.size) return false;
    for (const [key, value] of a.entries()) {
      if (
        !b.has(key) ||
        !isDeepEqualReact(value, b.get(key), ignoreKeys, debug)
      )
        return false;
    }
    return true;
  }

  if (a instanceof Set && b instanceof Set) {
    if (a.size !== b.size) return false;
    for (const item of a.entries()) {
      if (!b.has(item[0])) return false;
    }
    return true;
  }

  if (ArrayBuffer.isView(a as any[]) && ArrayBuffer.isView(b as any[])) {
    if (a.length !== b.length) return false;
    for (let i = a.length - 1; i >= 0; i--) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  if (a.constructor === RegExp)
    return a.source === b.source && a.flags === b.flags;
  if (typeof a.valueOf === 'function' && a.valueOf !== Object.prototype.valueOf)
    return a.valueOf() === b.valueOf();
  if (
    typeof a.toString === 'function' &&
    a.toString !== Object.prototype.toString
  )
    return a.toString() === b.toString();

  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;

  for (let i = keys.length - 1; i >= 0; i--) {
    const key = keys[i];
    if (ignoreKeys?.includes(key)) continue;

    if (key === '_owner' && a.$$typeof) continue;

    if (
      !Object.prototype.hasOwnProperty.call(b, key) ||
      !isDeepEqualReact(a[key], b[key], ignoreKeys, debug)
    ) {
      if (debug) console.log(key);
      return false;
    }
  }

  return true;
}

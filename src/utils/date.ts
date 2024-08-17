import dayjs, { Dayjs } from 'dayjs';

import { RangeValueType } from '../components';

function isDayjsInstance(obj: dayjs.Dayjs) {
  // 检查对象是否存在并且不是原始类型
  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    // 检查对象是否有 Day.js 常见的属性或方法
    // 注意：这里只是一个示例，Day.js 的 API 可能会变化
    // 你可以根据 Day.js 的当前版本和你想要检查的具体属性/方法进行修改
    return (
      typeof obj.format === 'function' && // Day.js 实例有 format 方法
      typeof obj.toDate === 'function' && // Day.js 实例可以转换为 Date 对象
      // ... 可以添加更多 Day.js 特有的检查
      true // 如果上述条件都满足，则假设它是 Day.js 实例
    );
  }
  return false; // 如果不是对象，或者没有上述属性/方法，则不是 Day.js 实例
}

export function getDateVal(data: RangeValueType | undefined) {
  if (!data) return null;

  if (typeof data === 'string') {
    if (!dayjs(data)?.isValid()) return null;

    return dayjs(data);
  }

  if (Array.isArray(data) && data?.length) {
    return data?.map((item: string | null) => {
      if (!dayjs(item)?.isValid()) return null;

      return dayjs(item);
    });
  }

  if (typeof data === 'object' && isDayjsInstance(data as Dayjs)) {
    return data;
  }

  return null;
}

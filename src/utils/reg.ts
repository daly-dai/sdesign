import { RegItem, RegKeyType } from '../types/reg';

// 关于数字的校验规则
export const REG_KEY_MAP: Record<RegKeyType, RegItem> = {
  /** @description 最多两位小数 */
  maxTwoDecimals: {
    key: 'maxTwoDecimals',
    message: '保留两位小数',
    pattern: /^[0-9]\d*(\.\d{1,2})?$/,
  },
  number: {
    key: 'number',
    message: '数字',
    pattern: /^\d+(\.\d+)?$/,
  },
  intNumber: {
    key: 'intNumber',
    message: '正整数',
    pattern: /^[1-9]\d*$/,
  },
  negativeInteger: {
    key: 'negativeInteger',
    message: '负整数',
    pattern: /^-[1-9]\d*$/,
  },
  isNotNegativeFloatNum: {
    key: 'isNotNegativeFloatNum',
    message: '匹配非负浮点数',
    pattern: /^\d+(\.\d+)?$/,
  },
  percentage: {
    key: 'percentage',
    message: '百分比',
    pattern: /^(?:100(?:\.0+)?|0(?:\.0+)?|\d{1,2}(?:\.\d+)?)$/,
  },
  phone: {
    key: 'phone',
    message: '手机号',
    pattern:
      /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/,
  },
  chinese_and_english: {
    key: 'chinese_and_english',
    message: '汉字和英语',
    pattern: /^[\u4e00-\u9fa5a-zA-Z]+$/,
  },
  chinese: {
    key: 'chinese',
    message: '中文',
    pattern: /[\u4e00-\u9fa5]+/g,
  },
  website: {
    key: 'website',
    message: '网址',
    pattern:
      /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/,
  },
  socialCreditCode: {
    key: 'socialCreditCode',
    message: '统一社会信用代码',
    pattern: /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/,
  },
  email: {
    key: 'email',
    message: '邮箱',
    pattern:
      /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/,
  },
  idCard: {
    key: 'idCard',
    message: '身份证',
    pattern:
      /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  },
  cPattern: {
    key: 'cPattern',
    message: '车牌号',
    pattern:
      /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
  },
  numeric_letters: {
    key: 'numeric_letters',
    message: '数字，字母，数字或字母组合',
    pattern: /^[0-9a-zA-Z]{0,40}$/g,
  },
  chinese_numeric_letters: {
    key: 'chinese_numeric_letters',
    message: '数字，字母，汉字，任意组合',
    pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,
  },
  cname: {
    key: 'cname',
    message: '中文姓名',
    pattern: /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/,
  },
  ename: {
    key: 'ename',
    message: '英文名 每一个单词首字母都是大写',
    pattern: /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/,
  },
  color16Reg: {
    key: 'color16Reg',
    message: '16进制颜色',
    pattern: /^#([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i,
  },
  ip: {
    key: 'ip',
    message: 'IP地址',
    pattern:
      /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
  },
  ipv4: {
    key: 'ipv4',
    message: 'ipv4',
    pattern:
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  },
  mac: {
    key: 'mac',
    message: 'mac地址是否正确',
    pattern:
      /^[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}$/,
  },

  url: {
    // 匹配IP地址和域名
    key: 'url',
    message: 'IP地址和域名',
    pattern: /^(http|https):\/\/([\w-]+\.)+[\w-]+(:[\d]+)?(\/.*)?$/,
  },
};

/**
 * 验证函数，用于给定的键值对是否符合正则表达式的规则
 * @param key - 键名
 * @param value - 键值
 * @returns 如果符合规则则返回true，否则返回false
 */
export function validate(key: RegKeyType, value: any): boolean {
  if (!REG_KEY_MAP[key]) return false;

  const regData = REG_KEY_MAP[key].pattern;

  return new RegExp(regData).test(value);
}

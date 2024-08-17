import { tuple } from '../utils/types';

const RegKeys = tuple(
  'maxTwoDecimals',
  'percentage',
  'phone',
  'chinese',
  'chinese_and_english',
  'website',
  'socialCreditCode',
  'email',
  'intNumber',
  'negativeInteger',
  'isNotNegativeFloatNum',
  'idCard',
  'cPattern',
  'number',
  'numeric_letters',
  'chinese_numeric_letters',
  'cname',
  'ename',
  'ip',
  'ipv4',
  'color16Reg',
  'mac',
  'url',
);

/**
 * @description 校验规则类型包括
 * @description maxTwoDecimals: 保留两位小数
 * @description number: 数字
 * @description intNumber: 正整数
 * @description  negativeInteger: 负整数
 * @description isNotNegativeFloatNum: 匹配非负浮点数
 * @description percentage: 百分比
 * @description phone: 手机号
 * @description chinese_and_english: 汉字和英语
 * @description chinese: 中文
 * @description website: 网址
 * @description socialCreditCode: 统一社会信用代码
 * @description email: 邮箱
 * @description idCard: 身份证
 * @description cPattern: 车牌号
 * @description numeric_letters: 数字，字母，数字或字母组合
 * @description chinese_numeric_letters: 数字，字母，汉字，任意组合
 * @description cname: 中文姓名
 * @description ename: 英文名 每一个单词首字母都是大写
 * @description color16Reg: 16进制颜色
 * @description ip: IP地址
 * @description ipv4: ipv4
 * @description mac: mac地址是否正确
 */
export type RegKeyType = (typeof RegKeys)[number];

export interface RegItem {
  key: regKey;
  message: string;
  pattern: RegExp;
}

/**
 * 生成唯一code
 * @param num code的位数
 * @returns
 */
export function createCode(num = 4) {
  const UP_ALPHABET = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  const DOWN_ALPHABET = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];
  const NUMBER = ['1', '2', '3', '4', '5', '6', '7', '8', '9']; //用数组chars保存验证码里出现的字符

  const chars = UP_ALPHABET.concat(DOWN_ALPHABET, NUMBER);

  let randCode = ''; //定义一个初始值为空的字符串变量为最终产生的随机验证码

  for (let i = 0; i < num; i++) {
    //0-1的随机小数 -->  0~数组长度-1的范围   取整
    const randPosition = Math.floor(Math.random() * (chars.length - 1)); //每次生成一个随机数的位置

    randCode += chars[randPosition]; //带有随机位置作为下标，指示到当前随机产生的某个字符上，将其连接到随机验证码的后面
  }

  return randCode;
}

/**
 * 处理文件名称,超过限制字数保留前三后三
 * @param name
 * @returns
 */
export function dispatchFileName(name: string, nameLimit: number) {
  if (!name) return '';

  let FileDataType = '';

  if (name.includes('.')) {
    const nameList = name.split('.');

    if (nameList?.length > 1) {
      FileDataType = `.${nameList[nameList.length - 1]}`;
    }
  }

  let fileName = name;

  if (FileDataType) {
    fileName = name.replace(FileDataType, '');
  }

  if (fileName.length > nameLimit) {
    const lastThreeChars = fileName.substring(fileName.length - 3); // 截取后三个字符
    const firstThreeChars = fileName.substring(0, 3); // 截取前三个字符

    return `${firstThreeChars}...${lastThreeChars}${FileDataType}`;
  }

  return name;
}

/**
 * @description 创建数组
 * @param num
 * @returns
 */
export function createArray(num = 4) {
  return Array.from({ length: num }, (_, i) => i);
}

/**
 * 获取文件base64相关数据
 * @param file
 * @returns
 */
export function getBase64(file: any): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
/**
 * 动态引入js
 *
 * @param {string} src - js链接地址
 * @example
 *
 * ```ts
 * import { injectScript } from 'super-tools-lib'
 *
 * injectScript(src)
 * ```
 */
export function injectScript(src: string) {
  const s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = src;
  const t = document.getElementsByTagName('script')[0] as any;

  t.parentNode.insertBefore(s, t);
}

/**
 * 复制文本到剪切板
 * @param text 需要复制的文本
 */
export async function copyToClipboard(
  text: string,
  successCb?: () => void,
  errorCb?: () => void,
): Promise<void> {
  // 检查权限的示例函数，具体实现取决于你的框架和API
  async function checkPermission(): Promise<void> {
    if (!('clipboardWrite' in navigator.clipboard)) {
      throw new Error('Clipboard API is not supported.');
    }
  }

  try {
    // 检查是否具有剪贴板写入权限的函数
    await checkPermission(); // 检查权限，根据实际情况可能需要不同的实现
    await navigator.clipboard.writeText(text);
    successCb?.();
  } catch (error) {
    console.error('Failed to copy text to clipboard:', error);
    errorCb?.();
  }
}

const isNode =
  typeof process !== 'undefined' &&
  process.versions !== null &&
  process.versions.node !== null;

/**
 * 用于判断当前是否在浏览器环境中。
 * 首先会判断当前是否处于测试环境中（通过 process.env.NODE_ENV === 'TEST' 判断），
 * 如果是，则返回 true。否则，会进一步判断是否存在 window 对象、document 对象以及 matchMedia 方法
 * 同时通过 !isNode 判断当前不是在服务器（Node.js）环境下执行，
 * 如果都符合，则返回 true 表示当前处于浏览器环境中。
 * @returns  boolean
 */
export const isBrowser = () => {
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'TEST') {
    return true;
  }
  return (
    typeof window !== 'undefined' &&
    typeof window.document !== 'undefined' &&
    typeof window.matchMedia !== 'undefined' &&
    !isNode
  );
};

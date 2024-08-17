import { describe, expect, test } from 'vitest';

import { createArray, createCode, dispatchFileName } from '../common';

describe('createCode', () => {
  test('should create a code with default length of 4', () => {
    const code = createCode();
    expect(code).toHaveLength(4);
  });

  test('should create a code with specified length', () => {
    const length = 6;
    const code = createCode(length);
    expect(code).toHaveLength(length);
  });

  test('should create a code containing only allowed characters', () => {
    const code = createCode();
    const allowedChars = [
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
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
    ];
    expect(
      code.split('').every((char) => allowedChars.includes(char)),
    ).toBeTruthy();
  });
});

describe('dispatchFileName', () => {
  test('should return empty string if name is empty', () => {
    expect(dispatchFileName('', 10)).toBe('');
  });

  test('should return name if name does not exceed nameLimit', () => {
    const name = 'example';
    const nameLimit = 10;
    expect(dispatchFileName(name, nameLimit)).toBe(name);
  });

  test('should truncate name if name exceeds nameLimit', () => {
    const name = 'example';
    const nameLimit = 5;
    const expected = 'exa...ple';
    expect(dispatchFileName(name, nameLimit)).toBe(expected);
  });

  test('should handle file extension', () => {
    const name = 'example.txt';
    const nameLimit = 7;
    const expected = 'example.txt';
    expect(dispatchFileName(name, nameLimit)).toBe(expected);
  });

  test('should return name if name does not contain file extension', () => {
    const name = 'example';
    const nameLimit = 7;
    expect(dispatchFileName(name, nameLimit)).toBe(name);
  });
});

describe('createArray', () => {
  test('should create an array with the default length of 4', () => {
    const result = createArray();
    expect(result).toEqual([0, 1, 2, 3]);
  });

  test('should create an array with the specified length', () => {
    const length = 6;
    const result = createArray(length);
    expect(result).toEqual(Array.from({ length }, (_, i) => i));
  });

  test('should create an array with all elements equal to 0 if no callback is provided', () => {
    const length = 5;
    const result = createArray(length);
    expect(result).toEqual(Array.from({ length }, (_, i) => i));
  });
});

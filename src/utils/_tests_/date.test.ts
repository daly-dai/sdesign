import dayjs from 'dayjs';
import { describe, expect, it } from 'vitest';

import { getDateVal } from '../date';

describe('getDateVal', () => {
  it('should return null for undefined input', () => {
    expect(getDateVal(undefined)).toBeNull();
  });

  it('should return null for invalid string input', () => {
    expect(getDateVal('invalid date')).toBeNull();
  });

  it('should return dayjs object for valid string input', () => {
    const validDate = '2022-01-01';
    const expectedResult = dayjs(validDate);
    expect(getDateVal(validDate)).toEqual(expectedResult);
  });

  it('should return array of dayjs objects for valid array input', () => {
    const validDates = ['2022-01-01', '2022-02-01'];
    const expectedResult = validDates.map((date) => dayjs(date));
    expect(getDateVal(validDates)).toEqual(expectedResult);
  });

  it('should return array with null for invalid array input', () => {
    const invalidDates = ['2022-01-01', 'invalid date'];
    const expectedResult = [dayjs('2022-01-01'), null];

    expect(getDateVal(invalidDates)).toEqual(expectedResult);
  });

  it('should return null for empty array input', () => {
    expect(getDateVal([])).toBeNull();
  });
});

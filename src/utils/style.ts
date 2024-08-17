import { isString } from 'lodash';
import isNumber from 'lodash/isNumber';

import { isStringNumber } from './data-types';
import { debugWarn } from './error';

const SCOPE = 'utils/style';

export function addUnit(value?: string | number, defaultUnit = 'px') {
  if (!value) return '';

  if (isNumber(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`;
  }

  if (isString(value)) {
    return value;
  }

  debugWarn(SCOPE, 'binding value must be a string or number');
}

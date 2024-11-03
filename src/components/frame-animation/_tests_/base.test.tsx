import { describe } from 'vitest';

import SFrameAnimation from '../index';

import mountTest from '@dalydb/sdesign/tests/mountTest';

describe('SFrameAnimation', () => {
  // @ts-ignore
  mountTest(SFrameAnimation);
  // @ts-ignore
  mountTest(() => SFrameAnimation);
});

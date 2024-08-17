import { describe } from 'vitest';

import SFrameAnimation from '../index';

import mountTest from '@daly/sdesign/tests/mountTest';

describe('SFrameAnimation', () => {
  // @ts-ignore
  mountTest(SFrameAnimation);
  // @ts-ignore
  mountTest(() => SFrameAnimation);
});

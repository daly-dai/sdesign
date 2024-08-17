import React, { forwardRef } from 'react';

interface BarProps {
  always?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Bar = forwardRef<HTMLDivElement, BarProps>((props, ref) => {
  return <></>;
});

export default Bar;

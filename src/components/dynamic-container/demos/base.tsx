import React, { HTMLAttributes, ReactNode } from 'react';

import { SDynamicContainer } from '@daly/sdesign';

interface CustomProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

function Custom({ children, ...props }: CustomProps) {
  return <div {...props}>{children}</div>;
}

export default () => {
  return (
    <SDynamicContainer CustomContainer={Custom}>
      自定义外部容器
    </SDynamicContainer>
  );
};

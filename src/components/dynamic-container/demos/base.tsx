import React, { HTMLAttributes, ReactNode } from 'react';

import { SDynamicContainer } from '@dalydb/sdesign';

interface CustomProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const Custom: React.FC<CustomProps> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

export default () => {
  return (
    <SDynamicContainer CustomContainer={Custom}>
      自定义外部容器
    </SDynamicContainer>
  );
};

import React, { FC, FunctionComponent, ReactNode } from 'react';

import SCard from '@dalydb/sdesign/components/card';
import { SCardProps } from '@dalydb/sdesign/components/card/types';

export interface ContainerProps extends SCardProps {
  CustomContainer?: React.ComponentType<unknown> | FunctionComponent<any>;
  children?: ReactNode;
  hasBottomPadding?: boolean;
  isCard?: boolean;
}

const SDynamicContainer: FC<ContainerProps> = ({
  CustomContainer,
  children,
  hasBottomPadding = true,
  isCard = true,
  ...cardProps
}) => {
  if (CustomContainer) return <CustomContainer>{children}</CustomContainer>;

  if (!isCard) return children;

  return (
    <SCard hasBottomPadding={hasBottomPadding} {...cardProps}>
      {children}
    </SCard>
  );
};

export default SDynamicContainer;

import React, { FC, ReactNode } from 'react';

import SCard from '@daly/sdesign/components/card';
import { SCardProps } from '@daly/sdesign/components/card/types';

export interface ContainerProps extends SCardProps {
  CustomContainer?: React.ComponentType<any>;
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
  if (CustomContainer)
    return (
      // @ts-ignore
      <CustomContainer {...(CustomContainer?.props as any)}>
        {children}
      </CustomContainer>
    );

  if (!isCard) return <>{children}</>;

  return (
    <SCard hasBottomPadding={hasBottomPadding} {...cardProps}>
      {children}
    </SCard>
  );
};

export default SDynamicContainer;

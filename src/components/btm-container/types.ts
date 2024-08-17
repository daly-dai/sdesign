import { SpaceCompactProps } from 'antd/es/space/Compact';

export interface BottomContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  full?: boolean;
  spaceProps?: SpaceCompactProps;
}

import { ButtonProps } from 'antd/es/button/button';

export interface SCollapseProps extends ButtonProps {
  collapse?: boolean;
  setCollapse?: (collapse: boolean) => void;
  onExpand?: (collapse: boolean) => void;
}

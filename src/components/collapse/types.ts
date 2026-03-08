import { ButtonProps } from 'antd/es/button/button';

/**
 * SCollapse 折叠面板 Props
 *
 * 用于控制内容区域的展开/折叠。
 */
export interface SCollapseProps extends ButtonProps {
  /** 当前折叠状态 */
  collapse?: boolean;
  /** 设置折叠状态 */
  setCollapse?: (collapse: boolean) => void;
  /** 展开/折叠回调 */
  onExpand?: (collapse: boolean) => void;
}

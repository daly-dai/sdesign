import { GetProps, TooltipProps, Typography } from 'antd';

export type TypographyText = GetProps<typeof Typography.Text>;

// 统一的文字省略组件属性
export interface TextEllipsisProps extends TypographyText {
  /** 容器宽度 */
  width?: string | number;
  /** 最大显示行数 */
  rows?: number;
  /** 是否显示tooltip */
  tooltip?: TooltipProps;
}

// 组件类型
export type TextEllipsisType = React.FC<TextEllipsisProps>;

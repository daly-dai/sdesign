import { ButtonProps, ModalFuncProps, PopconfirmProps } from 'antd';

import { tuple } from '@dalydb/sdesign/utils/types';

const ConfirmTypes = tuple('pop', 'modal');

/**
 * 确认方式类型
 * - `'pop'` — 气泡确认框 (Popconfirm)
 * - `'modal'` — 模态对话框 (Modal.confirm)
 */
export type ConfirmType = (typeof ConfirmTypes)[number];

/**
 * SConfirm 确认组件 Props
 *
 * 统一封装了 Popconfirm 和 Modal.confirm 两种确认交互。
 *
 * @example
 * ```tsx
 * <SConfirm type="pop" onConfirm={handleDelete}>
 *   <SButton actionType="delete" />
 * </SConfirm>
 *
 * <SConfirm type="modal" title="确认删除？" onConfirm={handleDelete}>
 *   <SButton actionType="delete" />
 * </SConfirm>
 * ```
 */
export interface SConfirmProps {
  /** 确认回调 */
  onConfirm?: () => void;
  /** 取消回调 */
  onCancel?: () => void;
  /**
   * 确认方式
   * @default 'pop'
   */
  type?: ConfirmType;
  /** 确认提示文字 */
  text?: string;
  /** 标题 */
  title?: React.ReactNode;
  /** 描述 */
  description?: React.ReactNode;
  /** 触发元素 */
  children?: React.ReactNode;
  /** Popconfirm 额外属性 */
  popConfirmProps?: PopconfirmProps;
  /** 按钮额外属性 */
  buttonProps?: ButtonProps;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否阻止事件冒泡 */
  eventStop?: boolean;
  /** Modal.confirm 额外属性 */
  modalProps?: ModalFuncProps;
}

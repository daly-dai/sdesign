/**
 * ModalContainer ref 接口
 *
 * P 是 open() 时传入的参数类型
 *
 * @example
 * ```tsx
 * const modalRef = useRef<ModalContainerRef<{ id: string }>>(null);
 * modalRef.current?.open({ id: '123' });
 * modalRef.current?.close(); // 外部手动关闭
 * ```
 */
export interface ModalContainerRef<P extends object = Record<string, unknown>> {
  /** 打开弹窗并传入参数 */
  open: (params: P) => void;
  /** 手动关闭弹窗（会触发 beforeClose 守卫） */
  close: () => void;
}

/**
 * ModalContainer Content 组件接收的 props
 *
 * @example
 * ```tsx
 * const MyModalContent: React.FC<ModalChildProps<{ id: string }>> = ({ params, onClose, onSuccess }) => {
 *   // params.id 可用
 * };
 * ```
 */
export interface ModalChildProps<P extends object = Record<string, unknown>> {
  /** open() 传入的参数 */
  params: P;
  /** 弹窗是否可见（直接绑定到 antd Modal 的 open 属性） */
  open: boolean;
  /** 关闭弹窗（会触发 beforeClose 守卫） */
  onClose: () => void;
  /** 操作成功后关闭弹窗并触发外部 onSuccess */
  onSuccess?: () => void;
  /** 动画结束后的回调（destroyAfterClose 模式下用于延迟卸载） */
  afterClose?: () => void;
}

/**
 * createModal 工厂函数的 Options 配置
 */
export interface CreateModalOptions {
  /**
   * 关闭前守卫，返回 false 可阻止关闭
   *
   * 常见场景：表单脏检查、未保存提示
   *
   * @example
   * ```tsx
   * createModal(Content, {
   *   beforeClose: () => {
   *     if (form.isFieldsTouched()) {
   *       return window.confirm('有未保存的修改，确认关闭？');
   *     }
   *     return true;
   *   },
   * })
   * ```
   */
  beforeClose?: () => boolean | Promise<boolean>;
  /**
   * 关闭后是否延迟卸载内容组件，等待动画结束后再销毁
   *
   * 适用于 antd Modal/Drawer 的退出动画，避免动画未播放完就被卸载
   *
   * @default false
   */
  destroyAfterClose?: boolean;
}

/**
 * createModal 返回的 Wrapper 组件 Props
 */
export interface ModalWrapperProps {
  /** 操作成功后的回调（弹窗关闭后触发） */
  onSuccess?: () => void;
  /** 弹窗关闭后的回调（无论是否成功都会触发） */
  onClose?: () => void;
}

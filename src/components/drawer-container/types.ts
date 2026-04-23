/**
 * DrawerContainer ref 接口
 *
 * P 是 open() 时传入的参数类型
 *
 * @example
 * ```tsx
 * const drawerRef = useRef<DrawerContainerRef<{ id: string }>>(null);
 * drawerRef.current?.open({ id: '123' });
 * drawerRef.current?.close(); // 外部手动关闭
 * ```
 */
export interface DrawerContainerRef<
  P extends object = Record<string, unknown>,
> {
  /** 打开抽屉并传入参数 */
  open: (params: P) => void;
  /** 手动关闭抽屉（会触发 beforeClose 守卫） */
  close: () => void;
}

/**
 * DrawerContainer Content 组件接收的 props
 */
export interface DrawerChildProps<P extends object = Record<string, unknown>> {
  /** open() 传入的参数 */
  params: P;
  /** 抽屉是否可见（直接绑定到 antd Drawer 的 open 属性） */
  open: boolean;
  /** 关闭抽屉（会触发 beforeClose 守卫） */
  onClose: () => void;
  /** 操作成功后关闭抽屉并触发外部 onSuccess */
  onSuccess?: () => void;
  /** 动画结束后的回调（destroyAfterClose 模式下用于延迟卸载） */
  afterClose?: () => void;
}

/**
 * createDrawer 工厂函数的 Options 配置
 */
export interface CreateDrawerOptions {
  /**
   * 关闭前守卫，返回 false 可阻止关闭
   *
   * 常见场景：表单脏检查、未保存提示
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
 * createDrawer 返回的 Wrapper 组件 Props
 */
export interface DrawerWrapperProps {
  /** 操作成功后的回调（抽屉关闭后触发） */
  onSuccess?: () => void;
  /** 抽屉关闭后的回调（无论是否成功都会触发） */
  onClose?: () => void;
}

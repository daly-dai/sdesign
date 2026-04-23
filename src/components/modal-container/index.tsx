import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
  type ComponentType,
  type ForwardRefExoticComponent,
  type PropsWithoutRef,
  type RefAttributes,
} from 'react';

import type {
  CreateModalOptions,
  ModalChildProps,
  ModalContainerRef,
  ModalWrapperProps,
} from './types';

/**
 * 创建一个自动管理生命周期的 Modal 容器。
 *
 * - 自动管理 open 状态，通过 ref 暴露 `open(params)` / `close()` 方法
 * - open=false 时 Content 完全卸载，内部所有 useState / useForm 等自动销毁
 * - 泛型 P 决定 open() 的参数结构，Content 通过 `params` 接收
 * - 支持 `beforeClose` 守卫，可在关闭前拦截（如表单脏检查）
 * - 支持 `destroyAfterClose`，等待退出动画结束后再卸载内容
 *
 * @example
 * ```tsx
 * const UserFormModal = createModal<{ mode: 'create' | 'edit'; id?: string }>(
 *   ({ params, onClose, onSuccess }) => {
 *     const [form] = SForm.useForm();
 *     return (
 *       <Modal open onCancel={onClose} footer={null}>
 *         <SForm form={form} items={items} onFinish={onSuccess} />
 *       </Modal>
 *     );
 *   },
 * );
 * ```
 */
function createModal<P extends object = Record<string, unknown>>(
  Content: ComponentType<ModalChildProps<P>>,
  options: CreateModalOptions = {},
): ForwardRefExoticComponent<
  PropsWithoutRef<ModalWrapperProps> & RefAttributes<ModalContainerRef<P>>
> {
  const { beforeClose, destroyAfterClose = false } = options;

  const Wrapper = forwardRef<ModalContainerRef<P>, ModalWrapperProps>(
    (props, ref) => {
      const [visible, setVisible] = useState(false);
      const [params, setParams] = useState<P>({} as P);
      /** destroyAfterClose 模式下，标记是否可以真正卸载 */
      const [destroyed, setDestroyed] = useState(true);
      /** 防止 beforeClose 异步执行期间重复触发 */
      const closingRef = useRef(false);

      /** 统一的关闭逻辑，走 beforeClose 守卫 */
      const handleClose = useCallback(async () => {
        if (closingRef.current) return;
        if (beforeClose) {
          closingRef.current = true;
          const allow = await beforeClose();
          closingRef.current = false;
          if (!allow) return;
        }
        setVisible(false);
        props.onClose?.();
        if (!destroyAfterClose) {
          // 立即卸载模式：关闭即销毁
          setDestroyed(true);
        }
        // destroyAfterClose 模式：等 Content 内部 antd 组件动画结束后再卸载
        // Content 组件需在 afterOpenChange/false 时调用 afterClose 回调
      }, [beforeClose, destroyAfterClose, props]);

      useImperativeHandle(ref, () => ({
        open: (p) => {
          setParams(p);
          setVisible(true);
          setDestroyed(false);
          closingRef.current = false;
        },
        close: handleClose,
      }));

      /** destroyAfterClose 模式下，Content 动画结束后的回调 */
      const handleAfterClose = useCallback(() => {
        if (destroyAfterClose) {
          setDestroyed(true);
        }
      }, [destroyAfterClose]);

      // 立即卸载模式：visible=false 直接不渲染
      // destroyAfterClose 模式：visible=false 但 still mounted，等 afterClose 再卸载
      if (destroyed) return null;

      return (
        <Content
          params={params}
          open={visible}
          onClose={handleClose}
          onSuccess={() => {
            setVisible(false);
            props.onClose?.();
            if (!destroyAfterClose) {
              setDestroyed(true);
            }
            props.onSuccess?.();
          }}
          afterClose={handleAfterClose}
        />
      );
    },
  );

  Wrapper.displayName = Content.displayName || Content.name || 'ModalWrapper';
  return Wrapper;
}

/** SModalContainer 是 createModal 的别名，保持向后兼容 */
const SModalContainer = createModal;

export { createModal, SModalContainer };

export default createModal;

import { Button, Modal, Popconfirm } from 'antd';
import React, { FC, MouseEvent } from 'react';

import { SConfirmProps } from './types';

const SConfirm: FC<SConfirmProps> = (props) => {
  const {
    onConfirm,
    onCancel,
    popConfirmProps,
    buttonProps,
    children,
    type = 'pop',
    text = '删除',
    title = '删除提示',
    description = '是否确认删除该条信息',
    disabled = false,
  } = props;

  const confirmFn = () => {
    onConfirm?.();
  };

  const cancelFn = () => {
    onCancel?.();
  };

  const handleButtonClick = (event: MouseEvent<HTMLDivElement>) => {
    // 阻止事件冒泡
    event.stopPropagation();

    if (disabled) return;

    Modal.confirm({
      title,
      okText: '确认',
      cancelText: '取消',
      content: description,
      onOk: confirmFn,
      onCancel: cancelFn,
    });
  };

  if (type === 'modal') {
    return (
      <>
        <div onClick={handleButtonClick}>
          {children ? (
            children
          ) : (
            <Button disabled={disabled} type="link" {...buttonProps}>
              {text}
            </Button>
          )}
        </div>
      </>
    );
  }

  return (
    <Popconfirm
      title={title}
      description={description}
      onConfirm={confirmFn}
      onCancel={cancelFn}
      okText="是"
      cancelText="否"
      disabled={disabled}
      {...popConfirmProps}
    >
      {children ? (
        children
      ) : (
        <Button disabled={disabled} type="link" {...buttonProps}>
          {text}
        </Button>
      )}
    </Popconfirm>
  );
};

export default SConfirm;

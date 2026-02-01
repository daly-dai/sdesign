import React from 'react';
import SButton from '..';

const CompactDemo = () => {
  return (
    <div style={{ display: 'flex', gap: 20, flexDirection: 'column' }}>
      <h3>普通按钮 vs 紧凑模式按钮对比</h3>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span>普通按钮:</span>
        <SButton type="primary">普通按钮</SButton>
        <SButton type="link">链接按钮</SButton>
        <SButton actionType="save">操作按钮</SButton>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span>紧凑模式:</span>
        <SButton type="primary" compact={true}>
          紧凑按钮
        </SButton>
        <SButton type="link" compact={true}>
          紧凑链接
        </SButton>
        <SButton actionType="save" compact={true}>
          紧凑操作
        </SButton>
        <SButton actionType="reset" compact={true}>
          紧凑操作
        </SButton>
        <SButton actionType="save" compact={true}>
          紧凑操作
        </SButton>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span>t-link 按钮 (作为参考):</span>
        <SButton actionType="t-link">t-link按钮</SButton>
      </div>

      <h3>紧凑模式按钮组示例</h3>
      <SButton.Group
        items={[
          { actionType: 'edit', children: '编辑', compact: true },
          { actionType: 'delete', children: '删除', compact: true },
          { actionType: 'view', children: '查看', compact: true },
        ]}
      />

      <h3>不同按钮类型的紧凑模式</h3>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <SButton compact={true} type="primary">
          Primary
        </SButton>
        <SButton compact={true} type="dashed">
          Dashed
        </SButton>
        <SButton compact={true} type="link">
          Link
        </SButton>
        <SButton compact={true} type="text">
          Text
        </SButton>
        <SButton compact={true} actionType="save">
          保存
        </SButton>
        <SButton compact={true} actionType="cancel">
          取消
        </SButton>
        <SButton compact={true} actionType="delete">
          删除
        </SButton>
      </div>
    </div>
  );
};

export default CompactDemo;

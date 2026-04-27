import { Button, Divider, Flex, Tag } from 'antd';
import React from 'react';

import { SDynamicContainer } from '@dalydb/sdesign';

const CustomDiv: React.FC<{
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div style={{ border: '1px dashed #1677ff', padding: 16, ...style }}>
    {children}
  </div>
);

export default () => {
  return (
    <Flex vertical gap={16}>
      <strong>默认卡片容器（isCard 默认为 true）</strong>
      <SDynamicContainer>
        <div>默认 SCard 卡片包裹，底部有 padding</div>
      </SDynamicContainer>

      <strong>hasBottomPadding = false</strong>
      <SDynamicContainer title="卡片标题" hasBottomPadding={false}>
        <div>卡片底部无 padding</div>
      </SDynamicContainer>

      <strong>isCard = false（直接渲染 children）</strong>
      <SDynamicContainer isCard={false}>
        <Tag color="blue">非卡片模式，直接渲染内容节点</Tag>
      </SDynamicContainer>

      <strong>CustomContainer 自定义容器</strong>
      <SDynamicContainer CustomContainer={CustomDiv}>
        <div>自定义容器：虚线边框包裹</div>
      </SDynamicContainer>

      <strong>带 Card 属性的容器</strong>
      <SDynamicContainer
        title="完整示例"
        extra={<Button size="small">操作</Button>}
        styles={{ body: { backgroundColor: '#fafafa' } }}
      >
        <Flex vertical gap={8}>
          <span>支持透传 antd Card 全部属性</span>
          <Divider style={{ margin: '8px 0' }} />
          <span>body 背景色通过 styles.body 设置</span>
        </Flex>
      </SDynamicContainer>
    </Flex>
  );
};

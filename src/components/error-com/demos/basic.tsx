import { Flex } from 'antd';
import React from 'react';

import { SErrorCom } from '@dalydb/sdesign';

export default () => {
  return (
    <Flex vertical gap={24}>
      <strong>默认文案</strong>
      <SErrorCom />

      <strong>自定义文案</strong>
      <SErrorCom text="页面加载失败，请检查网络连接后重试" />

      <strong>自定义容器样式</strong>
      <SErrorCom
        text="数据获取异常"
        style={{
          border: '1px solid #ff4d4f',
          borderRadius: 8,
          padding: 16,
          backgroundColor: '#fff2f0',
        }}
      />

      <strong>自定义图标样式</strong>
      <SErrorCom
        text="服务暂不可用"
        iconStyle={{ fontSize: 48, color: '#faad14' }}
      />

      <strong>组合使用</strong>
      <SErrorCom
        text="请求超时，请刷新页面"
        style={{ minHeight: 200, justifyContent: 'center' }}
        iconStyle={{ fontSize: 56, color: '#ff4d4f' }}
      />
    </Flex>
  );
};

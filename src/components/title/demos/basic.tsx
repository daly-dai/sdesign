/**
 * title: 基本使用
 * description: 页面标题，子页面标题，表格标题
 */

import { Button, ConfigProvider, Space } from 'antd';
import React, { useState } from 'react';

import { SCard, STitle } from '@daly/sdesign';

export default () => {
  const [fontSize, setFontSize] = useState(14);

  const renderConfigButton = () => {
    return (
      <Space style={{ marginBottom: '16px' }}>
        <Button onClick={() => setFontSize(14)}>14px</Button>
        <Button onClick={() => setFontSize(16)}>16px</Button>
        <Button onClick={() => setFontSize(18)}>18px</Button>
      </Space>
    );
  };

  return (
    <>
      <h2>动态设置token字体大小</h2>
      {renderConfigButton()}
      <ConfigProvider theme={{ token: { fontSize } }}>
        <SCard>
          <STitle>主页面标题</STitle>

          <div style={{ marginTop: '40px' }}>
            <STitle goBack={true}>子页面标题</STitle>
          </div>

          <div style={{ marginTop: '40px', width: '200px' }}>
            <STitle type="table">表格标题</STitle>
          </div>

          <div style={{ marginTop: '40px', width: '200px' }}>
            <STitle type="form">表单标题</STitle>
          </div>
        </SCard>
      </ConfigProvider>
    </>
  );
};

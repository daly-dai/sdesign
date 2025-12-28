/**
 * title: 基础使用
 * description: 展示 SButton 组件的基础使用，自定义的类型有save、cancel、reset、upload、download、export、import、delete、view、
  back、
  next、
  previous、
  finish、
  create、
  edit、
  confirm、
  close、
  refresh、
  default、
  primary、
  dashed、
  link、
  text、
  search、
 */

import { Space, Typography } from 'antd';
import { ButtonType } from 'antd/es/button';
import React from 'react';

import defaultConfig from '../constant';
import SButton from '../index';
import { SButtonType } from '../types';

const { Title, Text } = Typography;

// 基础类型和扩展类型分组
const basicTypes: ButtonType[] = [
  'primary',
  'dashed',
  'default',
  'link',
  'text',
];
const extendedTypes = Object.keys(defaultConfig).filter(
  (type) => !(basicTypes as string[]).includes(type),
);

export default () => {
  return (
    <div style={{ padding: '20px' }}>
      <Title level={3}>SButton 按钮组件演示</Title>

      <div style={{ marginBottom: '30px' }}>
        <Text strong>基础类型：</Text>
        <Space wrap style={{ marginTop: '10px' }}>
          {basicTypes.map((type) => (
            <SButton key={type} type={type as SButtonType}>
              {type}
            </SButton>
          ))}
        </Space>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <Text strong>扩展类型：</Text>
        <Space wrap size="large" style={{ marginTop: '10px' }}>
          {extendedTypes.map((type) => (
            <SButton
              key={type}
              type={type as any}
              style={{ marginBottom: 10 }}
            />
          ))}
        </Space>
      </div>
    </div>
  );
};

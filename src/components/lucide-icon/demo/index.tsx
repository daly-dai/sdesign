import { Button, Space, Typography } from 'antd';
import React from 'react';

import SLucideIcon from '../index';
import { LucideIconName } from '../types';

const { Title, Text } = Typography;

const iconNames: Partial<LucideIconName>[] = [
  'Home',
  'User',
  'Settings',
  'Mail',
  'MessageSquare',
  'Calendar',
  'Search',
  'Bell',
  'Plus',
  'Minus',
  'X',
  'Check',
];

export default () => {
  return (
    <div style={{ padding: '20px' }}>
      <Title level={3}>SLucideIcon 图标组件演示</Title>

      <div style={{ marginBottom: '30px' }}>
        <Text strong>基础用法：</Text>
        <Space wrap style={{ marginTop: '10px' }}>
          {iconNames.slice(0, 6).map((name) => (
            <SLucideIcon key={name} name={name} />
          ))}
        </Space>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <Text strong>不同尺寸：</Text>
        <Space wrap style={{ marginTop: '10px' }}>
          <SLucideIcon name="Home" size={16} />
          <SLucideIcon name="Home" size={24} />
          <SLucideIcon name="Home" size={32} />
          <SLucideIcon name="Home" size={48} />
          <SLucideIcon name="Home" size="1em" />
          <SLucideIcon name="Home" size="2em" />
        </Space>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <Text strong>不同颜色：</Text>
        <Space wrap style={{ marginTop: '10px' }}>
          <SLucideIcon name="Home" color="red" />
          <SLucideIcon name="Home" color="blue" />
          <SLucideIcon name="Home" color="green" />
          <SLucideIcon name="Home" color="#ff9800" />
          <SLucideIcon name="Home" color="#9c27b0" />
        </Space>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <Text strong>不同线条粗细：</Text>
        <Space wrap style={{ marginTop: '10px' }}>
          <SLucideIcon name="Home" strokeWidth={1} />
          <SLucideIcon name="Home" strokeWidth={2} />
          <SLucideIcon name="Home" strokeWidth={3} />
          <SLucideIcon name="Home" strokeWidth={4} />
        </Space>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <Text strong>与 Antd 组件结合使用：</Text>
        <Space wrap style={{ marginTop: '10px' }}>
          <Button icon={<SLucideIcon name="Plus" />} type="primary">
            新增
          </Button>
          <Button icon={<SLucideIcon name="Edit" />}>编辑</Button>
          <Button icon={<SLucideIcon name="Delete" />} danger>
            删除
          </Button>
          <Button icon={<SLucideIcon name="Search" />} type="dashed">
            搜索
          </Button>
        </Space>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <Text strong>自定义样式：</Text>
        <Space wrap style={{ marginTop: '10px' }}>
          <SLucideIcon name="Home" style={{ transform: 'rotate(45deg)' }} />
          <SLucideIcon
            name="Home"
            style={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)' }}
          />
          <SLucideIcon
            name="Home"
            style={{
              border: '2px solid red',
              borderRadius: '4px',
              padding: '4px',
            }}
          />
        </Space>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <Text strong>更多图标示例：</Text>
        <Space wrap style={{ marginTop: '10px' }}>
          {iconNames.slice(6).map((name) => (
            <SLucideIcon key={name} name={name} size={24} />
          ))}
        </Space>
      </div>
    </div>
  );
};

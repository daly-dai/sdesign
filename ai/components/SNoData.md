# SNoData — 无数据占位

## 使用边界

**适用场景:**

- 数据为空时的友好占位提示
- 列表、表格、卡片等容器内无数据时展示
  **不适用:**
- STable 已内置空状态，无需额外使用
- 页面级 404，应使用 SNoPage

## 类型定义

**NotDataProps**

- text?: ReactNode
- type?: sizeType
- className?: string
- componentName?: string
- imgProps?: React.DetailedHTMLProps< React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement >

**sizeType**: `'small' | 'middle' | 'large'`

**NoDataTypes**: `NotDataProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>`

## 使用示例

```tsx
import { Card, Flex, Typography } from 'antd';
import React from 'react';

import { SNoData } from '@dalydb/sdesign';

const { Text } = Typography;

export default () => {
  return (
    <div>
      <Flex vertical gap={24}>
        <Card title="不同尺寸">
          <Flex gap={16} align="flex-start">
            <div style={{ textAlign: 'center' }}>
              <Text type="secondary">small</Text>
              <SNoData type="small" />
            </div>
            <div style={{ textAlign: 'center' }}>
              <Text type="secondary">middle（默认）</Text>
              <SNoData type="middle" />
            </div>
            <div style={{ textAlign: 'center' }}>
              <Text type="secondary">large</Text>
              <SNoData type="large" />
            </div>
          </Flex>
        </Card>

        <Card title="自定义文案">
          <SNoData text="暂无订单记录" />
        </Card>

        <Card title="默认文案">
          <SNoData />
        </Card>
      </Flex>
    </div>
  );
};
```

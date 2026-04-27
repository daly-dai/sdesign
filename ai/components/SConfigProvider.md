# SConfigProvider — 全局配置（字典、上传地址），STable/SDetail 自动读取

## 使用边界

**适用场景:**

- 应用根组件，为 STable/SDetail 提供全局字典和上传地址
- 多个页面共享同一套字典数据
  **不适用:**
- 不使用 dictKey 功能的项目
- 字典数据仅某个页面使用，直接在组件内传 dictMap

## 类型定义

**ConfigContextProps**

- globalDict?: Record<string, Record<string, any> | any>
- uploadUrl?: string
- getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string

**SConfigProviderType** — SConfigProvider 全局配置 Props 为 STable、SDetail 等组件提供全局字典和上传地址配置。 `tsx <SConfigProvider globalDict={{ userStatus: { 1: '启用', 2: '禁用' } }} uploadUrl="/api/upload" > <App /> </SConfigProvider> `

- globalDict?: Record<string, any> — 全局字典数据，STable dictKey / SDetail dictKey 自动读取
- uploadUrl?: string — 文件上传接口地址
- children?: ReactNode
- prefixCls?: string — 样式前缀

## 使用示例

```tsx
import { Card, Flex, Typography } from 'antd';
import React from 'react';

import {
  SCheckGroup,
  SConfigProvider,
  SRadioGroup,
  SSelect,
} from '@dalydb/sdesign';

const { Text } = Typography;

const globalDict = {
  userStatus: { 1: '启用', 2: '禁用' },
  userRole: { admin: '管理员', user: '普通用户', guest: '访客' },
};

export default () => {
  return (
    <div>
      <Flex vertical gap={24}>
        <Card title="全局字典配置">
          <SConfigProvider globalDict={globalDict}>
            <Flex vertical gap={16}>
              <div>
                <Text strong>Select 字典下拉：</Text>
                <SSelect
                  style={{ width: 200 }}
                  placeholder="选择角色"
                  dictKey="userRole"
                />
              </div>
              <div>
                <Text strong>RadioGroup 字典单选：</Text>
                <SRadioGroup dictKey="userRole" />
              </div>
              <div>
                <Text strong>CheckGroup 字典多选：</Text>
                <SCheckGroup dictKey="userRole" />
              </div>
            </Flex>
          </SConfigProvider>
        </Card>
      </Flex>
    </div>
  );
};
```

# @dalydb/sdesign

基于 Ant Design 二次封装的企业级 React 组件库，专注于提升管理后台开发效率。

[![NPM Version](https://img.shields.io/npm/v/@dalydb/sdesign)](https://www.npmjs.com/package/@dalydb/sdesign)
[![NPM Downloads](https://img.shields.io/npm/dm/@dalydb/sdesign)](https://www.npmjs.com/package/@dalydb/sdesign)
[![License](https://img.shields.io/npm/l/@dalydb/sdesign)](https://github.com/your-repo/sdesign/blob/main/LICENSE)

## ✨ 特性

- 🎨 **丰富组件** - 50+ 企业级组件，覆盖常见业务场景
- ⚡ **开箱即用** - 基于 Ant Design 5.x，无缝集成
- 🛠️ **强大工具** - 完善的 Hooks 和工具函数库
- 📦 **按需加载** - 支持 tree-shaking，减少打包体积
- 🌍 **TypeScript** - 完整的类型定义支持
- 🎯 **易于定制** - 灵活的主题配置和样式扩展

## 🚀 快速开始

### 安装

```bash
# 使用 pnpm（推荐）
pnpm add @dalydb/sdesign

# 使用 npm
npm install @dalydb/sdesign

# 使用 yarn
yarn add @dalydb/sdesign
```

### 基础使用

```tsx
import React from 'react';
import { SButton, SForm, STable } from '@dalydb/sdesign';

// 全局配置（可选）
import { SConfigProvider } from '@dalydb/sdesign';

const App = () => {
  return (
    <SConfigProvider globalDict={{}} uploadUrl="">
      <div>
        <SButton type="primary">开始使用</SButton>
      </div>
    </SConfigProvider>
  );
};

export default App;
```

### 完整示例

```tsx
import React from 'react';
import { SForm, STable, useSearchTable } from '@dalydb/sdesign';
import { Space } from 'antd';

const UserList = () => {
  // 使用搜索表格 Hook
  const { tableProps, form, formConfig } = useSearchTable(
    async (params) => {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(params),
      });
      return response.json();
    },
    {
      paginationFields: {
        current: 'page',
        pageSize: 'pageSize',
        total: 'total',
        list: 'data',
      },
    },
  );

  // 表单配置
  const formItems = [
    {
      label: '用户名',
      name: 'username',
      type: 'input',
    },
    {
      label: '状态',
      name: 'status',
      type: 'select',
      fieldProps: {
        options: [
          { value: 1, label: '启用' },
          { value: 0, label: '禁用' },
        ],
      },
    },
  ];

  // 表格列配置
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (value) => (value === 1 ? '启用' : '禁用'),
    },
  ];

  return (
    <div>
      <SForm.Search form={form} items={formItems} {...formConfig} />

      <STable {...tableProps} columns={columns} rowKey="id" />
    </div>
  );
};

export default UserList;
```

## 📦 核心功能

### 组件体系

- **基础组件** - Button、Form、Table、Select 等常用组件
- **业务组件** - SearchTable、Detail、FileUpload 等业务场景组件
- **布局组件** - Card、Title、Container 等布局相关组件

### Hooks 工具

- **数据处理** - useSearchTable 等数据处理 Hooks
- **表单增强** - useFormPerformance、useDispatchDict 等表单相关 Hooks
- **UI 交互** - useExpand、useFrameAnimation 等交互增强 Hooks

### 工具函数

- **数据处理** - 树形结构、字典数据处理
- **验证工具** - 表单验证、数据校验
- **样式工具** - CSS-in-JS、主题配置

## 📚 文档资源

- [📘 完整文档](https://your-docs-url.com)
- [🚀 快速开始](https://your-docs-url.com/guide)
- [🔧 组件列表](https://your-docs-url.com/components)
- [🛠️ Hooks 指南](https://your-docs-url.com/hooks)
- [📦 更新日志](https://your-docs-url.com/changelog)

## 🔧 技术栈

- React 18+
- TypeScript 5+
- Ant Design 5.x
- ahooks 3.x
- dumi 2.x（文档工具）
- father 4.x（构建工具）

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助我们改进组件库！

```bash
# 克隆项目
git clone https://github.com/your-repo/sdesign.git

# 安装依赖
pnpm install

# 启动开发环境
pnpm dev

# 构建项目
pnpm build

# 构建文档
pnpm docs:build
```

## 📄 License

MIT © dalydb

## Development

```bash
# install dependencies
$ pnpm install

# develop library by docs demo
$ npm run dev

# build library source code
$ npm run build

# build library source code in watch mode
$ npm run build:watch

# build docs
$ npm run docs:build

# check your project for potential problems
$ npm run doctor
```

## css in js 方案

```bash
# 基于 antd-style进行css in js 改造
$ pnpm install antd-style
```

## LICENSE

MIT

## 分支说明

| 分支名      | 描述     |
| ----------- | -------- |
| master      | 无用分支 |
| prod        | 正式分支 |
| dev         | 开发分支 |
| feature\_\* | 功能分支 |

## 重复代码检查

```bash
npm install -g jscpd

jscpd ./src -o 'report'
```

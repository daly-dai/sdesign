---
toc: content
---

# 快速上手

## 介绍

S 项目对常用的基础组件进行业务封装，满足特定功能与样式的需求

## 基于

`antd` `umi` `axios` `ahooks` 等进行封装

## 项目引入

### 换源

在.npmrc 中新增以下内容

```
; @szhz 域地址和登陆 token
@szhz:registry=https://packages.aliyun.com/630cb049f9861067e4e7fefb/npm/npm-registry/
//packages.aliyun.com/630cb049f9861067e4e7fefb/npm/npm-registry/:_authToken=1000d71e-1e41-4b41-af8c-cb572a1a108e
```

2. 安装

```
npm install @dalydb/sdesign
// 或
pnpm  install @dalydb/sdesign
```

3. 使用
   `import { STitle } from '@dalydb/sdesign';'`

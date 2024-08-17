---
toc: content
title: SConfirm 确认
group:
  title: 基础组件
  order: 2
---

# SConfirm 确认

## 介绍

## 统一二次确认按钮

### 基于`Popconfirm`与`Modal`进行封装，可自定义内容

<code src="./demos/index.tsx"></code>

<code src="./demos/customText.tsx"></code>

<code src="./demos/modalConfirm.tsx"></code>

<code src="./demos/customChildren.tsx" ></code>

## API

| 属性名          | 描述                                      | 类型                                                               | 默认值               |
| --------------- | ----------------------------------------- | ------------------------------------------------------------------ | -------------------- |
| text            | 按钮文案                                  | string                                                             | 删除                 |
| confirm         | 确认方法                                  | () =>void                                                          | null                 |
| type            | 提示类型                                  | pop modal                                                          | pop                  |
| cancel          | 取消方法                                  | () =>void                                                          | null                 |
| disable         | 禁用                                      | boolean                                                            | false                |
| children        | 中心区内容                                | ReactNode                                                          | null                 |
| title           | 提示标题                                  | ReactNode                                                          | 删除提示             |
| description     | 提示信息                                  | ReactNode                                                          | 是否确认删除该条信息 |
| popConfirmProps | antd popConfirm 相关属性                  | [PopconfirmProps](https://ant.design/components/popconfirm-cn#api) | {}                   |
| buttonProps     | antd Button 相关 (不传 children 内容生效) | [ButtonProps](https://ant.design/components/popconfirm-cn#api)     | {}                   |

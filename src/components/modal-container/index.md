---
toc: content
title: createModal 弹窗容器
group:
  title: 基础组件
  order: 2
---

# createModal 弹窗容器

## 介绍

通过工厂函数 `createModal` 创建自动管理生命周期的 Modal 容器组件（`SModalContainer` 为别名）。

### 核心特性

- **自动状态管理**：通过 ref 暴露 `open(params)` / `close()` 方法，无需手动维护 visible 状态
- **自动卸载**：弹窗关闭时内部组件完全卸载，所有 useState / useForm 等自动销毁，无需手动重置
- **泛型参数**：通过泛型 P 约束 open() 的参数结构，Content 通过 `params` 接收，类型安全
- **关闭前拦截**：通过 `beforeClose` 守卫，支持表单脏检查、未保存提示等场景
- **动画保留**：通过 `destroyAfterClose` 等待退出动画结束后再卸载内容

<code src="./demos/base.tsx"></code>

<code src="./demos/with-form.tsx"></code>

<code src="./demos/before-close.tsx"></code>

## 基本用法

<code src="./demos/basic.tsx"></code>

## API

### createModal

| 参数    | 描述         | 类型                                | 默认值 |
| ------- | ------------ | ----------------------------------- | ------ |
| Content | 弹窗内容组件 | `ComponentType<ModalChildProps<P>>` | -      |
| options | 配置项       | `CreateModalOptions`                | `{}`   |

### CreateModalOptions

| 属性              | 描述                                 | 类型                                | 默认值  |
| ----------------- | ------------------------------------ | ----------------------------------- | ------- |
| beforeClose       | 关闭前守卫，返回 false 阻止关闭      | `() => boolean \| Promise<boolean>` | -       |
| destroyAfterClose | 关闭后延迟卸载，等待动画结束后再销毁 | `boolean`                           | `false` |

### ModalContainerRef

| 方法  | 描述                             | 类型                  |
| ----- | -------------------------------- | --------------------- |
| open  | 打开弹窗并传参                   | `(params: P) => void` |
| close | 手动关闭弹窗（触发 beforeClose） | `() => void`          |

### ModalChildProps

| 属性       | 描述                                       | 类型         | 默认值 |
| ---------- | ------------------------------------------ | ------------ | ------ |
| params     | open() 传入的参数                          | `P`          | -      |
| open       | 弹窗是否可见（绑定到 antd Modal 的 open）  | `boolean`    | -      |
| onClose    | 关闭弹窗（触发 beforeClose 守卫）          | `() => void` | -      |
| onSuccess  | 操作成功后关闭弹窗并触发回调               | `() => void` | -      |
| afterClose | 动画结束回调（destroyAfterClose 模式使用） | `() => void` | -      |

### Wrapper Props

| 属性      | 描述                         | 类型         | 默认值 |
| --------- | ---------------------------- | ------------ | ------ |
| onSuccess | 操作成功后的回调             | `() => void` | -      |
| onClose   | 弹窗关闭后的回调（无论原因） | `() => void` | -      |

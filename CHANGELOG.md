# 更新日志

所有项目的显著变更都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [未发布]

## [1.3.0] - 2025-03-02

### ✨ 新功能

- **Detail 组件重构与优化**

  - 优化组件性能，使用 `useId` 替代随机 key 生成
  - 简化 hook 实现，移除未使用的 `containerWidth` 逻辑
  - 提取渲染器到模块级别，避免重复创建
  - 完善 TypeScript 类型定义
  - 新增完整技术文档

- **Form 组件增强**

  - 扩展表单组件支持 Ant Design Form 方法和组件
  - 优化表单性能并添加性能监控
  - 丰富示例文档

- **SearchTable 组件改进**
  - 添加删除数据后自动刷新功能
  - 支持外部表单集成
  - 增加自动初始化数据请求
  - 优化错误处理及参数校验

### 🐛 修复

- 修复 Detail 组件 Group 中的 `Array(items)` 类型检查问题
- 修复类型定义中的可选属性问题

### 🔧 优化

- **性能优化**

  - Button 组件性能及紧凑模式支持优化
  - Input 组件状态管理优化，使用 `useCallback` 提升性能
  - Form 组件性能优化

- **代码质量**
  - 移除未使用的上传组件及相关代码
  - 统一标题描述属性名为 `desc`
  - 优化类型定义和代码结构

### 📚 文档

- 新增 Detail 组件完整技术文档
- 更新 Form 组件示例文档
- 完善组件库整体文档体系

### 🏗️ 构建

- 添加 AI 生成文档脚本 `gen-llms-txt.ts`
- 升级依赖版本（axios、jsdom 等）
- 更新 peerDependencies 版本范围

## [1.2.1] - 2024-XX-XX

### 🔧 变更

- 更新 peerDependencies 版本范围
- 优化依赖兼容性

## [1.2.0] - 2024-XX-XX

### ⚠️ 破坏性变更

- **移除上传组件** - 上传功能已移除，建议使用 Ant Design Upload 或其他专用上传组件

### ✨ 新功能

- useSearchTable Hook 优化，增加错误处理及参数校验
- SearchTable 组件增加文档示例

## [1.1.6] - 2024-XX-XX

### 🔧 变更

- 组件性能优化
- 代码结构调整

---

## 版本说明

### 版本号格式

版本号遵循语义化版本规范：

- **主版本号（MAJOR）**：不兼容的 API 修改
- **次版本号（MINOR）**：向下兼容的功能性新增
- **修订号（PATCH）**：向下兼容的问题修正

### 更新类型标签

- ✨ `feat` - 新功能
- 🐛 `fix` - 修复
- 🔧 `chore` - 构建/工具
- 📚 `docs` - 文档
- ⚡ `perf` - 性能优化
- ⚠️ `BREAKING` - 破坏性变更
- 🗑️ `deprecated` - 废弃功能

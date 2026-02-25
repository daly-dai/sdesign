# 版本更新记录

## 1.2.0 (2026-02-25)

### 🌟 新特性

- `feat(hooks)`: 优化 useSearchTable 增加错误处理及参数校验
- `feat(search-table)`: 增加文档示例及自动初始化数据请求
- `refactor(hooks)`: 重构 useSearchTable Hook，简化 API 并增强功能
- `feat(search-table)`: 为 search-table 组件新增多个使用示例
  - 新增自定义分页字段示例
  - 新增手动触发搜索示例
  - 新增参数转换示例
  - 新增行选择功能示例
  - 新增展开行功能示例

### 🔧 优化

- `refactor(detail)`: 统一标题描述属性名为 desc
- `refactor(form)`: 删除不再使用的上传组件配置，优化类型定义和性能
- `perf(hooks)`: 优化 useSearchTable 性能，使用 useMemo 和 useCallback 提升性能
- `chore`: 更新版本号至 1.2.0
- `refactor(hooks)`: useSearchTable 添加分页字段映射及参数转换支持
- `refactor(hooks)`: useSearchTable 支持极简 API，返回 formConfig 对象
- `refactor(hooks)`: useSearchTable 支持自动 form 实例管理
- `refactor(search-table)`: 优化组件结构和 API 设计
- `refactor(hooks)`: useSearchTable 现在默认自动请求数据

### 🐛 修复

- `fix(hooks)`: 修复 useSearchTable 初始化请求逻辑，确保组件挂载后自动加载数据
- `fix(search-table)`: 修复示例中缺少数据的问题
- `fix(hooks)`: 修复 useSearchTable 分页参数验证问题
- `fix(hooks)`: 修复 useSearchTable 类型定义问题

### 📚 文档

- `docs(search-table)`: 新增自定义分页字段、手动触发搜索、参数转换、行选择功能、展开行功能等多个示例
- `docs(hooks)`: 更新 useSearchTable 文档，添加错误处理说明
- `docs`: 更新版本更新记录文档至 1.2.0 版本

### 🗑️ 移除

- `refactor(upload)`: 移除上传组件及其相关代码和示例

## 1.1.6 (2026-02-01)

### 🌟 新特性

### 🔧 优化

- `refactor(button)`: 优化按钮组件性能及紧凑模式支持
  - 重命名组件为 SButton，提高代码可读性
  - 使用 useMemo 缓存计算结果，优化性能
  - 精确的依赖项数组，减少不必要的重新渲染
  - 使用 import type 语法，减少运行时依赖
  - 优化 JSX 格式，提高代码可读性
- `perf(form)`: 优化表单组件性能并添加性能监控
- `refactor(Input组件)`: 优化状态管理并使用 useCallback 提升性能
- `chore`: 升级 axios 和 jsdom 依赖版本

### 🐛 修复

### 📚 文档

### 🗑️ 移除

- `refactor(upload)`: 移除上传组件及其相关代码和示例

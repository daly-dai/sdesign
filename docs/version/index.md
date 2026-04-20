# 版本更新记录

## [1.5.0] - 2026-04-20

### ✨ 新功能

- **SForm.Search 搜索表单重构**（⚠️ Breaking Change）

  - `isCard` 默认值由 `false` 改为 `true`，搜索表单默认包裹在卡片中
  - 新增 `labelWidth` 属性，支持统一 label 宽度解决控件错位问题
  - 新增 `actionStyleRender` 属性，支持自定义操作区域样式
  - 新增 `extraButtons` 属性，支持在查询/重置旁添加额外操作按钮
  - 新增 `gap` 属性，支持灵活设置行列间距
  - 优化非卡片模式下的底部间距处理
  - 使用 CSS Grid 替代 Row/Col 栅格布局，提升渲染性能
  - `SFormItems` 新增 `gridColumn` 属性，支持单行跨列布局

- **SSearchTable 组件增强**

  - 新增 `tableCardProps` 属性，透传给表格区域的 SCard
  - 新增 `SSearchTableRef.submit()` 方法，支持外部触发表单提交
  - 重命名 `SearchTableRef` → `SSearchTableRef`，旧名保留为别名（@deprecated）
  - 分页配置优化：默认显示总条数、移除 `hideOnSinglePage`
  - 合并分页属性到 STable，支持外部覆盖分页配置

- **useSearchTable Hook 优化**

  - 默认分页字段映射调整：`pageNum` → `pageIndex`，`totalSize` → `total`，`dataList` → `list`
  - 返回值新增 `pagination`，方便外部独立使用分页配置
  - 返回值透传 ahooks `useRequest` 其余属性

- **SButton 样式优化**

  - 优化 link 样式按钮的 padding/height/border 表现

### 🐛 修复

- 修复搜索表单和搜索表格样式及结构问题
- 修复分页显示与样式问题

## [1.3.1] - 2025-03-02

### 🔧 优化

- **性能优化**

  - 优化 ai 生成知识库相关逻辑

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

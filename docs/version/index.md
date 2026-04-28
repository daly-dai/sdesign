# 版本更新记录

## [1.8.1] - 2026-04-28

### 🔧 优化

- **demo 类型安全改造**

  - 消除 25 个 demo 文件中的 49 处 `any` 类型，防止 AI 文档生成管道（`gen-llms-txt.ts` → `ai/components/*.md`）将 `any` 模式传播到下游 AI 生成的代码中
  - 表格/搜索表格 demo 使用局部实体接口替代 `SColumnsType<any>`
  - 表单/详情/dependency demo 使用 `Record<string, unknown>` 或具体类型替代 `(v: any)`
  - mock request 函数使用 `Record<string, string | number | undefined>` + `Number()` 替代 `(params: any)`
  - 未使用回调参数遵循 `_` 前缀约定，不添加类型标注
  - 涉及文件：SearchTable (9)、Form (9)、Table (4)、Detail (1)、Dependency (1)、CheckGroup (1) 等组件 demo

## [1.8.0] - 2026-04-27

### ✨ 新功能

- **全组件 basic demo 体系**

  - 为 27 个组件统一新增 `demos/basic.tsx` 标准化示例文件
  - CRUD 核心组件（SForm、SSearchTable、STable、SDetail、SModalContainer、SDrawerContainer）示例较详细，覆盖常见用法
  - 辅助组件（SInput、SCard、SLucideIcon、STextEllipsis 等）示例精简，降低弱模型 token 消耗
  - basic demo 同时服务于 dumi 文档展示和 AI 知识库代码示例

- **SCollapse 组件导出**

  - SCollapse 正式从 `@dalydb/sdesign` 导出

- **STable 列定义增强**

  - `SColumn` 从 type alias 重构为 interface extends，提升类型推断能力
  - 新增 `children` 属性支持列分组（嵌套表头）
  - 移除未使用的 `DataType` 接口

### 🔧 优化

- **AI 文档生成（gen-llms-txt.ts）**

  - 新增自动读取 `demos/basic.tsx` 嵌入 AI 文档的 `## 使用示例` 段落
  - 新增 `ColumnType` antd 类型映射

- **SCard 默认值调整**

  - `hasBottomPadding` 默认值从 `true` 改为 `false`

- **类型注释修正**

  - SSearchTable `requestFn` 注释补充完整的 `paginationFields` 配置说明和示例
  - useSearchTable `PaginationFields` 默认值注释对齐 v1.5.0 实际值（`total`、`list`）

### 📚 文档

- 所有组件 `index.md` 中 `## 基本用法` 示例统一调整到 API 文档之前
- 26 个 AI 组件文档更新，使用示例与 basic demo 同步

## [1.7.0] - 2026-04-26

### ✨ 新功能

- **SForm type 字段命名统一**（⚠️ Breaking Change）

  - `datePicker` 现在渲染增强版 SDatePicker（原为 antd DatePicker），onChange 直接返回字符串
  - `datePickerRange` 现在渲染增强版 SDatePickerRange（原为 antd RangePicker），支持 rangeKeys 拆分
  - `cascader` 现在渲染增强版 SCascader（原为 antd Cascader），value 自动归一化为字符串
  - `SDatePicker`、`SDatePickerRange`、`SCascader` 保留为已废弃别名，功能不变
  - 统一后所有 camelCase 类型名均指向增强版组件，与 `input`→SInput、`select`→SSelect 等保持一致
  - `datePicker`/`datePickerRange` 默认 placeholder 从空改为"请选择"

## [1.6.1] - 2026-04-26

### 🔧 优化

- **组件类型定义统一**

  - 6 个组件的主 Props 从 `type` alias 统一为 `interface extends`，提升类型一致性和 IDE 支持
  - 涉及组件：SSelect、SCascader、SDatePicker、SDatePickerRange、SCheckGroup、SRadioGroup
  - `SDatePickerType` 重命名为 `SDatePickerProps`（旧名保留为 @deprecated 别名）
  - SSelect、SCheckGroup、SRadioGroup 的 `ExtraComType` 属性内联到接口中，类型定义自包含

- **AI 文档生成增强（gen-llms-txt.ts）**

  - 新增 antd 继承关系段落，明确显示组件继承自哪个 antd 组件
  - 对 Omit 覆盖的属性在文档中标注（如"覆盖: onChange, value"）
  - 支持间接类型追溯（如 `SelectType → ComponentProps<typeof Select> → antd Select`）
  - 修复多行 type alias 解析截断问题（续行运算符 `&`、`|` 不再错误终止）

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

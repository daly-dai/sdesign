# @dalydb/sdesign v1.3.7

基于 Ant Design 5.x 的企业级 React 组件库。所有组件以 S 前缀命名。

## 渐进式读取指南

本文件是组件索引，包含每个组件的用途和使用边界。
每个组件的完整类型定义和使用示例在独立文件中：

- 需要某个组件的详细 API 时，读取 `ai/components/{ComponentName}.md`
- 不要一次性读取所有组件文件，按当前场景按需读取
- 使用边界中的"不适用"描述了该组件不应使用的场景，请严格遵守

## 导入

```ts
import { SForm, STable, SSearchTable, SButton, SDetail } from '@dalydb/sdesign';
import type { SFormItems, SColumnsType, SDetailItem } from '@dalydb/sdesign';
import { useSearchTable } from '@dalydb/sdesign/hooks';
```

## 组件速查表

### SButton [.Group] — 增强按钮，支持 actionType 预设操作类型和按钮组

> 详细 API: ai/components/SButton.md

- **适用场景**: 页面中需要操作按钮（新增、编辑、删除、导出等）; 需要 actionType 预设按钮文字和样式; 需要按钮组（SButton.Group）批量配置按钮
- **不适用**: 导航链接跳转，应使用 react-router Link; 图标按钮无文字无操作语义，直接用 antd Button + icon
- **优先使用**: SButton.Group → 多个操作按钮并排时，不要手动排列多个 SButton

### SCard — 卡片容器，内置错误边界

> 详细 API: ai/components/SCard.md

- **适用场景**: 需要卡片容器包裹内容区域; 需要内置错误边界，内容出错时不影响整体页面
- **不适用**: 不需要错误边界的简单容器，直接用 div 或 antd Card; 列表项卡片（循环渲染大量卡片），性能敏感场景直接用 antd Card

### SCascader — 增强级联选择器

> 详细 API: ai/components/SCascader.md

- **适用场景**: 层级数据选择（如省市区、组织架构）; onChange 需要直接返回字符串值而非数组
- **不适用**: 扁平选项列表（无层级关系），应使用 SSelect; 需要多选级联，当前仅支持单选

### SCheckGroup — 复选框组

> 详细 API: ai/components/SCheckGroup.md

- **适用场景**: 多项选择场景; 选项较少（<= 7 个）且需要全部可见
- **不适用**: 单选场景，应使用 SRadioGroup; 选项很多（> 7 个），应使用 SSelect mode='multiple'

### SCollapse — 折叠面板

> 详细 API: ai/components/SCollapse.md

- **适用场景**: 需要折叠/展开内容区域; 外部控制折叠状态
- **不适用**: 多个折叠面板组（手风琴模式），直接用 antd Collapse; 简单的显示/隐藏切换，用条件渲染即可

### SConfigProvider — 全局配置（字典、上传地址），STable/SDetail 自动读取

> 详细 API: ai/components/SConfigProvider.md

- **适用场景**: 应用根组件，为 STable/SDetail 提供全局字典和上传地址; 多个页面共享同一套字典数据
- **不适用**: 不使用 dictKey 功能的项目; 字典数据仅某个页面使用，直接在组件内传 dictMap

### SConfirm — 确认组件，支持 Popconfirm 和 Modal 两种模式

> 详细 API: ai/components/SConfirm.md

- **适用场景**: 操作前需要二次确认（删除、提交等危险操作）; 需要 Popconfirm 气泡确认或 Modal 对话框确认
- **不适用**: 不需要确认的普通操作，直接用 SButton onClick; 需要复杂表单输入的确认弹窗，使用 antd Modal + SForm

### SDatePicker — 增强日期选择器，onChange 直接返回字符串

> 详细 API: ai/components/SDatePicker.md

- **适用场景**: 日期选择，onChange 需要直接返回格式化字符串而非 Dayjs 对象; 表单中的日期字段，简化值处理
- **不适用**: 需要日期范围选择，应使用 SDatePickerRange; 需要 Dayjs 对象做复杂日期计算，直接用 antd DatePicker

### SDatePickerRange — 日期范围选择器，支持 rangeKeys 拆分字段

> 详细 API: ai/components/SDatePickerRange.md

- **适用场景**: 日期范围选择，需要 rangeKeys 将范围拆分为两个独立字段提交; onChange 需要直接返回格式化字符串
- **不适用**: 单日期选择，应使用 SDatePicker; 不需要拆分字段，直接用 antd RangePicker

### SDependency — 字段依赖联动组件

> 详细 API: ai/components/SDependency.md

- **适用场景**: SForm 内表单字段依赖联动; 某个字段的显示/值/选项依赖其他字段的变化
- **不适用**: 独立使用，必须在 SForm 的 items 中通过 type: 'dependency' 使用; 简单的字段监听，使用 SForm.useWatch 即可

### SDetail [.Group, .Item] — 详情展示，支持 8 种渲染类型（text/dict/file/img 等）

> 详细 API: ai/components/SDetail.md

- **适用场景**: 详情页展示键值对数据; 需要 8 种渲染类型自动格式化（text/dict/file/img/rangeTime/checkbox 等）; 需要字典映射（dictKey 配合 SConfigProvider）
- **不适用**: 数据是列表形式（多行同结构），应使用 STable; 需要编辑数据，应使用 SForm; 自定义卡片式布局展示，直接用 antd 原生组件
- **优先使用**: SDetail.Group → 详情需要分组展示时，不要手动拼多个 SDetail

### SDynamicContainer — 动态容器

> 详细 API: ai/components/SDynamicContainer.md

- **适用场景**: 需要动态调整容器尺寸或布局
- **不适用**: 静态布局容器，直接用 div 或 antd Layout

### SErrorBoundary — 错误边界

> 详细 API: ai/components/SErrorBoundary.md

- **适用场景**: React 组件树需要捕获渲染异常，防止整页白屏; 需要自定义错误降级 UI（fallbackRender）
- **不适用**: 已使用 SCard（内置错误边界），无需再套一层; 异步错误处理（API 请求失败），用 try-catch 或 useRequest onError
- **优先使用**: SCard → 卡片区域的错误隔离，SCard 已内置错误边界

### SErrorCom — 错误展示

> 详细 API: ai/components/SErrorCom.md

- **适用场景**: 展示错误状态提示 UI（配合错误边界使用）
- **不适用**: 表单校验错误提示，使用 SForm 内置校验; API 请求错误提示，使用 message.error

### SFile [.List] — 文件上传/列表

> 详细 API: ai/components/SFile.md

- **适用场景**: 文件上传功能; 文件列表展示（支持下载、预览）
- **不适用**: 图片上传预览，考虑使用 antd Upload + listType='picture-card'; SDetail 中展示文件列表，直接用 SDetailItem type='file'

### SForm [.Search, .Group, .Item, .FormItem] [.useForm, .useWatch, .useFormInstance, .ErrorList, .List] — 配置化表单，items 数组声明 22 种控件、联动、分组、搜索

> 详细 API: ai/components/SForm.md

- **适用场景**: 需要配置化表单，通过 items 数组声明表单控件; 表单字段 >= 3 个，需要统一布局和校验; 需要表单联动（dependency）、分组（Group）、搜索（Search）等能力
- **不适用**: 登录、注册等极简表单（1-2 个字段 + 提交按钮），直接用 antd Form; 纯展示场景，应使用 SDetail; 需要完全自定义布局，items 配置无法表达的复杂交互
- **优先使用**: SSearchTable → 列表页搜索 + 表格一体化场景，不要单独组合 SForm.Search + STable; SForm.Group → 表单需要分组展示时，不要手动拼多个 SForm

### SFrameAnimation — 帧动画

> 详细 API: ai/components/SFrameAnimation.md

- **适用场景**: 精灵图帧动画（Loading 动效、交互动画）
- **不适用**: 简单 Loading 状态，使用 antd Spin; CSS 动画可实现的效果，不需要帧动画组件

### SInput — 增强输入框，支持 trim、onEnter

> 详细 API: ai/components/SInput.md

- **适用场景**: 文本输入，需要自动 trim 去除首尾空格; 需要 onEnter 回车触发回调; onChange 需要直接返回 string 值而非 event
- **不适用**: 多行文本输入，使用 antd Input.TextArea; 密码输入，使用 antd Input.Password; SForm items 中使用时通过 type: 'input' 引用，无需直接使用 SInput

### SLucideIcon — Lucide 图标

> 详细 API: ai/components/SLucideIcon.md

- **适用场景**: 需要 Lucide 风格图标
- **不适用**: 项目已使用 @ant-design/icons 体系，保持一致性优先用 antd 图标; 仅需少量图标，评估是否值得引入 lucide-react 依赖

### SNoData — 无数据占位

> 详细 API: ai/components/SNoData.md

- **适用场景**: 数据为空时的友好占位提示; 列表、表格、卡片等容器内无数据时展示
- **不适用**: STable 已内置空状态，无需额外使用; 页面级 404，应使用 SNoPage

### SNoPage — 无页面占位

> 详细 API: ai/components/SNoPage.md

- **适用场景**: 页面不存在（404）或无权限时的占位展示
- **不适用**: 数据为空（有页面但无数据），应使用 SNoData; 接口错误展示，应使用 SErrorCom

### SRadioGroup — 单选框组

> 详细 API: ai/components/SRadioGroup.md

- **适用场景**: 单选场景，选项较少（<= 5 个）且需要全部可见; 按钮式单选或标准单选
- **不适用**: 多选场景，应使用 SCheckGroup; 选项很多（> 5 个），应使用 SSelect; SForm items 中使用时通过 type: 'radioGroup' 引用，无需直接使用

### SSearchTable — SForm.Search + STable 一体化，列表页首选

> 详细 API: ai/components/SSearchTable.md

- **适用场景**: 管理后台标准列表页（搜索条件 + 数据表格 + 分页）; 搜索、分页、数据加载需要自动联动的场景
- **不适用**: 纯展示表格，无搜索条件，直接用 STable; 需要完全自定义搜索区域布局（非表单式搜索）; 表格数据不来自接口请求（如本地静态数据）
- **优先使用**: STable + SForm.Search + useSearchTable → 需要更精细控制搜索和表格的布局、交互时

### SSelect — 增强选择器

> 详细 API: ai/components/SSelect.md

- **适用场景**: 下拉选择，选项较多不适合全部展示; 需要搜索、远程加载选项
- **不适用**: 选项 <= 5 个且需全部可见，使用 SRadioGroup（单选）或 SCheckGroup（多选）; 层级选项，应使用 SCascader; SForm items 中使用时通过 type: 'select' 引用，无需直接使用 SSelect

### STable — 增强表格，支持 dictKey 字典映射、render 快捷类型、序号列

> 详细 API: ai/components/STable.md

- **适用场景**: 需要展示列表数据的表格; 需要 dictKey 字典映射自动转换列值; 需要 render 快捷类型（datetime/date/ellipsis）; 需要自动序号列（isSeq）
- **不适用**: 列表页同时需要搜索条件 + 表格 + 分页联动，应使用 SSearchTable; 纯键值对展示（非列表），应使用 SDetail
- **优先使用**: SSearchTable → 搜索 + 表格 + 分页一体化场景

### STextEllipsis — 文本省略

> 详细 API: ai/components/STextEllipsis.md

- **适用场景**: 长文本需要省略显示并支持展开/收起或 Tooltip 提示
- **不适用**: STable 列已支持 ellipsis 和 maxChars，表格内无需额外使用; 单行文本省略，CSS text-overflow: ellipsis 即可

### STitle — 标题组件（page/table/form 三种类型）

> 详细 API: ai/components/STitle.md

- **适用场景**: 页面级标题（带返回按钮、操作区）; 表格区域标题; 表单区域标题
- **不适用**: 纯文本标题无操作区，直接用 h1/h2 标签; 面包屑导航，使用 antd Breadcrumb

## Hook 列表

- **useComStyle** (详细 API: ai/components/useComStyle.md)
- **useDispatchDict** (详细 API: ai/components/useDispatchDict.md)
- **useExpand** (详细 API: ai/components/useExpand.md)
- **useFrameAnimation** (详细 API: ai/components/useFrameAnimation.md)
- **useGetDictData** (详细 API: ai/components/useGetDictData.md)
- **useScale** (详细 API: ai/components/useScale.md)
- **useSearchLayout** (详细 API: ai/components/useSearchLayout.md)
- **useSearchTable** (详细 API: ai/components/useSearchTable.md)
- **useFormPerformance** (详细 API: ai/components/useFormPerformance.md)

## 注意事项

1. 优先使用 S 前缀组件而非 antd 原生组件
2. SForm 通过 items 数组配置，不需要手动写 Form.Item
3. SSearchTable = SForm.Search + STable 一体化，列表页首选
4. SConfigProvider 提供全局字典，STable/SDetail 自动读取
5. SButton 用 actionType 选择预设类型，无需设置 children
6. 使用组件前，先在本索引中确认场景是否匹配，再读取对应 ai/components/ 下的详细文档

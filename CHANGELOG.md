# Changelog

## 1.13.0

### ⚠️ API Changes

- **SForm**：`items[].fieldProps` 类型从 `HTMLAttributes<object> &` 交叉改为判别式联合，随 `type` 精确推导（`type:'select'`→`SelectProps`、`type:'input'`→`SInputProps` 等），并根治声明生成时的 TS2590
- **SForm**：废弃别名 `SDatePicker` / `SDatePickerRange` / `SCascader` 移出 `FormComType` 类型联合（运行时 `FORM_ITEM_COM_MAP` 仍兼容），`items` 中使用这些别名字面量将不再有 `fieldProps` 类型提示，建议迁移到规范名
- **SForm**：移除未使用导出 `FormComPropsType`；`ItemsProps` 改为内部宽松类型，公开配置统一走 `SFormItems`
- **SForm**：`gridColumn` 类型 `number | string` → `number`（字符串值此前从未生效）
- **SForm**：`onFinish` 类型由 `(e?: any) => void` 恢复为 `(values: Values) => void`，`SFormProps` / `SFormGroupProps` / `SearchProps` 泛型化
- **SForm**：`SForm.Item` 单独使用时不再强制 `marginBottom: 0`，恢复 antd 默认下边距（`items` 数组路径行为不变）

### 🔧 Fixes

- **SForm**：`SDatePickerRange` / `SCascader` / `SCheckGroup` 由 `useState + useEffect` 同步外部值改为半受控 `useMemo`，修复受控场景的闪烁 / 丢输入 / 双重渲染
- **SForm**：修复 `Search` 非卡片模式 `style` 覆盖默认 `marginBottom`；key 改用 `namePathToKey`（数组 name 不再变 `a,b`）；`gridColumn` 加 `[1, columns]` clamp；补空 label 项的列间距
- **SForm**：修复 `colProps` / `hidden` / `gridColumn` 泄漏进 `Form.Item`；`formName` 嵌套与 key 生成统一为 `resolveNamePath` / `namePathToKey`
- **DynamicContainer**：移除 `<CustomContainer {...(props as any)}>` 展开函数组件 props 的 hack
- **SInput**：trim 不再作用于显示值，修复光标跳动 / 首尾空格无法输入
- **utils**：修复 `types/reg.d.ts` 的 `key: regKey` 未定义类型；修复 `validate()` 带 `g` 标志正则的 `lastIndex` 残留

### ✨ Enhancements

- **SForm**：移除 ItemRender 全表单 `Form.useWatch`，普通表单项零订阅（输入不再触发全表单重渲染，仅函数型 `customCom` 订阅）
- **SForm**：cascader / table 重组件统一静态加载，删除 `lazy()` + `Suspense`
- **SForm**：抽取 `useFormBehavior` / `resolveLabelCol` / `resolveNamePath` / `namePathToKey`，消除 InstanceForm / Group / Search 重复逻辑
- **SForm**：`DEFAULT_CONFIG_MAP` 去生成函数改字面量；`Group` 补齐 `labelWidth` / `labelCol`；三种模式容器底部 `marginBottom: 16` 统一

### 🧪 Tests

- 新增 `utils/reg.test.ts`（`validate` 的 `g` 标志 lastIndex 回归）
- 新增 `check-group` 半受控单测（受控反序列化 / 非受控 onChange 序列化）
- `form-field` 补 `SDatePicker` / `SDatePickerRange` 废弃别名运行时兼容测试；`item-render` 样式断言强化
- 全量测试 350 用例通过

### 📦 Dependencies

- `jsdom` `^27.4.0` → `^30.0.0`（解决 Node 24 下 ESM 依赖加载问题）
- `test` / `test:watch` 脚本加 `--experimental-require-module`
- 新增 `.nvmrc`（`18.19.0`，用于 dumi 文档站）

## 1.12.0

### ⚠️ API Changes

- **SForm**：移除 `type: 'upload'` 控件类型（此前因懒加载映射缺失已无法正常渲染），`FormFieldMapType`、`FORM_ITEM_COM_MAP`、`DEFAULT_CONFIG_MAP` 中同步清理

### 🔧 Fixes

- **SForm**：修复 `type='treeSelect'` 被错误标记为懒加载导致渲染为"未知组件类型"的 bug（从 `HEAVY_COMPONENTS` 移除，回归直接引用）
- **SForm**：`Search` 组件操作区移除 `|| true` 死代码条件包裹
- **SForm**：`Group` 组件移除 `filter().map()` 后的冗余 `|| []`

### ✨ Enhancements

- **SForm**：性能优化 — 移除 7 处无意义 `useMemo`（`formTypeConfig`×3 / `dynamicSpan` / `formStyle` / `itemName` / `styleData`），消除假 memo 的 GC 开销
- **SForm**：移除未使用的 `FORM_ITEM_COM_MAP_BY_KEY` 和 `LIGHT_COMPONENTS` 死代码

### ✨ Features

- **SButton**：新增 `actionType="add"` 预设类型（图标 `Plus`，文字 `"新增"`，按钮类型 `primary`）

### 🧪 Tests

- **SForm**：单测从 3 文件 26 用例 → 6 文件 131 用例，新增 Search / Group / FormField 三个此前零测试的核心子组件覆盖
- **SForm**：`instance.test.tsx`（6→23）/ `item-render.test.tsx`（8→25）/ `constant.test.ts`（12→28），补全 columns、labelWidth、layout、formName、fieldProps 优先级、22 种 type 全覆盖等场景

### 📝 Docs

- **SForm**：`index.md` / `form-documentation.md` / `ai/components/SForm.md` 移除 upload 类型描述
- **SButton**：`ai/components/SButton.md` 新增 `add` 类型说明

## 1.10.2

### ⚠️ API Changes

- **SDetail**：移除 `img` 图片渲染类型，`type: 'img'` 不再支持。如需展示图片，请使用 `render` 自定义渲染配合 antd `Image` 组件

### ✨ Enhancements

- **SDetail**：`basic` 示例大幅增强，覆盖全部 7 种内置类型（text / dict / file / rangeTime / checkbox / placeholder / empty），并结合 `SConfigProvider` 演示全局字典 `dictKey` 用法
- **SDetail**：移除标签样式硬编码 `minWidth: 98px`，布局更灵活
- **SDetail**：移除内置 base64 图片降级常量 `FALL_BACK_STRING`，减少包体积

### 📝 AI 文档

- 全组件 `ai/components/*.md` 批量更新，与源码保持一致

## 1.10.1

### 🔧 Fixes

- **sdesign-ai CLI**：修复 `bin` 指向 `.ts` 文件导致 `ERR_UNKNOWN_FILE_EXTENSION` 错误，新增编译后的 `.js` 入口
- **sdesign-ai CLI**：修复 `AI_DIR` / `getVersion()` 路径计算错误，`__dirname` 适配 npm 发布后目录结构
- **sdesign-ai CLI**：修正 `init` 命令中 `llms.txt` 引用为 `README.md`

## 1.10.0

### ⚠️ API Changes

- **SProTable**：API 重构，12 个散落 prop 收拢为 `request` / `searchProps` / `tableProps` 三个分组对象，各透传对应组件全部属性
- **SDependency**：移除字段联动组件及 `type: 'dependency'` 类型，`depNames` / `render` 属性同步移除
- **STitle**：移除 `goBack` / `onBackClick` 属性及 react-router 回退按钮逻辑
- **样式系统**：9 个组件从 CSS-in-JS（antd-style）迁移为纯 CSS，移除 `useComStyle` hook
- **依赖清理**：移除 `antd-style`、`react-router`、`react-router-dom` 三个依赖

### ✨ Features

- **SProTable**：新增 `ref.getForm()` / `ref.clearData()` 方法
- **SProTable**：`searchProps.onFinish` / `searchProps.onReset` / `searchProps.form` 传了用外部，不传走内置
- **SProTable**：`tableProps` 透传 STable 全部属性，`pagination` 做 deep-merge
- **SProTable**：默认 `bordered`、`showSizeChanger: true`、`pageSizeOptions: [10,15,20,50,100]`
- **useProTable**：新增 `mutate` 方法，`ProService` 返回类型放宽为 `Promise<any>`

### 🔧 Fixes & Optimizations

- **STable**：4 个 if/if 字符串 render 派发 → `STRING_RENDER_MAP` 查表；移除 3 个无效 `useCallback`；序号列不再因翻页重建；移除 lodash `isString`
- **STitle**：`hasBottomMargin` 逻辑从 15 行优化为 4 行 useMemo
- **useProTable**：分页默认去掉 `showQuickJumper`

### 📦 Migration Guide

```tsx
// SProTable — 旧
<SSearchTable requestFn={fn} headTitle="管理" formProps={{ items, columns: 3 }} tableProps={{ columns, rowKey: 'id' }} />

// SProTable — 新
<SProTable request={{ service: fn }} title="管理" searchProps={{ items, columns: 3 }} tableProps={{ columns, rowKey: 'id' }} />

// SForm — 旧
{ type: 'dependency', depNames: ['field1'], render: (v) => ... }

// SForm — 新（移除）
// 改用 antd Form.Item 的 shouldUpdate 或自定义组件

// STitle — 旧
<STitle goBack onBackClick={fn}>标题</STitle>

// STitle — 新
<STitle>标题</STitle>
```

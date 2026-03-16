# SConfigProvider — 全局配置（字典、上传地址），STable/SDetail 自动读取

## 使用边界

**适用场景:**

- 应用根组件，为 STable/SDetail 提供全局字典和上传地址
- 多个页面共享同一套字典数据
  **不适用:**
- 不使用 dictKey 功能的项目
- 字典数据仅某个页面使用，直接在组件内传 dictMap

## 类型定义

**ConfigContextProps**

- globalDict?: Record<string, Record<string, any> | any>
- uploadUrl?: string
- getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string

**SConfigProviderType** — SConfigProvider 全局配置 Props 为 STable、SDetail 等组件提供全局字典和上传地址配置。 `tsx <SConfigProvider globalDict={{ userStatus: { 1: '启用', 2: '禁用' } }} uploadUrl="/api/upload" > <App /> </SConfigProvider> `

- globalDict?: Record<string, any> — 全局字典数据，STable dictKey / SDetail dictKey 自动读取
- uploadUrl?: string — 文件上传接口地址
- children?: ReactNode
- prefixCls?: string — 样式前缀

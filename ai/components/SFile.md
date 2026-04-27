# SFile — 文件上传/列表

## 子组件与静态方法

- SFile.List

## 使用边界

**适用场景:**

- 文件上传功能
- 文件列表展示（支持下载、预览）
  **不适用:**
- 图片上传预览，考虑使用 antd Upload + listType='picture-card'
- SDetail 中展示文件列表，直接用 SDetailItem type='file'

## 类型定义

**FileListProps**: `Omit<FileItemType, 'fileData'> & { label?: string; fileList: any[]; style?: React.CSSProperties; direction?: directionType; itemRender?: (data: FileDataType[]) => ReactNode | null`

**ReflectFile**

- fileName: string
- fileUrl: string

**FileDataType**

- id?: string
- fileName: string — 文件名称
- fileUrl: string — 文件地址

**directionType**: `(typeof DirectionTypes)[number]`

**FileIconMapFieldType**: `(typeof FileIconMapFieldTypes)[number]`

**FileItemType**

- fileData?: FileDataType
- style?: React.CSSProperties
- onFileHandle?: (file: FileDataType) => void
- reflect?: ReflectFile
- nameLimit?: number
- className?: string
- children?: ReactNode
- canClickName?: boolean
- onClick?: (data: any) => void
- fileIconMapField?: FileIconMapFieldType

## 使用示例

```tsx
import React from 'react';
import { SFile } from '@dalydb/sdesign';

const fileData = {
  fileName: 'example.pdf',
  fileUrl: 'https://example.com/file.pdf',
};

export default () => (
  <div>
    <SFile fileData={fileData} />
  </div>
);
```

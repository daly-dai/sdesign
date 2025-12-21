import { LucideIconName } from '@dalydb/sdesign';

// 优化后的代码
export const FILE_NAME_FIELD = 'fileName';
export const FILE_URL_FIELD = 'fileUrl';

// 文件类型到SLucideIcon图标的映射
export const fileTypeToIcon: Record<string, Partial<LucideIconName>> = {
  DOC: 'FileText',
  DOCX: 'FileText',
  JPG: 'Image',
  JPEG: 'Image',
  PNG: 'Image',
  TXT: 'FileTypeCorner',
  PDF: 'FileText',
  PPT: 'FileText',
  PPTX: 'FileText',
  RAR: 'FileArchive',
  WPS: 'FileText',
  XLS: 'FileSpreadsheet',
  XLSX: 'FileSpreadsheet',
  ZIP: 'FileArchive',
};

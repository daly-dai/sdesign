import {
  FileExcelOutlined,
  FileJpgOutlined,
  FileTextOutlined,
  FileWordOutlined,
  FileZipOutlined,
} from '@ant-design/icons';
import React, { ReactNode } from 'react';

// 优化后的代码
export const FILE_NAME_FIELD = 'fileName';
export const FILE_URL_FIELD = 'fileUrl';

// 文件类型到SLucideIcon图标的映射
export const fileTypeToIcon: Record<string, ReactNode> = {
  DOC: <FileWordOutlined />,
  DOCX: <FileWordOutlined />,
  JPG: <FileJpgOutlined />,
  JPEG: <FileJpgOutlined />,
  PNG: <FileJpgOutlined />,
  TXT: <FileTextOutlined />,
  PDF: <FileTextOutlined />,
  PPT: <FileTextOutlined />,
  PPTX: <FileTextOutlined />,
  RAR: <FileZipOutlined />,
  WPS: <FileTextOutlined />,
  XLS: <FileExcelOutlined />,
  XLSX: <FileExcelOutlined />,
  ZIP: <FileZipOutlined />,
};

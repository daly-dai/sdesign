import { ButtonProps } from 'antd';
import React, { CSSProperties } from 'react';

import { SButtonType } from '../button/types';
import LucideIcon from '../lucide-icon';

export const tLinkStyle: CSSProperties = { padding: 'unset', margin: 'unset' };

const defaultConfig: Record<SButtonType, Partial<ButtonProps>> = {
  't-link': {
    type: 'link',
    children: 't-link',
    style: tLinkStyle,
  },
  primary: {
    type: 'primary',
  },
  link: {
    type: 'link',
  },
  text: {
    type: 'text',
  },
  save: {
    type: 'primary',
    icon: <LucideIcon name="Save" />,
    children: '保存',
  },
  reset: {
    type: 'primary',
    icon: <LucideIcon name="RotateCcw" />,
    children: '重置',
  },
  upload: {
    type: 'primary',
    icon: <LucideIcon name="Upload" />,
    children: '上传',
  },
  download: {
    type: 'primary',
    icon: <LucideIcon name="Download" />,
    children: '下载',
  },
  export: {
    type: 'primary',
    icon: <LucideIcon name="FolderOutput" />,
    children: '导出',
  },
  import: {
    type: 'primary',
    icon: <LucideIcon name="Import" />,
    children: '导入',
  },
  delete: {
    type: 'default',
    danger: true,
    icon: <LucideIcon name="Trash" />,
    children: '删除',
  },
  create: {
    type: 'primary',
    icon: <LucideIcon name="PlusCircle" />,
    children: '创建',
  },
  edit: {
    type: 'primary',
    icon: <LucideIcon name="Edit" />,
    children: '编辑',
  },
  next: {
    type: 'primary',
    icon: <LucideIcon name="ArrowRight" />,
    children: '下一页',
  },
  previous: {
    type: 'primary',
    icon: <LucideIcon name="ArrowLeft" />,
    children: '上一页',
  },
  finish: {
    type: 'primary',
    icon: <LucideIcon name="CheckCircle" />,
    children: '完成',
  },
  cancel: {
    type: 'default',
    danger: true,
    icon: <LucideIcon name="CircleX" />,
    children: '取消',
  },
  back: {
    type: 'primary',
    icon: <LucideIcon name="ArrowLeft" />,
    children: '返回',
  },
  confirm: {
    type: 'primary',
    icon: <LucideIcon name="Check" />,
    children: '确认',
  },
  close: {
    type: 'default',
    danger: true,
    icon: <LucideIcon name="X" />,
    children: '关闭',
  },
  view: {
    type: 'primary',
    icon: <LucideIcon name="Eye" />,
    children: '查看',
  },
  refresh: {
    type: 'primary',
    icon: <LucideIcon name="RefreshCw" />,
    children: '刷新',
  },
  default: {
    type: 'default',
  },
  dashed: {
    type: 'dashed',
  },
  search: {
    type: 'primary',
    icon: <LucideIcon name="Search" />,
    children: '查询',
  },
};

export default defaultConfig;

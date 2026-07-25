import { ButtonProps } from 'antd';
import React, { CSSProperties, memo } from 'react';

import LucideIcon from '../lucide-icon';

export const tLinkStyle: CSSProperties = {
  padding: 0,
  height: 'unset',
  // margin: 'unset',
  border: 'unset',
};

// 创建 Memoized Icons 以避免每次渲染时创建新的 React 元素
const MemoizedPlusIcon = memo(() => <LucideIcon name="Plus" />);
const MemoizedSaveIcon = memo(() => <LucideIcon name="Save" />);
const MemoizedRotateCcwIcon = memo(() => <LucideIcon name="RotateCcw" />);
const MemoizedUploadIcon = memo(() => <LucideIcon name="Upload" />);
const MemoizedDownloadIcon = memo(() => <LucideIcon name="Download" />);
const MemoizedFolderOutputIcon = memo(() => <LucideIcon name="FolderOutput" />);
const MemoizedImportIcon = memo(() => <LucideIcon name="Import" />);
const MemoizedTrashIcon = memo(() => <LucideIcon name="Trash" />);
const MemoizedPlusCircleIcon = memo(() => <LucideIcon name="PlusCircle" />);
const MemoizedEditIcon = memo(() => <LucideIcon name="Edit" />);
const MemoizedArrowRightIcon = memo(() => <LucideIcon name="ArrowRight" />);
const MemoizedArrowLeftIcon = memo(() => <LucideIcon name="ArrowLeft" />);
const MemoizedCheckCircleIcon = memo(() => <LucideIcon name="CheckCircle" />);
const MemoizedCircleXIcon = memo(() => <LucideIcon name="CircleX" />);
const MemoizedXIcon = memo(() => <LucideIcon name="X" />);
const MemoizedCheckIcon = memo(() => <LucideIcon name="Check" />);
const MemoizedEyeIcon = memo(() => <LucideIcon name="Eye" />);
const MemoizedRefreshCwIcon = memo(() => <LucideIcon name="RefreshCw" />);
const MemoizedSearchIcon = memo(() => <LucideIcon name="Search" />);

// defaultConfig包含操作按钮类型和标准按钮类型的配置
const defaultConfig: Record<string, Partial<ButtonProps>> = {
  't-link': {
    type: 'link',
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
  add: {
    type: 'primary',
    icon: <MemoizedPlusIcon />,
    children: '新增',
  },
  save: {
    type: 'primary',
    icon: <MemoizedSaveIcon />,
    children: '保存',
  },
  reset: {
    type: 'primary',
    icon: <MemoizedRotateCcwIcon />,
    children: '重置',
  },
  upload: {
    type: 'primary',
    icon: <MemoizedUploadIcon />,
    children: '上传',
  },
  download: {
    type: 'primary',
    icon: <MemoizedDownloadIcon />,
    children: '下载',
  },
  export: {
    type: 'primary',
    icon: <MemoizedFolderOutputIcon />,
    children: '导出',
  },
  import: {
    type: 'primary',
    icon: <MemoizedImportIcon />,
    children: '导入',
  },
  delete: {
    type: 'default',
    danger: true,
    icon: <MemoizedTrashIcon />,
    children: '删除',
  },
  create: {
    type: 'primary',
    icon: <MemoizedPlusCircleIcon />,
    children: '创建',
  },
  edit: {
    type: 'primary',
    icon: <MemoizedEditIcon />,
    children: '编辑',
  },
  next: {
    type: 'primary',
    icon: <MemoizedArrowRightIcon />,
    children: '下一页',
  },
  previous: {
    type: 'primary',
    icon: <MemoizedArrowLeftIcon />,
    children: '上一页',
  },
  finish: {
    type: 'primary',
    icon: <MemoizedCheckCircleIcon />,
    children: '完成',
  },
  cancel: {
    type: 'default',
    danger: true,
    icon: <MemoizedCircleXIcon />,
    children: '取消',
  },
  back: {
    type: 'primary',
    icon: <MemoizedArrowLeftIcon />,
    children: '返回',
  },
  confirm: {
    type: 'primary',
    icon: <MemoizedCheckIcon />,
    children: '确认',
  },
  close: {
    type: 'default',
    danger: true,
    icon: <MemoizedXIcon />,
    children: '关闭',
  },
  view: {
    type: 'primary',
    icon: <MemoizedEyeIcon />,
    children: '查看',
  },
  refresh: {
    type: 'primary',
    icon: <MemoizedRefreshCwIcon />,
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
    icon: <MemoizedSearchIcon />,
    children: '查询',
  },
};

export default defaultConfig;

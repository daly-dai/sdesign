import { DescriptionsProps } from 'antd';
import { DescriptionsItemType } from 'antd/es/descriptions';
import React, { ReactNode } from 'react';

import { FileListProps, PageTitleProps } from '@daly/sdesign';
import { tuple } from '@daly/sdesign/utils/types';

const ItemTypes = tuple(
  'text',
  'empty',
  'file',
  'dict',
  'img',
  'rangeTime',
  'checkbox',
  'placeholder',
);

export type ItemType = (typeof ItemTypes)[number];

export interface DictReflect {
  label?: string;
  name?: string;
}

export type SDetailItemType = DetailItemType & {
  label?: ReactNode;
  name?: string | string[];
  render?: (value?: any, dataSource?: any) => ReactNode;
  span?: number;
  /** * @desc 隐藏该属性 */
  hidden?: boolean;
};

export type DetailItemType = {
  type?: ItemType;
  fileProps?: Partial<FileListProps>;
  dictReflect?: DictReflect;
  dictKey?: string;
  value?: any;
  dictMap?: Record<string, string> | any[] | null;
  render?: (value?: any, dataSource?: any) => ReactNode;
  dataSource?: Record<string, any>;
};

export type SDetailItem = SDetailItemType &
  Omit<DescriptionsItemType, 'children' | 'key'>;

export interface SDetailProps
  extends Omit<DescriptionsProps, 'items' | 'title'> {
  titleDesc?: ReactNode;
  titleAction?: ReactNode;
  dataSource?: Record<string, any>;
  items?: SDetailItem[];
  labelStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  hasCardBg?: boolean;
  container?: React.ComponentType<any>;
  title?: string | ReactNode;
  /** @description dataSource中的key */
  detailName?: string;
}

export interface SDetailGroupItem {
  groupTitle?: string | ReactNode;
  groupTitleProps?: Omit<PageTitleProps, 'title'>;
  groupContainer?: React.ComponentType<any>;
  groupItems?: SDetailProps[];
  items?: SDetailItem[];
  itemProps?: Omit<SDetailProps, 'items' | 'dataSource'>;
  dataSource?: Record<string, any>;
  /*** @desc 隐藏该属性*/
  hidden?: boolean;
}

export interface SDetailGroupProps {
  items?: SDetailGroupItem[];
  dataSource?: Record<string, any>;
}

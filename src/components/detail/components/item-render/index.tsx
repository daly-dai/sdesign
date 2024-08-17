import { Image } from 'antd';
import isArray from 'lodash/isArray';
import isNil from 'lodash/isNil';
import React, { FC, ReactNode, memo, useContext, useMemo } from 'react';

import { FALL_BACK_STRING } from '../../constant';
import useStyles from '../../index.style';
import { DetailItemType, ItemType } from '../../types';

import { ConfigContext } from '@daly/sdesign/components/config-provider/contexts';
import SFile from '@daly/sdesign/components/file';
import { useComStyle } from '@daly/sdesign/hooks';
import { dispatchCheckboxDictData, dispatchDictData, getDictMap } from '@daly/sdesign/utils';

const DetailItem: FC<DetailItemType> = ({
  render,
  type = 'text',
  value,
  dictMap,
  fileProps,
  dictKey,
  dataSource,
  dictReflect = {
    label: 'label',
    name: 'name',
  },
}) => {
  const { styles, prefixCls } = useComStyle({
    prefixCls: 'detail',
    useStylesHook: useStyles,
  });

  const { globalDict } = useContext(ConfigContext);

  const renderValue = useMemo(() => {
    if (render) {
      return (
        <div className={styles[`${prefixCls}-value`]}>{render(value, dataSource) as ReactNode}</div>
      );
    }

    const TYPE_MAP: Record<ItemType, () => ReactNode> = {
      text: () => (isNil(value) ? '-' : value),
      empty: () => '-',
      placeholder: () => '',
      dict: () => {
        const localDictMap = getDictMap({ dictMap, globalDict, dictKey });

        const result = dispatchDictData(localDictMap, value, dictReflect);

        return result;
      },
      file: () => {
        if (isNil(value)) return '-';

        if (!isArray(value))
          return <SFile {...fileProps} style={{ color: '#1677ff' }} fileData={value} />;

        return <SFile.List {...fileProps} fileList={value ?? []} />;
      },
      img: () => {
        return (
          <Image
            style={{
              backgroundColor: 'rgba(8, 16, 30, 0.15)',
              objectFit: 'scale-down',
            }}
            placeholder
            width={88}
            height={88}
            src={value}
            fallback={FALL_BACK_STRING}
          />
        );
      },
      rangeTime: () => {
        if (!value?.length || value?.length !== 2) return '-';

        const startTime = value?.[0];
        const endTime = value?.[1];

        return `${startTime ?? ''} - ${endTime ?? ''}`;
      },
      checkbox: () => {
        const localDictMap = getDictMap({ dictMap, globalDict, dictKey });

        const result = dispatchCheckboxDictData(localDictMap, value, dictReflect);

        return result;
      },
    };
    return TYPE_MAP[type]();
  }, [type, value, dictMap, fileProps, dictKey, dataSource, globalDict, render]);

  return <div className={styles[`${prefixCls}-value`]}>{renderValue}</div>;
};

export default memo(DetailItem);

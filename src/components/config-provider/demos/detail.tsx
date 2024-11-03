/**
 * title:  globalDict 全局字典值
 * description: 子组件可以通过dictKey 进行使用
 */
import React from 'react';

import {
  SCheckGroup,
  SConfigProvider,
  SDetail,
  SDetailItem,
  SRadioGroup,
  SSelect,
} from '@dalydb/sdesign';

const dictionaryMap = {
  dataPromise: {
    L1: '不敏感',
    L2: '低敏感',
    L3: '较敏感',
    L4: '敏感',
    L5: '极敏感',
  },
};

const businessItems: SDetailItem[] = [
  {
    label: '字典值回显',
    name: 'accessMode',
    type: 'dict',
    dictKey: 'dataPromise',
  },
];

const detailData = {
  accessMode: 'L1',
};

export default () => {
  return (
    <>
      <h3>手动设置全局字典值</h3>
      <SConfigProvider globalDict={dictionaryMap}>
        <h4>并在SDetail中使用dictKey字段</h4>
        <SDetail
          column={2}
          items={businessItems}
          dataSource={detailData}
        ></SDetail>
        <h4>下拉选择框使用dictKey字段</h4>
        <SSelect style={{ width: 140 }} dictKey="dataPromise"></SSelect>
        <h4>多选框组使用dictKey字段</h4>
        <SCheckGroup dictKey="dataPromise"></SCheckGroup>
        <h4>单选框组使用dictKey字段</h4>
        <SRadioGroup dictKey="dataPromise"></SRadioGroup>
      </SConfigProvider>
    </>
  );
};

import { Flex, Typography } from 'antd';
import React from 'react';

import { SRadioGroup } from '@dalydb/sdesign';

const dictData = {
  L1: '不敏感',
  L2: '低敏感',
  L3: '较敏感',
  L4: '敏感',
  L5: '极敏感',
};

export default () => {
  return (
    <div>
      <Flex gap={24} vertical>
        <section>
          <Typography.Title level={5}>dict 生成选项</Typography.Title>
          <SRadioGroup dict={dictData} defaultValue="L3" />
        </section>

        <section>
          <Typography.Title level={5}>
            disableKeys 禁用单个选项
          </Typography.Title>
          <SRadioGroup dict={dictData} disableKeys="L1" defaultValue="L3" />
        </section>

        <section>
          <Typography.Title level={5}>
            disableKeys 禁用多个选项
          </Typography.Title>
          <SRadioGroup
            dict={dictData}
            disableKeys={['L1', 'L5']}
            defaultValue="L3"
          />
        </section>

        <section>
          <Typography.Title level={5}>
            配合 antd Radio.Group 原生属性
          </Typography.Title>
          <SRadioGroup
            dict={dictData}
            optionType="button"
            buttonStyle="solid"
            size="small"
            defaultValue="L3"
          />
        </section>
      </Flex>
    </div>
  );
};

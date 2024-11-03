import { Flex } from 'antd';
import { DumiSiteProvider, Hero } from 'dumi-theme-antd-style';
import React from 'react';

export default () => (
  <DumiSiteProvider>
    <Flex
      align="center"
      justify="center"
      style={{ height: 600, width: '100%' }}
    >
      <Hero
        title={' @dalydb/sdesign'}
        // actions={[
        //   { text: '主按钮', link: '/components/hero' },
        //   { text: '辅助按钮', link: '/' },
        // ]}
        description={'炫酷的 Hero 头部组件'}
      />
    </Flex>
  </DumiSiteProvider>
);

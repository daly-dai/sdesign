import { Card, Flex, Typography } from 'antd';
import React from 'react';

import {
  SCheckGroup,
  SConfigProvider,
  SRadioGroup,
  SSelect,
} from '@dalydb/sdesign';

const { Text } = Typography;

const globalDict = {
  userStatus: { 1: '启用', 2: '禁用' },
  userRole: { admin: '管理员', user: '普通用户', guest: '访客' },
};

export default () => {
  return (
    <div>
      <Flex vertical gap={24}>
        <Card title="全局字典配置">
          <SConfigProvider globalDict={globalDict}>
            <Flex vertical gap={16}>
              <div>
                <Text strong>Select 字典下拉：</Text>
                <SSelect
                  style={{ width: 200 }}
                  placeholder="选择角色"
                  dictKey="userRole"
                />
              </div>
              <div>
                <Text strong>RadioGroup 字典单选：</Text>
                <SRadioGroup dictKey="userRole" />
              </div>
              <div>
                <Text strong>CheckGroup 字典多选：</Text>
                <SCheckGroup dictKey="userRole" />
              </div>
            </Flex>
          </SConfigProvider>
        </Card>
      </Flex>
    </div>
  );
};

/**
 * title: 左右分栏式
 * description: Row + Col 分别嵌套 SDetail 实例，最常用的详情页左右分栏布局。
 */
import type { SDetailItem } from '@dalydb/sdesign';
import { SCard, SDetail } from '@dalydb/sdesign';
import { Col, Row } from 'antd';
import React from 'react';

const dataSource = { name: '张三', dept: '技术部', email: 'zs@example.com' };

const leftItems: SDetailItem[] = [
  { label: '姓名', name: 'name' },
  { label: '部门', name: 'dept' },
];

const rightItems: SDetailItem[] = [{ label: '邮箱', name: 'email' }];

const Demo = () => (
  <Row gutter={16}>
    <Col span={8}>
      <SCard title="摘要">
        <SDetail dataSource={dataSource} items={leftItems} columns={1} />
      </SCard>
    </Col>
    <Col span={16}>
      <SCard title="详细信息">
        <SDetail dataSource={dataSource} items={rightItems} columns={1} />
      </SCard>
    </Col>
  </Row>
);

export default Demo;

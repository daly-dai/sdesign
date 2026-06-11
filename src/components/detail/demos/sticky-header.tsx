/**
 * title: 悬浮固定头式
 * description: 标题+摘要使用 position: sticky 固定在顶部，大量字段可滚动，测试 Grid 在 sticky 容器中的表现。
 */
import type { SDetailItem } from '@dalydb/sdesign';
import { SDetail } from '@dalydb/sdesign';
import React from 'react';

const dataSource: Record<string, string> = {};
for (let i = 1; i <= 20; i++) {
  dataSource[`field${i}`] = `字段 ${i} 的值`;
}

const items: SDetailItem[] = Array.from({ length: 20 }, (_, i) => ({
  label: `字段 ${i + 1}`,
  name: `field${i + 1}`,
}));

const Demo = () => (
  <div style={{ maxHeight: 400, overflow: 'auto' }}>
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        background: '#fff',
        padding: '16px 0',
        borderBottom: '1px solid #f0f0f0',
        marginBottom: 16,
      }}
    >
      <h3 style={{ margin: 0 }}>用户详情（sticky 标题）</h3>
      <p style={{ margin: '4px 0 0', color: '#999' }}>
        数据更新时间：2024-06-01
      </p>
    </div>
    <SDetail dataSource={dataSource} items={items} columns={2} gap={16} />
  </div>
);

export default Demo;

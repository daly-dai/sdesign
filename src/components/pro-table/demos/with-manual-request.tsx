/**
 * background: '#f6f7f9'
 * title: 依赖请求 — 页面初始化不请求，等待配置接口返回后注入参数再请求
 *
 * 场景：
 * 1. 页面加载时不请求列表（manual: true）
 * 2. 先请求部门配置接口，拿到 deptId
 * 3. 把 deptId 注入到搜索参数中
 * 4. 通过 form.setFieldsValue + refresh() 触发列表请求
 */

import React from 'react';

import type { SColumnsType } from '@dalydb/sdesign';
import { SForm, SProTable } from '@dalydb/sdesign';
import { useRequest } from 'ahooks';
import { Spin } from 'antd';

interface Employee {
  id: number;
  name: string;
  deptName: string;
  position: string;
  createTime: string;
}

// ====== 模拟依赖接口：获取当前部门信息 ======
const fetchDeptConfigByGet = async () => {
  await new Promise((r) => {
    setTimeout(r, 600);
  });
  return { deptId: 3, deptName: '研发部' };
};

// ====== 模拟列表接口：需要 deptId 才能查询 ======
const mockData: Employee[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `员工${i + 1}`,
  deptName: '研发部',
  position: ['前端', '后端', '测试', '产品'][i % 4],
  createTime: new Date(Date.now() - i * 259200000).toISOString(),
}));

const getEmployeeListByGet = async (params: Record<string, unknown>) => {
  console.log('params:', params);
  await new Promise((r) => {
    setTimeout(r, 300);
  });
  return { list: mockData, total: mockData.length };
};

export default () => {
  const [form] = SForm.useForm();

  // ① 先请求部门配置
  const { data: deptConfig, loading } = useRequest(fetchDeptConfigByGet);

  const columns: SColumnsType<Employee> = [
    { title: '姓名', dataIndex: 'name', width: 100 },
    { title: '部门', dataIndex: 'deptName', width: 100 },
    { title: '岗位', dataIndex: 'position', width: 100 },
    {
      title: '入职时间',
      dataIndex: 'createTime',
      width: 180,
      render: 'datetime' as const,
    },
  ];

  return (
    <Spin spinning={loading} tip="加载部门配置中...">
      <div style={{ padding: 24 }}>
        <SProTable<Employee>
          // ② 配置就绪后自动触发首次请求
          request={{
            service: getEmployeeListByGet,
            options: { ready: !!deptConfig },
          }}
          searchProps={{ form }}
          tableProps={{ columns, rowKey: 'id' }}
          title="员工管理"
        />
      </div>
    </Spin>
  );
};

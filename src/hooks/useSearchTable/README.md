# useSearchTable Hook 使用说明

`useSearchTable` 是一个用于处理搜索表格数据的自定义 Hook，支持灵活的分页参数配置和数据转换。API 设计遵循 `useRequest` 的使用习惯。

## API

```typescript
const result = useSearchTable(requestFn, options);
```

### 参数

- `requestFn`: 请求数据的函数（第一个参数）
- `options`: 配置选项（第二个参数）

### Options 配置项

```typescript
interface useSearchTableOptions {
  form: FormInstance<any>; // Ant Design Form 实例
  extraParams?: Record<string, any>; // 额外的请求参数
  manual?: boolean; // 是否手动触发请求，默认为 false（自动请求）
  dispatchParams?: (params?: any) => any; // 参数处理函数
  serviceProps?: Options<any, any>; // useRequest 的配置选项
  paginationFields?: PaginationFields; // 分页参数字段映射配置
  transformRequestParams?: (params: any) => any; // 请求参数转换函数
  transformResponseData?: (data: any) => any; // 响应数据转换函数
}
```

### paginationFields 配置

```typescript
interface PaginationFields {
  current?: string; // 当前页码字段名，默认为 'pageNum'
  pageSize?: string; // 每页条数字段名，默认为 'pageSize'
  total?: string; // 总条数字段名，默认为 'totalSize'
  list?: string; // 数据列表字段名，默认为 'dataList'
}
```

### 返回值

```typescript
interface useSearchTableReturnType {
  getPageData: (params?: any) => void; // 获取数据函数
  handleReset: () => void; // 重置表单并重新加载数据
  tableProps: TableProps<any>; // 整合的表格属性，直接用于 Ant Design Table
  form: FormInstance<any>; // 表单实例，可用于外部组件挂载
  formConfig: {
    // 专门为 SForm.Search 设计的配置对象
    onFinish: (params?: any) => void;
    onReset: () => void;
  };
  // 为了向后兼容，仍然保留单独的属性
  dataSource: any[]; // 表格数据源
  pagination?: false | TablePaginationConfig; // 分页配置
  loading?: boolean; // 加载状态
}
```

## 使用示例

### 极简用法（推荐）

```typescript
import { useSearchTable } from '@dalydb/sdesign/hooks/useSearchTable';
import { SForm, SFormItems, STable } from '@dalydb/sdesign';

const MyComponent = () => {
  const { tableProps, form, formConfig } = useSearchTable(fetchData, {
    // 使用配置式表单，不需要手动创建 Form 实例
  });

  const formItems: SFormItems[] = [
    {
      label: '姓名',
      name: 'name',
      type: 'input',
    },
    {
      label: '状态',
      name: 'status',
      type: 'select',
      fieldProps: {
        dict: statusDict,
      },
    },
  ];

  return (
    <div>
      {/* 极简用法：只需要传一个 formConfig 属性 */}
      <SForm.Search
        form={form}
        items={formItems}
        {...formConfig} // 只需要传一个属性！
      />

      {/* 表格 - 直接使用 tableProps */}
      <STable {...tableProps} columns={columns} />
    </div>
  );
};
```

### 手动传入 Form 实例（向后兼容）

```typescript
import { useSearchTable } from '@dalydb/sdesign/hooks/useSearchTable';
import { Form, Table } from 'antd';

const MyComponent = () => {
  const [form] = Form.useForm();

  const { getPageData, handleReset, tableProps } = useSearchTable(fetchData, {
    form, // 手动传入 Form 实例
  });

  return (
    <div>
      <Form form={form} onFinish={getPageData}>
        {/* 手动创建的表单字段 */}
      </Form>

      <Table {...tableProps} columns={columns} />
    </div>
  );
};
```

### 自定义分页字段

```
const { tableProps } = useSearchTable(fetchData, {
  form,
  paginationFields: {
    current: 'page',      // 后端使用 'page' 字段
    pageSize: 'size',     // 后端使用 'size' 字段
    total: 'totalCount',  // 后端返回 'totalCount' 字段
    list: 'items',        // 后端返回 'items' 数组
  },
});
```

### 参数转换

```
const { tableProps } = useSearchTable(fetchData, {
  form,
  transformRequestParams: (params) => {
    // 转换请求参数格式
    return {
      ...params,
      // 将页码从 1-based 转换为 0-based
      page: params.pageNum - 1,
      // 重命名字段
      limit: params.pageSize,
    };
  },
});
```

### 响应数据转换

```
const { tableProps } = useSearchTable(fetchData, {
  form,
  transformResponseData: (response) => {
    // 转换响应数据格式
    return {
      pageNum: response.current_page,
      pageSize: response.per_page,
      totalSize: response.total_count,
      dataList: response.data.items,
    };
  },
});
```

### 完整示例

```
import { useSearchTable } from '@dalydb/sdesign/hooks/useSearchTable';
import { SForm, SFormItems, STable, Button, Input } from '@dalydb/sdesign';

const MySearchTable = () => {
  // hook 自动创建并返回所有需要的属性
  const {
    tableProps,
    form,
    formConfig  // 使用返回的配置对象
  } = useSearchTable(
    async (params) => {
      // 模拟 API 调用
      const response = await fetch('/api/data', {
        method: 'POST',
        body: JSON.stringify(params),
      });
      return response.json();
    },
    {
      paginationFields: {
        current: 'page',
        pageSize: 'limit',
        total: 'total',
        list: 'records',
      },
      transformRequestParams: (params) => {
        // 转换请求参数
        return {
          ...params,
          sort: 'created_at',
          order: 'desc',
        };
      },
    }
  );

  const formItems: SFormItems[] = [
    {
      label: '姓名',
      name: 'name',
      type: 'input',
    },
    {
      label: '状态',
      name: 'status',
      type: 'select',
      fieldProps: {
        options: [
          { value: 'active', label: '活跃' },
          { value: 'inactive', label: '非活跃' },
        ],
      },
    },
  ];

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
  ];

  return (
    <div>
      {/* 极简用法：只需要传一个 formConfig 属性 */}
      <SForm.Search
        form={form}
        items={formItems}
        {...formConfig}
      >
        <Button type="primary" htmlType="submit">
          搜索
        </Button>
        <Button onClick={formConfig.onReset}>
          重置
        </Button>
      </SForm.Search>

      {/* 直接使用整合的 tableProps */}
      <STable {...tableProps} columns={columns} />
    </div>
  );
};
```

## 与 useRequest 的一致性

新的 API 设计与 `useRequest` 保持一致：

```typescript
// useRequest 的使用方式
const { data, loading, run } = useRequest(service, options);

// useSearchTable 的使用方式
const { tableProps, getPageData } = useSearchTable(requestFn, options);
```

这种设计更加符合 React Hooks 的使用习惯，也更容易被开发者理解和使用。

# useSTable Hook 使用说明

`useSTable` 是一个基于 `ahooks` 中 `useAntdTable` 的封装 Hook，用于简化表格数据处理逻辑。

## API

```typescript
const result = useSTable(service, options);
```

### 参数

- `service`: 请求数据的服务函数
- `options`: 配置选项，包括：
  - `paginationFields`: 分页参数字段映射，默认为 `{ current: 'current', pageSize: 'pageSize', total: 'total' }`
  - `transformPaginationParams`: 分页参数转换函数（可选，与 paginationFields 互斥）
  - `transformRequestParams`: 请求参数转换函数（可选）
  - `transformResponseData`: 响应数据转换函数（可选）
  - 其他 `useAntdTable` 支持的选项

### 返回值

返回与 `useAntdTable` 相同的结构，包含表格数据、分页信息和操作方法。

## 使用示例

### 基本用法

```typescript
import { useSTable } from '@dalydb/sdesign';

const Demo = () => {
  const { tableProps, loading, data } = useSTable(
    (params) => {
      return fetchTableData(params);
    },
    {
      defaultParams: [{ current: 1, pageSize: 10 }],
      paginationFields: {
        current: 'page',
        pageSize: 'size',
        total: 'totalElements',
      },
    },
  );

  return (
    <Table {...tableProps} loading={loading} dataSource={data?.list || []} />
  );
};
```

### 高级用法

```typescript
const AdvancedDemo = () => {
  const { tableProps, loading, data } = useSTable(
    (params) => {
      return fetchTableData(params);
    },
    {
      defaultParams: [{ current: 1, pageSize: 10 }],
      paginationFields: {
        current: 'page',
        pageSize: 'size',
        total: 'totalElements',
      },
      transformRequestParams: (params) => {
        // 自定义请求参数转换
        return [
          {
            ...params[0],
            page: params[0].current - 1, // 某些API需要0开始的页码
          },
        ];
      },
      transformResponseData: (response) => {
        // 自定义响应数据转换
        return {
          list: response.items,
          total: response.count,
        };
      },
    },
  );

  return (
    <Table {...tableProps} loading={loading} dataSource={data?.list || []} />
  );
};
```

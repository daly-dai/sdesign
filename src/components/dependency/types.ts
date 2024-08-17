import { FormInstance, FormItemProps } from 'antd';

type ProFormInstance<T = any> = FormInstance<T>;

export type RenderChildren<Values = any> = (
  values: Record<string, any>,
  form: ProFormInstance<Values>,
) => React.ReactNode;

export type SDependencyProps<T = Record<string, any>> = Omit<
  FormItemProps<any>,
  'noStyle' | 'children' | 'label'
> & {
  depNames: string[];
  children?: RenderChildren<T>;
};

import { Form } from 'antd';
import Group from './components/group';
import ItemRender from './components/item-render';
import Search from './components/search';
import InstanceForm from './instance';

type InternalSFormType = typeof InstanceForm;

export type SFormType = InternalSFormType & {
  Search: typeof Search;
  Group: typeof Group;
  Item: typeof ItemRender;
  FormItem: typeof Form.Item;
  useForm: typeof Form.useForm;
  useWatch: typeof Form.useWatch;
  useFormInstance: typeof Form.useFormInstance;
  ErrorList: typeof Form.ErrorList;
  List: typeof Form.List;
};

const SForm = InstanceForm as SFormType;

SForm.Search = Search;
SForm.Group = Group;
SForm.Item = ItemRender;
SForm.FormItem = Form.Item;
SForm.useForm = Form.useForm;
SForm.useWatch = Form.useWatch;
SForm.useFormInstance = Form.useFormInstance;
SForm.ErrorList = Form.ErrorList;
SForm.List = Form.List;

export default SForm;

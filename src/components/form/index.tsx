import Group from './components/group';
import ItemRender from './components/item-render';
import Search from './components/search';
import InstanceForm from './instance';

type InternalSFormType = typeof InstanceForm;

export type SFormType = InternalSFormType & {
  Search: typeof Search;
  Group: typeof Group;
  Item: typeof ItemRender;
};

const SForm = InstanceForm as SFormType;

SForm.Search = Search;
SForm.Group = Group;
SForm.Item = ItemRender;

export default SForm;

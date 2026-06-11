import DetailGroup from './components/group';
import DetailItem from './components/item-render';
import DetailInstance from './instance';
type InternalDetailType = typeof DetailInstance;

export type SDetailType = InternalDetailType & {
  Group: typeof DetailGroup;
  Item: typeof DetailItem;
};

const SDetail: SDetailType = Object.assign(DetailInstance, {
  Group: DetailGroup,
  Item: DetailItem,
});

export default SDetail;

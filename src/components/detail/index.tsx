import DetailGroup from './components/group';
import DetailItem from './components/item-render';
import DetailInstance from './instance';
type InternalDetailType = typeof DetailInstance;

export type SDetailType = InternalDetailType & {
  Group: typeof DetailGroup;
  Item: typeof DetailItem;
};

const SDetail = DetailInstance as SDetailType;

// @ts-ignore
SDetail.Group = DetailGroup;
// @ts-ignore
SDetail.Item = DetailItem;

export default SDetail;

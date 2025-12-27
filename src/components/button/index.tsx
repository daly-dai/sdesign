import SButtonGroup from './Buttons';
import InstanceButton from './instance';

type InternalSButtonType = typeof InstanceButton;

export type SButtonType = InternalSButtonType & {
  Group: typeof SButtonGroup;
};

const SButton: SButtonType = InstanceButton as SButtonType;

SButton.Group = SButtonGroup;

export default SButton;

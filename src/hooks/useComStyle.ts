import { theme } from 'antd';
import { useContext } from 'react';

import { ConfigContext } from '../components/config-provider/contexts';

interface useComStyleProps {
  prefixCls: string;
  useStylesHook: any; // 样式钩子
}

const { useToken } = theme;
const useComStyle = ({ prefixCls, useStylesHook }: useComStyleProps) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const { token } = useToken();

  const prefixClsName = getPrefixCls(prefixCls);

  const { styles, cx } = useStylesHook({ prefixCls: prefixClsName });

  return {
    styles,
    cx,
    prefixCls: prefixClsName,
    token,
  };
};

export default useComStyle;

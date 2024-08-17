import { createStyles } from 'antd-style';

const useStyles = createStyles(({}, { prefixCls }: { prefixCls: string }) => {
  return {
    [prefixCls]: {
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% auto',
      backgroundPosition: '0 0',
    },
  };
});

export default useStyles;

import { createStyles } from 'antd-style';

const useStyles = createStyles(({}, { prefixCls }: { prefixCls: string }) => {
  return {
    [prefixCls]: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    [`${prefixCls}-img`]: { margin: '0 auto' },
    [`${prefixCls}-large`]: { fontSize: '120px' },
    [`${prefixCls}-middle`]: { fontSize: '80px' },
    [`${prefixCls}-small`]: { fontSize: '40px' },
  };
});
export default useStyles;

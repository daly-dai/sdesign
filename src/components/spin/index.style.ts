import { createStyles } from 'antd-style';

const useStyles = createStyles(({}, { prefixCls }: { prefixCls: string }) => {
  return {
    [`${prefixCls}-img`]: {
      margin: '0 auto',
    },
    [`${prefixCls}-large`]: {
      fontSize: '200px',
    },
    [`${prefixCls}-default`]: {
      fontSize: '150px',
    },
    [`${prefixCls}-small`]: {
      fontSize: '100px',
    },
  };
});
export default useStyles;

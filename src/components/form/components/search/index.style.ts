import { createStyles } from 'antd-style';

const useStyles = createStyles(({}, { prefixCls }: { prefixCls: string }) => {
  return {
    [`${prefixCls}-action-right`]: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  };
});

export default useStyles;

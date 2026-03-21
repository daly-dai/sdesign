import { createStyles } from 'antd-style';

const useStyles = createStyles(({}, { prefixCls }: { prefixCls: string }) => {
  return {
    [`${prefixCls}-value`]: {
      width: '100%',
      marginRight: 'calc((100% - 24px) * 0.1)',
    },
  };
});
export default useStyles;

import { createStyles } from 'antd-style';

const useStyles = createStyles(({}, { prefixCls }: { prefixCls: string }) => {
  return {
    [prefixCls]: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      wordBreak: 'break-all',
      position: 'relative',
    },
    [`${prefixCls}-tooltip`]: { position: 'absolute', opacity: '0' },
  };
});

export default useStyles;

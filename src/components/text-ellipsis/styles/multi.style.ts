import { createStyles } from 'antd-style';

const useStyles = createStyles(({}, { prefixCls }: { prefixCls: string }) => {
  return {
    [prefixCls]: {
      WebkitBoxOrient: 'vertical',
      wordBreak: 'break-all',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
    },
    [`${prefixCls}-tooltip`]: { position: 'absolute', opacity: '0' },
  };
});

export default useStyles;

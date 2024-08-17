import { createStyles } from 'antd-style';

const useStyles = createStyles(({}, { prefixCls }: { prefixCls: string }) => {
  return {
    [`${prefixCls}-multi`]: {
      WebkitBoxOrient: 'vertical',
    },
    [`${prefixCls}-tooltip`]: { position: 'absolute', opacity: '0' },
    [`${prefixCls}-single`]: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      wordBreak: 'break-all',
      position: 'relative',
    },
  };
});

export default useStyles;

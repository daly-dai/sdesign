import { createStyles } from 'antd-style';

const useStyles = createStyles(({}, { prefixCls }: { prefixCls: string }) => {
  return {
    [prefixCls]: {
      overflow: 'hidden',
      position: 'relative',
      height: '100%',
    },
    [`${prefixCls}-wrap`]: {
      overflow: 'auto',
      height: '100%',
    },
    [`${prefixCls}-hidden-default`]: {
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    [`${prefixCls}-bar`]: {
      position: 'absolute',
      right: '2px',
      bottom: '2px',
      zIndex: '1',
      borderRadius: '4px',
    },
    [`${prefixCls}-bar-vertical`]: {
      width: '6px',
      top: '2px',
    },
    [`${prefixCls}-bar-horizontal`]: {
      height: '6px',
      left: '2px',
    },
    [`${prefixCls}-thumb-vertical`]: {
      width: '100%',
    },
    [`${prefixCls}-thumb-horizontal`]: {
      height: '100%',
    },
  };
});
export default useStyles;

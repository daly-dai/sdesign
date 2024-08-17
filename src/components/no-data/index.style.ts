import { createStyles } from 'antd-style';

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
const useStyles = createStyles(({}, { prefixCls }: { prefixCls: string }) => {
  return {
    [prefixCls]: {
      width: 'calc(100% - 20px)',
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    [`${prefixCls}-title`]: {
      height: '18px',
      lineHeight: '18px',
      fontSize: '16px',
      textAlign: 'center',
      color: 'rgba(8, 16, 30, 35%)',
      marginTop: '10px',
    },
    [`${prefixCls}-img`]: {
      fontSize: '120px',
    },
    [`${prefixCls}-large`]: {
      fontSize: '300px',
    },
    [`${prefixCls}-middle`]: {
      fontSize: '220px',
    },
    [`${prefixCls}-small`]: {
      fontSize: '160px',
    },
    [`${prefixCls}-text-title`]: {
      fontSize: '14px',
    },
    [`${prefixCls}-large-title`]: {
      position: 'relative',
      bottom: '50px',
    },
    [`${prefixCls}-middle-title`]: {
      position: 'relative',
      bottom: '20px',
    },
    [`${prefixCls}-small-title`]: {
      position: 'relative',
      bottom: '20px',
    },
  };
});
export default useStyles;

import { createStyles } from 'antd-style';

const useStyles = createStyles(({}, { prefixCls }: { prefixCls: string }) => {
  return {
    [prefixCls]: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      background: '#fff',
    },
    [`${prefixCls}-img`]: { fontSize: '160px' },
    [`${prefixCls}-desc`]: {
      fontSize: '16px',
      fontWeight: '400',
      textAlign: 'center',
      color: 'rgba(8, 16, 30, 35%)',
      lineHeight: '18px',
      marginTop: '10px',
    },
  };
});
export default useStyles;

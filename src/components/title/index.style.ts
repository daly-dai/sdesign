import { createStyles } from 'antd-style';

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
const useStyles = createStyles(({}, { prefixCls }: { prefixCls: string }) => {
  // console.log(token.fontSize, 'token');

  return {
    [prefixCls]: {
      width: '100%',
      height: '30px',
      fontWeight: '600',
      textAlign: 'left',
      color: '#08101e',
      lineHeight: '30px',
    },
    [`${prefixCls}-left-title`]: {
      fontSize: '20px',
      fontWeight: '550',
    },
    [`${prefixCls}-left-bk`]: {
      width: '32px',
      height: '32px',
      backgroundColor: 'rgba(0, 0, 0, 5%)',
      borderRadius: '4px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    [`${prefixCls}-left-form-icon`]: {
      fontSize: '16px',
    },
    [`${prefixCls}-right`]: { display: 'flex' },
  };
});
export default useStyles;

import { createStyles } from 'antd-style';

const useStyles = createStyles(
  ({ css, token }, { prefixCls }: { prefixCls: string }) => {
    return {
      [prefixCls]: {
        cursor: 'pointer',
        marginBottom: '16px',
        paddingRight: '5px',
      },
      [`${prefixCls}-left`]: {
        paddingLeft: '5px',
        fontSize: '24px',
      },
      [`${prefixCls}-left-icon`]: {
        marginRight: '10px',
      },
      [`${prefixCls}-left-fileName`]: {
        fontSize: `${token.fontSize}px`,
        whiteSpace: 'nowrap',
        color: '#1677ff',
      },
      [`${prefixCls}-left-canClick`]: css`
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      `,
      [`${prefixCls}-action`]: { display: 'none' },
    };
  },
);
export default useStyles;

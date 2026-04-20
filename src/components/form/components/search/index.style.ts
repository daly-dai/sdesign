import { createStyles } from 'antd-style';

const useStyles = createStyles(
  ({ css }, { prefixCls }: { prefixCls: string }) => {
    return {
      [`${prefixCls}-grid`]: {
        display: 'grid',
        alignItems: 'center',
      },
      [`${prefixCls}-label`]: css`
        text-align: right;
        white-space: nowrap;
        line-height: 32px;
        &::after {
          content: ':';
          position: relative;
          top: -0.5px;
          margin: 0 8px 0 2px;
        }
      `,
      [`${prefixCls}-required`]: {
        color: '#ff4d4f',
        marginRight: 4,
        fontFamily: 'SimSun, sans-serif',
        fontSize: 14,
      },
      [`${prefixCls}-action`]: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '12px',
      },
    };
  },
);

export default useStyles;

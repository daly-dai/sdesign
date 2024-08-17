import { createStyles } from 'antd-style';

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
const useStyles = createStyles(({}, { prefixCls }: { prefixCls: string }) => {
  return {
    [prefixCls]: {
      margin: '8px 0',
    },
    [`${prefixCls}-label`]: {
      color: 'rgba(8, 16, 30, 55%)',
      paddingRight: '11px',
    },
    [`${prefixCls}-action`]: {
      marginLeft: '8px',
      display: 'inline-block',
    },
    [`${prefixCls}-line`]: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    [`${prefixCls}-item`]: {
      marginBottom: '8px',
    },
    [`${prefixCls}-line-item`]: {
      display: 'inline-block',
      marginRight: '24px',
      lineHeight: '35px',
      marginBottom: '0',
    },
    [`${prefixCls}-sole`]: {
      marginBottom: '0',
    },
  };
});
export default useStyles;

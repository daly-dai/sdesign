import { createStyles } from 'antd-style';

const useStyles = createStyles(() => {
  return {
    icon: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '800px',
      margin: '0 auto',
      '&-item': {
        width: '16.66%',
        padding: '20px 0',
        marginRight: '20px',
        marginBottom: '20px',
        cursor: 'pointer',
        textAlign: 'center',
        borderRadius: '8px',
        '&-name': {
          marginTop: '10px',
        },
      },
      '&-item:hover': { backgroundColor: 'rgba(22, 119, 255, 20%)' },
    },
  };
});
export default useStyles;

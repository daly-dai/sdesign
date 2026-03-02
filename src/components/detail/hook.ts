import { useId } from 'react';

/**
 * 生成 Detail 组件的唯一 ID
 * 使用 React 18+ 的 useId 替代自定义随机码生成
 */
const useDetail = () => {
  const componentId = useId();

  return {
    componentId,
  };
};

export default useDetail;

import debounce from 'lodash/debounce';
import { useCallback, useEffect, useState } from 'react';

type ScaleFnType = (width?: number) => {
  isScaleScreen: {
    transform: string;
  };
  scale: number;
};
const useScale: ScaleFnType = (width = 1920) => {
  const [isScaleScreen, setIsScaleScreen] = useState({
    transform: `scale(1)`,
  });

  const [scale, setScale] = useState(1);

  const onWidthChange = useCallback(() => {
    const { innerWidth } = window;

    setIsScaleScreen({
      transform: `scale(${innerWidth / width})`,
    });

    setScale(innerWidth / width);
  }, [window.innerWidth]);

  const debouncedOnWidthChange = debounce(onWidthChange, 200);

  useEffect(() => {
    onWidthChange();

    window.addEventListener('resize', debouncedOnWidthChange);

    return () => {
      window.removeEventListener('resize', debouncedOnWidthChange);
    };
  }, []);

  return { isScaleScreen, scale };
};

export default useScale;

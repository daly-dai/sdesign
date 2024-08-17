import debounce from 'lodash/debounce';
import { useCallback, useEffect, useState } from 'react';

import { isBrowser } from '../utils';

type ScaleFnType = (ref?: any) => {
  width: number;
};

const defaultWidth = isBrowser() ? document?.body?.clientWidth : 1024;

const useResize: ScaleFnType = () => {
  const [width, setWidth] = useState(defaultWidth);

  const onWidthChange = useCallback(() => {
    const { innerWidth } = window;

    setWidth(innerWidth);
  }, [window.innerWidth]);

  const debouncedOnWidthChange = debounce(onWidthChange, 200);

  useEffect(() => {
    onWidthChange();

    window.addEventListener('resize', debouncedOnWidthChange);

    return () => {
      window.removeEventListener('resize', debouncedOnWidthChange);
    };
  }, []);

  return { width };
};

export default useResize;

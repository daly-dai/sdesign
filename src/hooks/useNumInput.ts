import { useState } from 'react';

function useNumInput(defaultVal = ''): [string, (e: any) => void] {
  // 移除字符前面的零
  const removeZeros = (str: string) => {
    return str.replace(/^0+/, '');
  };

  const [numVal, setNumVal] = useState(defaultVal);

  const handleChange = (e: any) => {
    const { value = '' } = e.target || {};

    let val = value.replace(/[^\d]/g, '');

    setNumVal(removeZeros(val));
  };

  return [numVal, handleChange];
}

export default useNumInput;

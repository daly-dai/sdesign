import React, { FC } from 'react';

interface HighlightSpacesProps {
  text: string;
}
const HighlightSpaces: FC<HighlightSpacesProps> = ({ text }) => {
  // 将文本拆分成字符数组，并为每个空格添加样式
  const highlightedText = text.split('').map((char, index) => {
    if (char === ' ') {
      return (
        <span key={index} style={{ backgroundColor: 'yellow' }}>
          {' '}
        </span>
      );
    }
    return <span key={index}>{char}</span>;
  });

  return <span>{highlightedText}</span>;
};

export default HighlightSpaces;

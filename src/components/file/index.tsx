import SFileInstance from './instance';
import SFileList from './list';

type SFileType = typeof SFileInstance;

export type SFileDataType = SFileType & {
  List: typeof SFileList;
};

const SFile = SFileInstance as SFileDataType;

SFile.List = SFileList;

export default SFile;

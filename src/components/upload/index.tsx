import SDragger from './components/dragger';
import Picture from './components/picture';
import InternalUpload from './instance';

type InternalUploadType = typeof InternalUpload;

export type SDetailType = InternalUploadType & {
  Dragger: typeof SDragger;
  Picture: typeof Picture;
};

const SUpload = InternalUpload as SDetailType;

SUpload.Dragger = SDragger;
SUpload.Picture = Picture;

export default SUpload;

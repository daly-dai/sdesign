import {
  DocFileIcon,
  DocxFileIcon,
  JpgFileIcon,
  OtherFileIcon,
  PdfFileIcon,
  PngFileIcon,
  PptFileIcon,
  PptxFileIcon,
  RarFileIcon,
  WpsFileIcon,
  XlsFileIcon,
  XlsxFileIcon,
  ZipFileIcon,
} from '../icons';

export const convertFileDataTypeToImg = (type: string) => {
  switch (type.toUpperCase()) {
    case 'DOC':
      return DocFileIcon;
    case 'DOCX':
      return DocxFileIcon;
    case 'JPG':
      return JpgFileIcon;
    case 'PDF':
      return PdfFileIcon;
    case 'PNG':
      return PngFileIcon;
    case 'PPT':
      return PptFileIcon;
    case 'PPTX':
      return PptxFileIcon;
    case 'RAR':
      return RarFileIcon;
    case 'WPS':
      return WpsFileIcon;
    case 'XLS':
      return XlsFileIcon;
    case 'XLSX':
      return XlsxFileIcon;
    case 'ZIP':
      return ZipFileIcon;
    default:
      return OtherFileIcon;
  }
};

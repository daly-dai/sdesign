import { SFile } from '@dalydb/sdesign';
import React from 'react';

const fileData = {
  fileName: 'example.pdf',
  fileUrl: 'https://example.com/file.pdf',
};

export default () => (
  <div>
    <SFile fileData={fileData} />
  </div>
);

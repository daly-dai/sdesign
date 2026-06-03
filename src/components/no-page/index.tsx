import React from 'react';

import './index.css';

import { NoPageIcon } from '@dalydb/sdesign/icons';

const SNoPage = ({ text }: { text?: any }) => {
  return (
    <div className="sdesign-no-page">
      <NoPageIcon className="sdesign-no-page-img" />
      <p className="sdesign-no-page-desc">{text ?? ''}</p>
    </div>
  );
};

export default SNoPage;

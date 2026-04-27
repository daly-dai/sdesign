import { SButton, SConfirm } from '@dalydb/sdesign';
import React from 'react';

export default () => (
  <div>
    <SConfirm type="pop" onConfirm={() => alert('确认')}>
      <SButton actionType="delete" />
    </SConfirm>
  </div>
);

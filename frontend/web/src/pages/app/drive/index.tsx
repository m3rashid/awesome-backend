import React from 'react';

import DriveUpload from '../../../components/upload';
import PageContainer from '../../../components/pageContainer';

const Drive: React.FC = () => {
  return (
    <PageContainer header={{ title: 'Drive' }}>
      <DriveUpload />
    </PageContainer>
  );
};

export default Drive;

import React from 'react';

import PageContainer from '../../../components/pageContainer';
import DriveUpload from '../../../components/upload';

const Drive: React.FC = () => {
  return (
    <PageContainer header={{ title: 'Drive' }}>
      <DriveUpload />
    </PageContainer>
  );
};

export default Drive;

import { Typography } from 'antd';
import React from 'react';

import PageContainer from '../../components/pageContainer';

const AppHome: React.FC = () => {
  return (
    <PageContainer header={{ title: 'App Home' }}>
      <Typography.Text>AppHome</Typography.Text>
    </PageContainer>
  );
};

export default AppHome;

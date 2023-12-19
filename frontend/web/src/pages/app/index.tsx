import { Text } from '@fluentui/react-components';
import React from 'react';

import PageContainer from '../../components/pageContainer';

const AppHome: React.FC = () => {
  return (
    <PageContainer header={{ title: 'App Home' }}>
      <Text>AppHome</Text>
    </PageContainer>
  );
};

export default AppHome;

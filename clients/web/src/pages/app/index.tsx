import { Typography } from 'antd';
import React from 'react';

import AuthWrapper from '../../components/authWrapper';

const AppHome: React.FC = () => {
  return (
    <AuthWrapper>
      <Typography.Text>AppHome</Typography.Text>
    </AuthWrapper>
  );
};

export default AppHome;

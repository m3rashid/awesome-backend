import { useAuthValue } from '@awesome/shared/atoms/auth';
import React from 'react';

import PageContainer from '../../../components/pageContainer';

const ProjectUserDashboard: React.FC = () => {
  const auth = useAuthValue();

  return (
    <PageContainer
      header={{ title: `Hello ${auth?.user.name}` }}
    ></PageContainer>
  );
};

export default ProjectUserDashboard;

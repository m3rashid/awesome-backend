import React from 'react';

import { useAuthValue } from '@awesome/shared/atoms/auth';

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

import { Tabs } from 'antd';
import React, { lazy } from 'react';
import { StringParam, useQueryParams } from 'use-query-params';

import AuthWrapper from '../../../components/authWrapper';
import PageContainer from '../../../components/pageContainer';

const Users = lazy(() => import('./users'));
const UserGroups = lazy(() => import('./userGroups'));
const Workspaces = lazy(() => import('./workspaces'));

type IamTabs = 'users' | 'user-groups' | 'workspaces';

const Iam: React.FC = () => {
  const [queryParams, setQueryParams] = useQueryParams({
    tab: StringParam,
  });

  return (
    <AuthWrapper>
      <PageContainer>
        <Tabs
          defaultActiveKey={queryParams.tab || 'users'}
          onChange={(key) => setQueryParams({ tab: key as IamTabs })}
          items={[
            {
              key: 'users',
              label: 'Users',
              children: <Users />,
            },
            {
              key: 'user-groups',
              label: 'User Groups',
              children: <UserGroups />,
            },
            {
              key: 'workspaces',
              label: 'Workspaces',
              children: <Workspaces />,
            },
          ]}
        />
      </PageContainer>
    </AuthWrapper>
  );
};

export default Iam;

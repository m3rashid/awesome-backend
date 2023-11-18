import appConfig from '@awesome/shared/constants/appConfig';
import React from 'react';

import AntdProvider from './atoms/antdProvider';

const AppRoutes = React.lazy(() => import('../routes'));

const Bootstrap: React.FC = () => {
  return (
    <AntdProvider>
      <div
        className='w-screen h-screen'
        style={{ backgroundColor: appConfig.colors.background }}
      >
        <AppRoutes />
      </div>
    </AntdProvider>
  );
};

export default Bootstrap;

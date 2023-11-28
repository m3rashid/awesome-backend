import React from 'react';

import AntdProvider from '../atoms/antdProvider';

const AppRoutes = React.lazy(() => import('./routes'));

const Init: React.FC = () => {
  return (
    <AntdProvider>
      <div className='w-screen h-screen'>
        <AppRoutes />
      </div>
    </AntdProvider>
  );
};

export default Init;

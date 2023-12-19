import React from 'react';

import FluentUiProvider from './fluentUiProvider';

const AppRoutes = React.lazy(() => import('../routes'));

const Init: React.FC = () => {
  return (
    <FluentUiProvider>
      <div className='w-screen h-screen'>
        <AppRoutes />
      </div>
    </FluentUiProvider>
  );
};

export default Init;

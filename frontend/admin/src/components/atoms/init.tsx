import React from 'react';

import FluentUiProvider from '@awesome/shared/components/fluentUiProvider';

const AppRoutes = React.lazy(() => import('../routes'));

const Init: React.FC = () => {
  return (
    <FluentUiProvider>
      <div className='w-screen h-screen'>
        <div className='w-screen h-screen'>
          <AppRoutes />
        </div>
      </div>
    </FluentUiProvider>
  );
};

export default Init;

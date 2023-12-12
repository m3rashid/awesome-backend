import React from 'react';

import FluentUiProvider from '../atoms/fluentUiProvider';
import useWebSocketConnection from '../websockets/useConnection';

const AppRoutes = React.lazy(() => import('./routes'));

const Init: React.FC = () => {
  const { _ref } = useWebSocketConnection();

  return (
    <FluentUiProvider>
      <div className='w-screen h-screen' ref={_ref}>
        <AppRoutes />
      </div>
    </FluentUiProvider>
  );
};

export default Init;

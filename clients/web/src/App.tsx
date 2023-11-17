import React, { Suspense } from 'react';

import Loader from './components/atoms/loader';
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <AppRoutes />
    </Suspense>
  );
};

export default App;

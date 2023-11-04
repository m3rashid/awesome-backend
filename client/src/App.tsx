import React, { Suspense } from 'react';

import Loader from './components/atoms/loader';

const App: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <div>App</div>
    </Suspense>
  );
};

export default App;

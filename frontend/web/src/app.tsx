import { RecoilRoot } from 'recoil';
import React, { Suspense } from 'react';

import useInit from '@awesome/shared/hooks/init';
import { authAtom } from '@awesome/shared/atoms/auth';
import Loader from '@awesome/shared/components/loader';

const Init = React.lazy(() => import('./components/init'));

const App: React.FC = () => {
  const { initRes } = useInit({ authType: 'tenant' });

  if (initRes.loading) return <Loader />;
  return (
    <Suspense fallback={<Loader />}>
      <RecoilRoot
        initializeState={({ set }) => {
          set(authAtom, initRes.data ? initRes.data : null);
        }}
      >
        <Init />
      </RecoilRoot>
    </Suspense>
  );
};

export default App;

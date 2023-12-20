import { authAtom } from '@awesome/shared/atoms/auth';
import useInit from '@awesome/shared-web/hooks/init';
import Loader from '@awesome/shared-web/components/loader';
import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';

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

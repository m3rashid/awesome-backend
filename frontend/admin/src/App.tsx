import useInit from '@awesome/shared-web/hooks/init';
import { lazy, Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import Loader from '@awesome/shared-web/components/loader';
import { authAtom } from '@awesome/shared/atoms/auth';

const Init = lazy(() => import('./components/atoms/init'));

function App() {
  const { initRes } = useInit({ authType: 'host' });

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
}

export default App;

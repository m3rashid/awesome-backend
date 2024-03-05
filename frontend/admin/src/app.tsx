import { RecoilRoot } from 'recoil';
import { lazy, Suspense } from 'react';
import useInit from '@awesome/shared/hooks/init';
import { authAtom } from '@awesome/shared/atoms/auth';
import Loader from '@awesome/shared/components/loader';

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

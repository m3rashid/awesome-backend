import { authAtom } from '@awesome/shared/atoms/auth';
import { InitResponse } from '@awesome/shared/types/api/auth';
import React, { Suspense, useCallback, useEffect } from 'react';
import { RecoilRoot } from 'recoil';

import Loader from './components/atoms/loader';
import { service } from './helpers/service';

const Init = React.lazy(() => import('./components/init'));

const App: React.FC = () => {
  const initService = service<InitResponse>('/api/auth', { method: 'POST' });
  const [initRes, setInitRes] = React.useState<{
    loading: boolean;
    data: InitResponse | null;
  }>({ loading: true, data: null });

  const init = useCallback(async () => {
    try {
      const res = await initService();
      setInitRes({ loading: false, data: res.data });
    } catch (error) {
      console.log(error);
      setInitRes({ loading: false, data: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

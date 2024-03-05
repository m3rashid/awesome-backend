import { useState, useEffect, useCallback } from 'react';

import { service } from '../utils/service';

export type UseInitProps = {
  authType: 'host' | 'tenant';
};

const useInit = ({ authType }: UseInitProps) => {
  const initService = service<InitResponse>(
    authType === 'tenant' ? '/api/auth/init' : '/api/host/init',
    { method: 'POST' }
  );
  const [initRes, setInitRes] = useState<{
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

  return {
    initRes,
  };
};

export default useInit;

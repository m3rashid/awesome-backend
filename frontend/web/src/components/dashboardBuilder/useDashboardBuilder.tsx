import { useEffect } from 'react';

// import { atom } from 'recoil';
import { service } from '@awesome/shared/utils/service';
// import { DashboardBuilder, dashboardBuilderDefault } from './constants';

// const dashboardBuilderAtom = atom<DashboardBuilder>({
//   key: 'dashboardBuilder',
//   default: dashboardBuilderDefault,
// });

const useDashboardBuilder = () => {
  const getModelsService = service('/api/dashboard/models', { method: 'POST' });

  useEffect(() => {
    getModelsService().then((res) => {
      console.log(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useDashboardBuilder;

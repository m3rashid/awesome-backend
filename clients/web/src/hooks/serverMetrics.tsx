import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { service } from '../helpers/service';

type DataItem = {
  time: string;
  value: number;
};

export type Metrics = {
  cpu: DataItem[];
  ram: DataItem[];
  total_ram: number;
  load_avg: DataItem[];
  conns: DataItem[];
};

const useMetrics = () => {
  const [error, seError] = useState(false);

  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const getMetricsService = service('/metrics');

  const refreshData = async () => {
    try {
      const { data } = await getMetricsService();
      const time = dayjs().format('HH:mm:ss');
      setMetrics((prev) => ({
        cpu: [...(prev?.cpu || []), { time, value: data.os.cpu }],
        ram: [
          ...(prev?.ram || [] || []),
          {
            time,
            value: ((data.os.ram * 100) / data.os.total_ram).toFixed(
              0
            ) as unknown as number,
          },
        ],
        total_ram: prev?.total_ram ?? data.os.total_ram / 1e9,
        load_avg: [
          ...(prev?.load_avg || []),
          { time, value: data.os.load_avg },
        ],
        conns: [...(prev?.conns || []), { time, value: data.os.conns }],
      }));
    } catch (error) {
      seError(true);
    }
  };

  useEffect(() => {
    if (error) return;
    const timeout = setInterval(() => {
      refreshData();
    }, 1000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    error,
    metrics,
  };
};

export default useMetrics;

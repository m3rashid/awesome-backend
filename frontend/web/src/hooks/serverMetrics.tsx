import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { service } from '@awesome/shared/utils/service';

export interface Pid {
  cpu: number;
  ram: number;
  conns: number;
}

export interface Os {
  cpu: number;
  ram: number;
  total_ram: number;
  load_avg: number;
  conns: number;
}

type DataItem = {
  x: Date; // time
  y: number; // value
  xAxisCalloutData?: string;
  yAxisCalloutData?: string;
};

export type Metrics = {
  cpu: DataItem[];
  ram: DataItem[];
  total_ram: number;
  load_avg: DataItem[];
  conns: DataItem[];
};

const initialMetrics: Metrics = {
  cpu: [],
  ram: [],
  total_ram: 0,
  load_avg: [],
  conns: [],
};

const useMetrics = () => {
  const [error, seError] = useState(false);

  const [metrics, setMetrics] = useState<Metrics>(initialMetrics);
  const getMetricsService = service<{ pid: Pid; os: Os }>('/metrics', {
    method: 'GET',
  });

  const refreshData = async () => {
    try {
      const { data } = await getMetricsService();
      const time = dayjs().toDate();

      setMetrics((prev) => ({
        total_ram: data.os.total_ram / 1e9,
        cpu: [...prev.cpu, { x: time, y: data.os.cpu }],
        ram: [
          ...prev.ram,
          {
            x: time,
            y: ((data.os.ram * 100) / data.os.total_ram).toFixed(
              0
            ) as unknown as number,
          },
        ],
        load_avg: [...prev.load_avg, { x: time, y: data.os.load_avg }],
        conns: [...prev.conns, { x: time, y: data.os.conns }],
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

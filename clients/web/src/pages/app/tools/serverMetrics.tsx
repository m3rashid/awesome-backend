import { Area, AreaConfig } from '@ant-design/charts';
import { Card, Skeleton, Typography } from 'antd';
import React from 'react';

import WidgetContainer from '../../../components/dashboardBuilder/widgetContainer';
import PageContainer from '../../../components/pageContainer';
import useMetrics from '../../../hooks/serverMetrics';

const ServerMetrics: React.FC = () => {
  const { error, metrics } = useMetrics();

  const defaultConfig: Omit<AreaConfig, 'data'> = {
    xField: 'time',
    yField: 'value',
    animation: false,
  };

  const className = 'w-full flex-grow max-w-xl min-w-fit';

  return (
    <PageContainer
      header={{
        title: 'Server Metrics',
        extra: [
          <div key='m1' className='flex items-center justify-center gap-2'>
            <div
              key='m2'
              className={`h-2 w-2 rounded-full ${
                error || !metrics ? 'bg-red-500 ' : 'animate-ping bg-green-500'
              }`}
            />
            <Typography.Text key='m3'>
              {error || !metrics ? 'Server not responding' : 'Server online'}
            </Typography.Text>
          </div>,
        ],
      }}
    >
      {error ? (
        <div className='flex min-w-[500px] items-center justify-center'>
          <Card className={className}>
            <Typography.Title level={3}>Error loading metrics</Typography.Title>
          </Card>
        </div>
      ) : !metrics ? (
        <div className='flex gap-4 items-center flex-wrap'>
          {[1, 2, 3, 4].map((_, i) => (
            <Card key={i} className={className}>
              <Skeleton active />
            </Card>
          ))}
        </div>
      ) : (
        <div className='flex gap-4 items-center flex-wrap'>
          <WidgetContainer
            title='CPU'
            subtitle='CPU usage (in %)'
            {...{ className }}
          >
            <Area
              data={metrics.cpu}
              {...{
                ...defaultConfig,
                yAxis: { maxLimit: 100, minLimit: 0 },
              }}
            />
          </WidgetContainer>

          <WidgetContainer
            title={`RAM (${metrics.total_ram.toFixed(2)} GB)`}
            subtitle='RAM usage (in %)'
            {...{ className }}
          >
            <Area
              data={metrics.ram}
              {...{
                ...defaultConfig,
                yAxis: { maxLimit: 100, minLimit: 0 },
              }}
            />
          </WidgetContainer>

          <WidgetContainer
            title='Load Average'
            subtitle='Average load on the server'
            {...{ className }}
          >
            <Area data={metrics.load_avg} {...defaultConfig} />
          </WidgetContainer>

          {/* <WidgetContainer
            title='Connections'
            subtitle='Number of Active connections'
            {...{ className }}
          >
            <Area data={metrics.conns} {...defaultConfig} />
          </WidgetContainer> */}
        </div>
      )}
    </PageContainer>
  );
};

export default ServerMetrics;

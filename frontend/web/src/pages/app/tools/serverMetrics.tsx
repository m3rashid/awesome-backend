import React from 'react';
import { AreaChart } from '@fluentui/react-charting';
import { Card, Skeleton, SkeletonItem, Text } from '@fluentui/react-components';

import useMetrics from '../../../hooks/serverMetrics';
import PageContainer from '../../../components/pageContainer';
import WidgetContainer from '../../../components/dashboardBuilder/widgetContainer';

const ServerMetrics: React.FC = () => {
  const { error, metrics } = useMetrics();

  const defaultAreaChartConfig = {
    xAxisTitle: 'time',
    enableReflow: true,
    enablePerfOptimization: true,
    culture: window.navigator.language,
  };

  const className = 'w-full flex-grow max-w-xl min-w-fit';

  const NoMetric = (
    <Skeleton style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <SkeletonItem style={{ height: 40 }} />
      <SkeletonItem style={{ height: 40 }} />
      <SkeletonItem style={{ height: 40 }} />
    </Skeleton>
  );

  return (
    <PageContainer
      header={{
        title: 'Server Metrics',
        extra: (
          <div key='m1' className='flex items-center justify-center gap-2'>
            <div
              key='m2'
              className={`h-2 w-2 rounded-full ${
                error || !metrics ? 'bg-red-500 ' : 'animate-ping bg-green-500'
              }`}
            />
            <Text key='m3'>
              {error || !metrics ? 'Server not responding' : 'Server online'}
            </Text>
          </div>
        ),
      }}
    >
      {error ? (
        <div className='flex min-w-[500px] items-center justify-center'>
          <Card className={className}>
            <Text as='h2' size={400}>
              Error loading metrics
            </Text>
          </Card>
        </div>
      ) : (
        <div className='flex gap-4 items-center flex-wrap'>
          <WidgetContainer>
            {metrics.cpu.length > 0 ? (
              <AreaChart
                data={{
                  chartTitle: 'CPU',
                  lineChartData: [{ legend: 'CPU Usage', data: metrics.cpu }],
                }}
                yAxisTitle='CPU usage (in %)'
                {...defaultAreaChartConfig}
              />
            ) : (
              NoMetric
            )}
          </WidgetContainer>

          <WidgetContainer>
            {metrics.ram.length > 0 ? (
              <AreaChart
                data={{
                  chartTitle: `RAM (${metrics.total_ram.toFixed(2)} GB)`,
                  lineChartData: [{ legend: 'RAM usage', data: metrics.ram }],
                }}
                yAxisTitle='RAM usage (in %)'
                {...defaultAreaChartConfig}
              />
            ) : (
              NoMetric
            )}
          </WidgetContainer>

          <WidgetContainer>
            {metrics.load_avg.length > 0 ? (
              <AreaChart
                data={{
                  chartTitle: 'Load Average',
                  lineChartData: [
                    { legend: 'Average server load', data: metrics.load_avg },
                  ],
                }}
                yAxisTitle='Average load on the server'
                {...defaultAreaChartConfig}
              />
            ) : (
              NoMetric
            )}
          </WidgetContainer>
        </div>
      )}
    </PageContainer>
  );
};

export default ServerMetrics;

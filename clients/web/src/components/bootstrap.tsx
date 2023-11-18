import { theme } from 'antd';
import React from 'react';

import { useAppThemeConfigValue } from '../hooks/theme';
import AntdProvider from './atoms/antdProvider';

const AppRoutes = React.lazy(() => import('../routes'));

const Bootstrap: React.FC = () => {
  const appThemeConfig = useAppThemeConfigValue();
  const {
    token: { colorBgLayout },
  } = theme.useToken();

  return (
    <AntdProvider
      theme={{}}
      isDark={appThemeConfig.isDark}
      isCompact={appThemeConfig.isCompact}
    >
      <div
        className='w-screen h-screen'
        style={{ backgroundColor: colorBgLayout }}
      >
        <AppRoutes />
      </div>
    </AntdProvider>
  );
};

export default Bootstrap;

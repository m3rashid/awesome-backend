import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { useAppThemeConfigValue } from '../hooks/theme';
import AntdProvider from './atoms/antdProvider';
import Header from './header';

export type RootContainerProps = React.PropsWithChildren & {
  //
};

const RootContainer: React.FC<RootContainerProps> = ({ children }) => {
  const appThemeConfig = useAppThemeConfigValue();

  return (
    <BrowserRouter>
      <AntdProvider
        theme={{}}
        isDark={appThemeConfig.isDark}
        isCompact={appThemeConfig.isCompact}
      >
        <Header />
        {children}
      </AntdProvider>
    </BrowserRouter>
  );
};

export default RootContainer;

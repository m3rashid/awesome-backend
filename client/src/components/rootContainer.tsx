import {
  FluentProvider,
  teamsDarkTheme,
  teamsLightTheme,
} from '@fluentui/react-components';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { useThemeValue } from '../hooks/theme';
import Header from './header';

export type RootContainerProps = React.PropsWithChildren & {
  //
};

const RootContainer: React.FC<RootContainerProps> = ({ children }) => {
  const theme = useThemeValue();

  return (
    <FluentProvider
      theme={theme === 'light' ? teamsLightTheme : teamsDarkTheme}
    >
      <BrowserRouter>
        <Header />
        {children}
      </BrowserRouter>
    </FluentProvider>
  );
};

export default RootContainer;

import React from 'react';
import {
  FluentProvider,
  teamsLightTheme,
  teamsDarkTheme,
} from '@fluentui/react-components';
import { BrowserRouter } from 'react-router-dom';

import { useThemeValue } from '../hooks/theme';

export type RootContainerProps = React.PropsWithChildren & {
  //
};

const RootContainer: React.FC<RootContainerProps> = ({ children }) => {
  const theme = useThemeValue();

  return (
    <FluentProvider
      theme={theme === 'light' ? teamsLightTheme : teamsDarkTheme}
    >
      <BrowserRouter>{children}</BrowserRouter>
    </FluentProvider>
  );
};

export default RootContainer;

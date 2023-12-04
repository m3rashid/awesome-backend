import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import React from 'react';

const FluentUiProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <FluentProvider theme={webLightTheme}>{children}</FluentProvider>;
};

export default FluentUiProvider;

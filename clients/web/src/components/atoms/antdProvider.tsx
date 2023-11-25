import { StyleProvider } from '@ant-design/cssinjs';
import appConfig from '@awesome/shared/constants/appConfig';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { ConfigProviderProps } from 'antd/es/config-provider';
import React from 'react';

interface Props extends ConfigProviderProps {}

const AntdProvider: React.FC<Props> = ({ children, theme, ...props }) => (
  <ConfigProvider
    theme={{
      ...theme,
      algorithm: antdTheme.compactAlgorithm,
      token: {
        ...(theme?.token || {}),
        fontFamily: 'Inter, sans-serif',
        colorPrimary: appConfig.colors.primary,
      },
      components: {
        Typography: {
          margin: 0,
          padding: 0,
          colorLink: appConfig.colors.primary,
        },
        Button: {
          colorLink: appConfig.colors.primary,
        },
      },
    }}
    {...props}
  >
    <StyleProvider hashPriority='high'>{children}</StyleProvider>
  </ConfigProvider>
);

export default AntdProvider;

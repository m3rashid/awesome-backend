import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { ConfigProviderProps } from 'antd/es/config-provider';
import React from 'react';

interface Props extends ConfigProviderProps {
  isDark?: boolean;
  isCompact?: boolean;
}
const AntdProvider: React.FC<Props> = ({
  isDark,
  isCompact,
  children,
  theme,
  ...props
}) => (
  <ConfigProvider
    theme={{
      ...theme,
      ...(theme && theme.token && theme.token.colorPrimary
        ? {
            components: {
              Typography: {
                colorLink: theme.token.colorPrimary,
              },
              Button: {
                colorLink: theme.token.colorPrimary,
              },
            },
          }
        : {}),
      algorithm: isCompact
        ? antdTheme.compactAlgorithm
        : isDark
        ? antdTheme.darkAlgorithm
        : antdTheme.defaultAlgorithm,
    }}
    {...props}
  >
    <StyleProvider hashPriority='high'>{children}</StyleProvider>
  </ConfigProvider>
);

export default AntdProvider;

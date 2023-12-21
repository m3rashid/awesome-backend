import { Text } from '@fluentui/react-components';
import React, { ReactNode } from 'react';

import AuthWrapper, { AuthWrapperProps } from './authWrapper';

export interface PageContainerProps {
  header?: {
    title?: string;
    extra?: JSX.Element;
  };
  noHeader?: boolean;
  children?: ReactNode;
  Container: AuthWrapperProps['Container'];
}

const PageContainer: React.FC<PageContainerProps> = ({
  header,
  noHeader,
  children,
  Container,
}) => {
  return (
    <AuthWrapper Container={Container}>
      <div className=''>
        {header && !noHeader && (
          <div
            // className='pb-2 flex justify-between items-center'
            style={{
              paddingBottom: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {header.title ? (
              <Text as='h1' size={500}>
                {header.title}
              </Text>
            ) : null}
            {header.extra ?? null}
          </div>
        )}
        {children}
      </div>
    </AuthWrapper>
  );
};

export default PageContainer;

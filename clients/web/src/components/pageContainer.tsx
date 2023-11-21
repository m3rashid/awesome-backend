import { Typography } from 'antd';
import { BreadcrumbProps } from 'antd/es/breadcrumb/Breadcrumb';
import React, { ReactNode } from 'react';

import AuthWrapper from './authWrapper';

export interface PageContainerProps {
  loginURL?: string;
  anonymous?: boolean;
  header?: {
    title?: string;
    breadCrumb?: BreadcrumbProps;
    extra?: JSX.Element[];
  };
  noHeader?: boolean;
  noPadding?: boolean;
  children?: ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({
  header,
  noHeader,
  children,
}) => {
  return (
    <AuthWrapper>
      <div className=''>
        {header && !noHeader && (
          <div className='pb-0 flex justify-between items-center'>
            {header.title && (
              <Typography.Title
                level={3}
                type='secondary'
                className='m-0 p-0 my-1 mb-2'
              >
                {header.title}
              </Typography.Title>
            )}
            {header.extra ? <div>{header.extra}</div> : null}
          </div>
        )}
        {children}
      </div>
    </AuthWrapper>
  );
};

export default PageContainer;

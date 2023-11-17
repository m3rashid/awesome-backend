import { Typography } from 'antd';
import { BreadcrumbProps } from 'antd/es/breadcrumb/Breadcrumb';
import React, { ReactNode } from 'react';
// import { useNavigate } from 'react-router-dom';

// import { useAuthValue } from '../hooks/auth';

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
  noPadding,
  // loginURL = '/auth/login',
  // anonymous = false,
}) => {
  // const navigate = useNavigate();
  // const { user } = useAuthValue();

  // useEffect(() => {
  //   if (!anonymous && !user) {
  //     navigate(loginURL);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [user]);

  // if (!anonymous && !user) {
  //   return (
  //     <div className='all-center h-screen'>
  //       <Spin size='large' />
  //     </div>
  //   );
  // }

  return (
    <div className={`${!noPadding ? 'p-4' : ''} h-screen overflow-x-hidden`}>
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
  );
};

export default PageContainer;

import appConfig from '@awesome/shared/constants/appConfig';
import { Image, Layout, theme as theme, Typography } from 'antd';
import React from 'react';

import AppSwitch from './appSwitch';
import Search from './search';
import UserActions from './userActions';

const Header: React.FC = () => {
  const { token } = theme.useToken();

  return (
    <Layout.Header
      style={{
        height: 40,
        width: '100%',
        paddingLeft: 8,
        display: 'flex',
        paddingRight: 8,
        marginBottom: 40,
        position: 'absolute',
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-between',
      }}
    >
      <div className='h-full mb-0 flex items-center'>
        <Image src='/icons/favicon.ico' height={30} width={30} />

        <div className='ml-2 flex flex-col'>
          <Typography.Text
            strong
            style={{
              padding: 0,
              marginTop: -2,
              marginBottom: -2,
              fontSize: '0.9rem',
              color: token.colorPrimary,
            }}
          >
            {appConfig.name}
          </Typography.Text>

          <Typography.Text
            type='secondary'
            style={{
              padding: 0,
              marginTop: -5,
              marginBottom: -2,
              fontSize: '0.7rem',
            }}
          >
            {appConfig.tagline}
          </Typography.Text>
        </div>
      </div>

      <Search />

      <div className='flex items-center justify-center gap-3'>
        <AppSwitch />
        <UserActions />
      </div>
    </Layout.Header>
  );
};

export default Header;

import appConfig from '@awesome/shared/constants/appConfig';
import { Image, Text } from '@fluentui/react-components';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type CommonHeaderProps = React.PropsWithChildren & { type: 'tenant' | 'host' };

const CommonHeader: React.FC<CommonHeaderProps> = ({ type, children }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: 40,
        width: '100%',
        paddingLeft: 8,
        display: 'flex',
        paddingRight: 8,
        marginBottom: 40,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #eaeaea',
      }}
    >
      <div
        onClick={() => navigate(type === 'tenant' ? '/app' : '/')}
        className='h-full mb-0 flex gap-1 items-center cursor-pointer'
      >
        <Image src='/favicon.ico' height={30} width={30} />

        <div className='flex flex-col'>
          <Text
            as='strong'
            style={{
              padding: 0,
              marginTop: -2,
              marginBottom: -2,
              fontSize: '0.9rem',
            }}
          >
            {appConfig.name}
          </Text>

          <Text
            style={{
              padding: 0,
              marginTop: -5,
              marginBottom: -2,
              fontSize: '0.7rem',
            }}
          >
            {appConfig.tagline}
          </Text>
        </div>
      </div>
      {children}
    </div>
  );
};

export default CommonHeader;

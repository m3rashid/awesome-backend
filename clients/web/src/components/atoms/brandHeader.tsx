import appConfig from '@awesome/shared/constants/appConfig';
import { Image, Typography } from 'antd';
import { FC } from 'react';
import { Link } from 'react-router-dom';

type BrandHeaderProps = {
  inline?: boolean;
  onlyLogo?: boolean;
  url?: string;
};

const BrandHeader: FC<BrandHeaderProps> = ({
  inline = false,
  onlyLogo = false,
  url = '/',
}) => {
  if (!inline) {
    return (
      <div className='text-center my-4'>
        <Link to={url}>
          <Image
            preview={false}
            height={64}
            width={64}
            src='/icons/favicon.png'
            alt={`${appConfig.name} Logo`}
            className='mr-2 cursor-pointer'
          />
        </Link>

        {!onlyLogo && (
          <>
            <Typography.Title level={3} style={{ margin: 0 }}>
              {appConfig.name}
            </Typography.Title>

            <Typography.Title level={5} type='secondary' style={{ margin: 0 }}>
              {appConfig.tagline}
            </Typography.Title>
          </>
        )}
      </div>
    );
  }

  return (
    <div className='flex gap-x-2'>
      <Link to={url}>
        <Image
          preview={false}
          height={64}
          width={64}
          src='/images/favicon.png'
          alt={`${appConfig.name} Logo`}
          className='mr-2 cursor-pointer'
        />
      </Link>

      {!onlyLogo && (
        <div>
          <Typography.Text strong>{appConfig.name}</Typography.Text>
          <br />
          <Typography.Text type='secondary'>
            {appConfig.tagline}
          </Typography.Text>
        </div>
      )}
    </div>
  );
};

export default BrandHeader;

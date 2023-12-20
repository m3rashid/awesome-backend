import appConfig from '@awesome/shared/constants/appConfig';
import { Image, Subtitle2, Text } from '@fluentui/react-components';
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
      <div className='flex items-center justify-center text-center my-4 bg-red-500'>
        <Link to={url}>
          <Image
            width={64}
            height={64}
            src='/icons/favicon.png'
            alt={`${appConfig.name} Logo`}
            className='mr-2 cursor-pointer'
          />
        </Link>

        {!onlyLogo && (
          <div className='flex flex-col '>
            <Subtitle2 as='h2'>{appConfig.name}</Subtitle2>
            <Text as='h3'>{appConfig.tagline}</Text>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className='flex gap-x-2'>
      <Link to={url}>
        <Image
          height={64}
          width={64}
          src='/images/favicon.png'
          alt={`${appConfig.name} Logo`}
          className='mr-2 cursor-pointer'
        />
      </Link>

      {!onlyLogo && (
        <div>
          <Text as='b'>{appConfig.name}</Text>
          <br />
          <Text>{appConfig.tagline}</Text>
        </div>
      )}
    </div>
  );
};

export default BrandHeader;

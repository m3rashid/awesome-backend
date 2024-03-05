import appConfig from '../constants/appConfig';
import { Image, Subtitle2, Text } from '@fluentui/react-components';

import React, { FC } from 'react';
import { Link } from 'react-router-dom';

type BrandHeaderProps = {
  url?: string;
  onlyLogo?: boolean;
};

const BrandHeader: FC<BrandHeaderProps> = ({ onlyLogo = false, url = '/' }) => {
  return (
    <div className='flex items-center justify-center text-center my-4 gap-2'>
      <Link to={url}>
        <Image
          width={64}
          height={64}
          src='/icons/favicon.png'
          alt={`${appConfig.name} Logo`}
          className='cursor-pointer'
        />
      </Link>

      {onlyLogo ? null : (
        <div className='flex flex-col'>
          <Subtitle2 as='h2'>{appConfig.name}</Subtitle2>
          <Text as='h3'>{appConfig.tagline}</Text>
        </div>
      )}
    </div>
  );
};

export default BrandHeader;

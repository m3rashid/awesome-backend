import React from 'react';

import Header from './header';
import SecondaryHeader from './header/secondary';

const RootContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className='w-screen'>
      <Header />
      <div className='pt-[40px]'>
        <SecondaryHeader />
      </div>

      <div className='p-2 sm:p-4'>{children}</div>
    </div>
  );
};

export default RootContainer;

import React from 'react';

import Header from './header';

const RootContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className='w-screen'>
      <Header />
      <div className='p-2 pt-[40px]'>{children}</div>
    </div>
  );
};

export default RootContainer;

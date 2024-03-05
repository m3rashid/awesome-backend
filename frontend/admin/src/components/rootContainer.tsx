import CommonHeader from '@awesome/shared/components/commonHeader';
import { Avatar } from '@fluentui/react-components';
import React, { PropsWithChildren } from 'react';

const RootContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='w-screen'>
      {/* <Header /> */}
      <CommonHeader type='host'>
        <div className='flex items-center justify-center gap-3 mr-2'>
          {/* <UserActions /> */}
          <Avatar />
        </div>
      </CommonHeader>
      <div className='pt-[40px]'>
        <div className='h-[30px] bg-blue-100 flex items-center gap-2'>
          Hello
        </div>
      </div>

      <div className='p-2 sm:p-4'>{children}</div>
    </div>
  );
};

export default RootContainer;

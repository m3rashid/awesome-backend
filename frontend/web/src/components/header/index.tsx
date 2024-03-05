import React from 'react';

import CommonHeader from '@awesome/shared/components/commonHeader';
import UserActions from './userActions';
import Search from './search';

const Header: React.FC = () => {
  return (
    <CommonHeader type='tenant'>
      <Search />
      <div className='flex items-center justify-center gap-3 mr-2'>
        <UserActions />
      </div>
    </CommonHeader>
  );
};

export default Header;

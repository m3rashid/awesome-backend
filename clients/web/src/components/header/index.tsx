import React from 'react';

import AppSwitch from './appSwitch';
import CommonHeader from './commonHeader';
import Search from './search';
import UserActions from './userActions';

const Header: React.FC = () => {
  return (
    <CommonHeader>
      <div className='flex items-center justify-center gap-3'>
        <Search />
        <AppSwitch />
      </div>

      <div className='flex items-center justify-center gap-3 mr-2'>
        <UserActions />
      </div>
    </CommonHeader>
  );
};

export default Header;

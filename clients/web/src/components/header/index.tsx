import React from 'react';

import CommonHeader from './commonHeader';
import Search from './search';
import UserActions from './userActions';

const Header: React.FC = () => {
  return (
    <CommonHeader>
      <Search />
      <div className='flex items-center justify-center gap-3 mr-2'>
        <UserActions />
      </div>
    </CommonHeader>
  );
};

export default Header;

import React from 'react';

import CommonHeader from '@awesome/shared-web/components/commonHeader';
import Search from './search';
import UserActions from './userActions';

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

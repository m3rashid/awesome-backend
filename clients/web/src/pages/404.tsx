import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className='all-center h-screen'>
      <Result
        status='404'
        title='Oops, we cant find the page'
        subTitle={location.pathname}
        extra={
          <Link to='/'>
            <Button type='link'>Go to Home</Button>
          </Link>
        }
      />
    </div>
  );
};

export default NotFound;
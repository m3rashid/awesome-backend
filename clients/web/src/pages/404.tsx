import { Button } from '@fluentui/react-components';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className='all-center h-screen'>
      Not Found
      <Link to='/'>
        <Button appearance='subtle'>Go to Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;

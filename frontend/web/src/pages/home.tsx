import { Button, Text } from '@fluentui/react-components';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Footer from '../components/footer';
import CommonHeader from '@awesome/shared/components/commonHeader';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='w-screen'>
      <CommonHeader type='tenant'>
        <Button appearance='subtle' onClick={() => navigate('/app')}>
          Go to App
        </Button>
      </CommonHeader>

      <div className='p-2 sm:p-4 pt-[40px] sm:pt-[50px]'>
        <Text>Home</Text>
      </div>

      <Footer />
    </div>
  );
};

export default Home;

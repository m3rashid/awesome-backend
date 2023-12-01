import { Button, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Footer from '../components/footer';
import CommonHeader from '../components/header/commonHeader';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='w-screen'>
      <CommonHeader>
        <Button type='link' onClick={() => navigate('/app')}>
          Go to App
        </Button>
      </CommonHeader>

      <div className='p-2 sm:p-4 pt-[40px] sm:pt-[50px]'>
        <Typography.Text>Home</Typography.Text>
      </div>

      <Footer />
    </div>
  );
};

export default Home;

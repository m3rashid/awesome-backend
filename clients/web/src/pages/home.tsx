import { Button, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className=''>
      <Typography.Text>Home</Typography.Text>
      <Button onClick={() => navigate('/app')}>Go to App</Button>
    </div>
  );
};

export default Home;

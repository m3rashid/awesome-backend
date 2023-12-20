import React from 'react';

import LoginRegisterForm from '@awesome/shared-web/components/authForm';

const Login: React.FC = () => {
  return <LoginRegisterForm formType='login' authType='host' />;
};

export default Login;

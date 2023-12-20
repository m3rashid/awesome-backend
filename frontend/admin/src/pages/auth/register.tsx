import React from 'react';

import LoginRegisterForm from '@awesome/shared-web/components/authForm';

const Register: React.FC = () => {
  return <LoginRegisterForm formType='register' authType='host' />;
};

export default Register;

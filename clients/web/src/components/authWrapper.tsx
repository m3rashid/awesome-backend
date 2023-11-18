import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuthValue } from '../hooks/auth';

const AuthWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const auth = useAuthValue();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!auth.user)
      navigate(`/auth/login?redirect=${location.pathname}${location.search}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!auth.user) return null;
  return <>{children}</>;
};

export default AuthWrapper;

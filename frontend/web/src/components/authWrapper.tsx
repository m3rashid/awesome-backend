import { useAuthValue } from '@awesome/shared/atoms/auth';
import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import RootContainer from './rootContainer';

const AuthWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const auth = useAuthValue();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!auth || !auth.user)
      navigate(`/auth/login?redirect=${location.pathname}${location.search}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!auth?.user)
    return (
      <Navigate
        to={`/auth/login?redirect=${location.pathname}${location.search}`}
      />
    );

  return <RootContainer>{children}</RootContainer>;
};

export default AuthWrapper;

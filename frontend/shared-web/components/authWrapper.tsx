import { useAuthValue } from '@awesome/shared/atoms/auth';
import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

export type AuthWrapperProps = React.PropsWithChildren & {
  Container: React.FC<React.PropsWithChildren>;
};

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children, Container }) => {
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

  return <Container>{children}</Container>;
};

export default AuthWrapper;

import useLoading from '@awesome/shared/hooks/loading';
import {
  LoginRequestBody,
  LoginResponse,
  RegisterRequestBody,
  RegisterResponse,
} from '@awesome/shared/types/api/auth';
import { notification } from 'antd';
import { isAxiosError } from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { useQueryParam } from 'use-query-params';

import { service } from '../helpers/service';

export type User = {
  name: string;
  email: string;
};

export type Auth = {
  user: User | null;
  token: string | null;
};

export const authAtom = atom<Auth>({
  key: 'authAtom',
  default: {
    user: null,
    token: null,
  },
});

export const useAuthState = () => useRecoilState(authAtom);
export const useAuthValue = () => useRecoilValue(authAtom);
export const useSetAuth = () => useSetRecoilState(authAtom);

export type LoginRegisterFormProps = {
  formType: 'login' | 'register';
};

export const useAuth = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuthState();
  const { loading, start, stop } = useLoading();
  const [redirectUrl] = useQueryParam('redirect');

  const loginService = service<LoginResponse>('/api/anonymous/auth/login', {
    method: 'POST',
  });
  const registerService = service<RegisterResponse>(
    '/api/anonymous/auth/register',
    { method: 'POST' }
  );

  const changeState = (currentState: LoginRegisterFormProps['formType']) => {
    const nextState = currentState === 'login' ? 'register' : 'login';
    if (redirectUrl) navigate(`/auth/${nextState}?redirect=${redirectUrl}`);
    else navigate(`/auth/${nextState}`);
  };

  useEffect(() => {
    if (auth.user) navigate(redirectUrl ? redirectUrl : '/app');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (values: LoginRequestBody) => {
    try {
      start('login');
      const res = await loginService({ data: values });
      setAuth({ user: res.data.user, token: res.data.token });
      localStorage.setItem('token', res.data.token);
      notification.success({
        message: 'Login successful',
        description: `Hello ${res.data.user.name}`,
      });
      if (redirectUrl) navigate(redirectUrl);
    } catch (err: any) {
      notification.error({
        message: 'Login failed',
        description: isAxiosError(err) ? err.response?.data.message || '' : '',
      });
    } finally {
      stop('login');
    }
  };

  const register = async (values: RegisterRequestBody) => {
    try {
      start('register');
      const res = await registerService({ data: values });
      notification.success({ message: res.data.message });
      if (redirectUrl) navigate(redirectUrl);
    } catch (err: any) {
      notification.error({
        message: 'Registration failed',
        description: isAxiosError(err) ? err.response?.data.message || '' : '',
      });
    } finally {
      stop('register');
    }
  };

  return {
    auth,
    login,
    loading,
    register,
    changeState,
  };
};

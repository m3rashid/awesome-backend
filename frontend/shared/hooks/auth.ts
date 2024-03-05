import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryParam } from 'use-query-params';
import { SubmitHandler, useForm } from 'react-hook-form';

import useLoading from './loading';
import { service } from '../utils/service';
import { useAuthState } from '../atoms/auth';
import { LoginResponse, RegisterResponse } from '../types/auth';

export type FormProps = {
  formType: 'login' | 'register';
  authType: 'tenant' | 'host';
};

const useAuth = (props: FormProps) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuthState();
  const { loading, start, stop } = useLoading();
  const [redirectUrl] = useQueryParam('redirect');

  type Inputs = {
    name: string;
    email: string;
    password: string;
  };

  const {
    register: registerFormElement,
    handleSubmit: handleFormSubmit,
    watch: watchForm,
    formState,
  } = useForm<Inputs>();

  const changeState = (currentState: FormProps['formType']) => {
    const nextState = currentState === 'login' ? 'register' : 'login';
    if (redirectUrl) navigate(`/auth/${nextState}?redirect=${redirectUrl}`);
    else navigate(`/auth/${nextState}`);
  };

  useEffect(() => {
    if (auth?.user)
      navigate(
        redirectUrl ? redirectUrl : props.authType === 'tenant' ? '/app' : '/'
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login: SubmitHandler<Inputs> = async (values) => {
    try {
      start('login');
      const res = await service<LoginResponse>(
        props.authType === 'tenant'
          ? '/api/anonymous/auth/login'
          : '/api/anonymous/host/login',
        { method: 'POST' }
      )({ data: values });
      setAuth({ user: res.data.user, token: res.data.token });
      localStorage.setItem('awesome:token', res.data.token);
      if (redirectUrl) navigate(redirectUrl);
      else navigate(props.authType === 'tenant' ? '/app' : '/');
    } catch (err: any) {
      console.log(err);
    } finally {
      stop('login');
    }
  };

  const createAccount: SubmitHandler<Inputs> = async (values) => {
    try {
      start('register');
      await service<RegisterResponse>(
        props.authType === 'tenant'
          ? '/api/anonymous/auth/register'
          : '/api/anonymous/host/register',
        { method: 'POST' }
      )({ data: values });
      if (redirectUrl) navigate(redirectUrl);
      else navigate(props.authType === 'tenant' ? '/app' : '/');
    } catch (err: any) {
      console.log(err);
    } finally {
      stop('register');
    }
  };

  return {
    auth,
    login,
    loading,
    watchForm,
    formState,
    changeState,
    createAccount,
    handleFormSubmit,
    registerFormElement,
  };
};

export default useAuth;

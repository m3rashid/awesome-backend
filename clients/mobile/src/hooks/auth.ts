import {useAuthState} from '@awesome/shared/atoms/auth';
import useLoading from '@awesome/shared/hooks/loading';
import {
  LoginResponse,
  RegisterResponse,
  LoginRequestBody,
  RegisterRequestBody,
  InitResponse,
} from '@awesome/shared/types/api/auth';
import {service} from '../helpers/service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {AppStackParamList} from '../routes/types';
import {NavigationProp, useNavigation} from '@react-navigation/native';

const useAuth = () => {
  const {navigate} = useNavigation<NavigationProp<AppStackParamList>>();

  const [auth, setAuth] = useAuthState();
  const {loading, start, stop} = useLoading();

  const [email, setEmail] = useState<{value: string; error: any}>({
    value: '',
    error: null,
  });
  const [name, setName] = useState<{value: string; error: any}>({
    value: '',
    error: null,
  });
  const [password, setPassword] = useState<{value: string; error: any}>({
    value: '',
    error: null,
  });

  const _loginService = service<LoginResponse>('/api/anonymous/auth/login', {
    method: 'POST',
  });

  const _registerService = service<RegisterResponse>(
    '/api/anonymous/auth/register',
    {method: 'POST'},
  );

  const _checkAuthService = service<InitResponse>('/api/auth', {
    method: 'POST',
  });

  const checkAuth = async () => {
    const checkAuthService = await _checkAuthService;
    const res = await checkAuthService();
    setAuth({user: res.data.user, token: res.data.token});
    await AsyncStorage.setItem('token', res.data.token);
  };

  const handleLogin = async () => {
    const values: LoginRequestBody = {
      email: email.value,
      password: password.value,
    };

    try {
      const loginService = await _loginService;
      start('login');
      const res = await loginService({data: values});
      setAuth({user: res.data.user, token: res.data.token});
      await AsyncStorage.setItem('token', res.data.token);
      navigate('home');
    } catch (err: any) {
      setAuth(null);
      await AsyncStorage.removeItem('token');
    } finally {
      stop('login');
    }
  };

  const register = async () => {
    const values: RegisterRequestBody = {
      email: email.value,
      password: password.value,
      name: name.value,
    };
    try {
      const registerService = await _registerService;
      start('register');
      await registerService({data: values});
      await handleLogin();
    } catch (err: any) {
    } finally {
      stop('register');
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    auth,
    handleLogin,
    loading,
    setAuth,
    register,
    checkAuth,
  };
};

export default useAuth;

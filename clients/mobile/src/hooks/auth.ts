import {useAuthState} from '@awesome/shared/atoms/auth';
import useLoading from '@awesome/shared/hooks/loading';
import {zodValidate} from '@awesome/shared/helpers/zodError';
import {
  LoginResponse,
  RegisterResponse,
  InitResponse,
  loginRequestBodySchema,
  registerRequestBodySchema,
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
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const defaultError = {name: '', email: '', password: ''};
  const [errors, setErrors] = useState(defaultError);

  const checkAuth = async () => {
    const checkAuthService = await service<InitResponse>('/api/auth', {
      method: 'POST',
    });
    const res = await checkAuthService();
    setAuth({user: res.data.user, token: res.data.token});
    await AsyncStorage.setItem('awesome:token', res.data.token);
  };

  const handleLogin = async () => {
    try {
      start('login');
      const issues = zodValidate(loginRequestBodySchema, formValues, [
        'email',
        'password',
      ]);

      if (issues) {
        setErrors(p => ({...p, ...issues}));
        setTimeout(() => setErrors(defaultError), 5000);
        return;
      }

      const loginService = await service<LoginResponse>(
        '/api/anonymous/auth/login',
        {method: 'POST'},
      );
      const res = await loginService({data: formValues});
      setAuth({user: res.data.user, token: res.data.token});
      await AsyncStorage.setItem('awesome:token', res.data.token);
      navigate('app-home');
    } catch (err: any) {
      console.log(err);
      setAuth(null);
      await AsyncStorage.removeItem('awesome:token');
    } finally {
      stop('login');
    }
  };

  const handleRegister = async () => {
    try {
      start('register');
      const issues = zodValidate(registerRequestBodySchema, formValues, [
        'name',
        'email',
        'password',
      ]);

      if (issues) {
        setErrors(p => ({...p, ...issues}));
        setTimeout(() => setErrors(defaultError), 5000);
        return;
      }

      const registerService = await service<RegisterResponse>(
        '/api/anonymous/auth/register',
        {method: 'POST'},
      );
      await registerService({data: formValues});
      await handleLogin();
    } catch (err: any) {
      console.log(err);
    } finally {
      stop('register');
    }
  };

  return {
    formValues,
    errors,
    setFormValues,
    auth,
    handleLogin,
    loading,
    setAuth,
    handleRegister,
    checkAuth,
    navigate,
  };
};

export default useAuth;

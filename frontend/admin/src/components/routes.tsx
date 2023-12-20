import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

const Home = lazy(() => import('../pages/home'));
const Login = lazy(() => import('../pages/auth/login'));
const Register = lazy(() => import('../pages/auth/register'));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Routes>
          <Route path='' Component={Home} />
          <Route path='auth'>
            <Route path='login' Component={Login} />
            <Route path='register' Component={Register} />
          </Route>
        </Routes>
      </QueryParamProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;

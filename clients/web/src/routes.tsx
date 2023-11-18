import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

const Home = lazy(() => import('./pages/home'));
const Iam = lazy(() => import('./pages/app/iam'));
const AppHome = lazy(() => import('./pages/app'));
const NotFound = lazy(() => import('./pages/404'));
const Login = lazy(() => import('./pages/auth/login'));
const Register = lazy(() => import('./pages/auth/register'));

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

          <Route path='app'>
            <Route path='' Component={AppHome} />
            <Route path='iam' Component={Iam} />
          </Route>
          <Route path='*' Component={NotFound} />
        </Routes>
      </QueryParamProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;

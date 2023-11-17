import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

const Iam = lazy(() => import('./pages/iam'));
const Home = lazy(() => import('./pages/home'));
const Login = lazy(() => import('./pages/auth/login'));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/iam' Component={Iam} />
          <Route path='/login' Component={Login} />
        </Routes>
      </QueryParamProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;

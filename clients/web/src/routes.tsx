import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

const Home = lazy(() => import('./pages/home'));
const AppHome = lazy(() => import('./pages/app'));
const NotFound = lazy(() => import('./pages/404'));
const Drive = lazy(() => import('./pages/app/drive'));
const Login = lazy(() => import('./pages/auth/login'));
const Users = lazy(() => import('./pages/app/iam/users'));
const Register = lazy(() => import('./pages/auth/register'));
const Workspaces = lazy(() => import('./pages/app/iam/workspaces'));
const UserGroups = lazy(() => import('./pages/app/iam/userGroups'));

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

            <Route path='iam'>
              <Route path='' element={<Navigate to='users' />} />
              <Route path='users' Component={Users} />
              <Route path='user-groups' Component={UserGroups} />
              <Route path='workspaces' Component={Workspaces} />
            </Route>

            <Route path='drive'>
              <Route path='' Component={Drive} />
            </Route>
          </Route>
          <Route path='*' Component={NotFound} />
        </Routes>
      </QueryParamProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;

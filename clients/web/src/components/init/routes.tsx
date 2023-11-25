import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

const Home = lazy(() => import('../../pages/home'));
const AppHome = lazy(() => import('../../pages/app'));
const NotFound = lazy(() => import('../../pages/404'));
const Drive = lazy(() => import('../../pages/app/drive'));
const Login = lazy(() => import('../../pages/auth/login'));
const Users = lazy(() => import('../../pages/app/iam/users'));
const Leads = lazy(() => import('../../pages/app/crm/leads'));
const Register = lazy(() => import('../../pages/auth/register'));
const Posts = lazy(() => import('../../pages/app/community/posts'));
const Topics = lazy(() => import('../../pages/app/community/Topics'));
const Campaigns = lazy(() => import('../../pages/app/crm/campaigns'));
const Workspaces = lazy(() => import('../../pages/app/iam/workspaces'));
const UserGroups = lazy(() => import('../../pages/app/iam/userGroups'));
const LeadDetails = lazy(() => import('../../pages/app/crm/leadDetails'));
const PortalSettings = lazy(() => import('../../pages/app/settings/portal'));
const DataIngestor = lazy(() => import('../../pages/app/tools/dataIngestor'));
const FormDesigner = lazy(() => import('../../pages/app/tools/formDesigner'));
const ShowDriveFile = lazy(() => import('../../pages/app/drive/showDriveFile'));
const PostDetails = lazy(() => import('../../pages/app/community/postDetails'));
const ServerMetrics = lazy(() => import('../../pages/app/tools/serverMetrics'));
const DashboardBuilder = lazy(
  () => import('../../pages/app/tools/dashboardBuilder')
);

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
              <Route path='' element={<Navigate to='home' />} />
              <Route path='home' Component={Drive} />
              <Route path='bin' Component={Drive} />
              <Route path='shared-with-you' Component={Drive} />

              <Route path='file'>
                <Route path=':fileId' Component={ShowDriveFile} />
              </Route>
            </Route>

            <Route path='crm'>
              <Route path='' element={<Navigate to='leads' />} />
              <Route path='leads'>
                <Route path='' Component={Leads} />
                <Route path=':leadId' Component={LeadDetails} />
              </Route>
              <Route path='campaigns' Component={Campaigns} />
            </Route>

            <Route path='community'>
              <Route path='' element={<Navigate to='posts' />} />
              <Route path='posts'>
                <Route path='' Component={Posts} />
                <Route path=':postId' Component={PostDetails} />
              </Route>
              <Route path='topics' Component={Topics} />
            </Route>

            <Route path='tools'>
              <Route path='' element={<Navigate to='data-ingestor' />} />
              <Route path='data-ingestor' Component={DataIngestor} />
              <Route path='form-designer' Component={FormDesigner} />
              <Route path='dashboard-builder' Component={DashboardBuilder} />
              <Route path='server-metrics' Component={ServerMetrics} />
            </Route>

            <Route path='settings'>
              <Route path='' element={<Navigate to='general' />} />
              <Route path='general' Component={PortalSettings} />
            </Route>
          </Route>
          <Route path='*' Component={NotFound} />
        </Routes>
      </QueryParamProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;

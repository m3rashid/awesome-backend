import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { lazy } from 'react';
dayjs.extend(relativeTime);
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

const CommunityProfile = lazy(
  () => import('../../pages/app/community/profile')
);
const ProjectTasks = lazy(() => import('../../pages/app/projects/details'));
const DashboardBuilder = lazy(
  () => import('../../pages/app/tools/dashboardBuilder')
);
const Home = lazy(() => import('../../pages/home'));
const AppHome = lazy(() => import('../../pages/app'));
const NotFound = lazy(() => import('../../pages/404'));
const Forms = lazy(() => import('../../pages/app/forms'));
const Drive = lazy(() => import('../../pages/app/drive'));
const Login = lazy(() => import('../../pages/auth/login'));
const Users = lazy(() => import('../../pages/app/iam/users'));
const Leads = lazy(() => import('../../pages/app/crm/leads'));
const PrivacyPolicy = lazy(() => import('../../pages/privacy'));
const Register = lazy(() => import('../../pages/auth/register'));
const TermsAndConditions = lazy(() => import('../../pages/terms'));
const Posts = lazy(() => import('../../pages/app/community/posts'));
const Projects = lazy(() => import('../../pages/app/projects/all'));
const Campaigns = lazy(() => import('../../pages/app/crm/campaigns'));
const Workspaces = lazy(() => import('../../pages/app/iam/workspaces'));
const Workflows = lazy(() => import('../../pages/app/tools/workflows'));
const UserGroups = lazy(() => import('../../pages/app/iam/userGroups'));
const AllChats = lazy(() => import('../../pages/app/community/allChats'));
const LeadDetails = lazy(() => import('../../pages/app/crm/leadDetails'));
const SingleForm = lazy(() => import('../../pages/app/forms/singleForm'));
const ProjectUserDashboard = lazy(() => import('../../pages/app/projects'));
const FormBuilderPage = lazy(() => import('../../pages/app/forms/builder'));
const FormResponses = lazy(() => import('../../pages/app/forms/responses'));
const PortalSettings = lazy(() => import('../../pages/app/settings/portal'));
const SingleChat = lazy(() => import('../../pages/app/community/singleChat'));
const DataIngestor = lazy(() => import('../../pages/app/tools/dataIngestor'));
const ShowDriveFile = lazy(() => import('../../pages/app/drive/showDriveFile'));
const PostDetails = lazy(() => import('../../pages/app/community/postDetails'));
const ServerMetrics = lazy(() => import('../../pages/app/tools/serverMetrics'));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <Routes>
          <Route path='' Component={Home} />
          <Route path='privacy' Component={PrivacyPolicy} />
          <Route path='terms' Component={TermsAndConditions} />

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
              <Route path='profile/:userId' Component={CommunityProfile} />
              <Route path='posts'>
                <Route path='' Component={Posts} />
                <Route path=':postId' Component={PostDetails} />
              </Route>
              <Route path='chats'>
                <Route path='' Component={AllChats} />
                <Route path=':chatId' Component={SingleChat} />
              </Route>
            </Route>

            <Route path='tools'>
              <Route path='' element={<Navigate to='data-ingestor' />} />
              <Route path='data-ingestor' Component={DataIngestor} />
              <Route path='dashboard-builder' Component={DashboardBuilder} />
              <Route path='server-metrics' Component={ServerMetrics} />
              <Route path='workflow-builder' Component={Workflows} />
            </Route>

            <Route path='forms'>
              <Route path='' Component={Forms} />
              <Route path=':formId'>
                <Route path='' Component={SingleForm} />
                <Route path='builder' Component={FormBuilderPage} />
                <Route path='responses' Component={FormResponses} />
              </Route>
            </Route>

            <Route path='projects'>
              <Route path='' Component={ProjectUserDashboard} />
              <Route path='all' Component={Projects} />
              <Route path=':projectId'>
                <Route path='' Component={ProjectTasks} />
              </Route>
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

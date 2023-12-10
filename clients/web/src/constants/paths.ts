import {
  MailInbox20Regular,
  PeopleSettings20Regular,
  Settings20Regular,
  Toolbox20Regular,
} from '@fluentui/react-icons';

export type AppPath = {
  name: string;
  route: string;
  icon: typeof MailInbox20Regular;
  description: string;
  children?: Array<{ name: string; route: string }>;
};

export const appPaths: AppPath[] = [
  {
    name: 'Drive',
    route: '/app/drive',
    icon: MailInbox20Regular,
    description: 'Manage your files and folders',
    children: [
      { name: 'Home', route: '/app/drive/home' },
      { name: 'Bin', route: '/app/drive/bin' },
      { name: 'Shared with you', route: '/app/drive/shared-with-you' },
    ],
  },
  {
    route: '/app/iam',
    icon: PeopleSettings20Regular,
    name: 'IAM',
    description: 'Manage your users and permissions',
    children: [
      { name: 'Users', route: '/app/iam/users' },
      { name: 'User Groups', route: '/app/iam/user-groups' },
      { name: 'Workspaces', route: '/app/iam/workspaces' },
    ],
  },
  {
    route: '/app/crm',
    icon: PeopleSettings20Regular,
    name: 'CRM',
    description: 'Manage your customers, leads and campaigns',
    children: [
      { name: 'Leads', route: '/app/crm/leads' },
      { name: 'Campaigns', route: '/app/crm/campaigns' },
    ],
  },
  {
    route: '/app/community',
    icon: PeopleSettings20Regular,
    name: 'Community',
    description: 'Create and manage your community',
    children: [{ name: 'Posts', route: '/app/community/posts' }],
  },
  {
    route: '/app/forms',
    icon: PeopleSettings20Regular,
    name: 'Forms & Surveys',
    description: 'Create and manage your forms and surveys',
    children: [
      { name: 'Forms', route: '/app/forms' },
      { name: 'Builder', route: '/app/forms/builder' },
    ],
  },
  {
    route: '/app/tools',
    icon: Toolbox20Regular,
    name: 'App Tools',
    description: 'Setup your workspace efficiently',
    children: [
      { name: 'Data Ingestor', route: '/app/tools/data-ingestor' },
      { name: 'Dashboard Builder', route: '/app/tools/dashboard-builder' },
      { name: 'Server Metrics', route: '/app/tools/server-metrics' },
    ],
  },
  {
    route: '/app/settings',
    icon: Settings20Regular,
    name: 'Settings',
    description: 'Manage your workspace settings',
    children: [{ name: 'General', route: '/app/settings/general' }],
  },
];

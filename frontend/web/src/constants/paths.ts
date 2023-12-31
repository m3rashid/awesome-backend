export type AppPath = {
  name: string;
  route: string;
  description: string;
  children?: Array<{ name: string; route: string }>;
};

export const appPaths: AppPath[] = [
  {
    name: 'Drive',
    route: '/app/drive',
    description: 'Manage your files and folders',
    children: [
      { name: 'Home', route: '/app/drive/home' },
      { name: 'Bin', route: '/app/drive/bin' },
      { name: 'Shared with you', route: '/app/drive/shared-with-you' },
    ],
  },
  {
    route: '/app/iam',
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
    name: 'CRM',
    description: 'Manage your customers, leads and campaigns',
    children: [
      { name: 'Leads', route: '/app/crm/leads' },
      { name: 'Campaigns', route: '/app/crm/campaigns' },
    ],
  },
  {
    route: '/app/community',
    name: 'Community',
    description: 'Create and manage your community',
    children: [
      { name: 'Posts', route: '/app/community/posts' },
      { name: 'Chats', route: '/app/community/chats' },
    ],
  },
  {
    route: '/app/forms',
    name: 'Forms',
    description: 'Create and manage your forms and surveys',
    children: [{ name: 'Forms', route: '/app/forms' }],
  },
  {
    route: '/app/tools',
    name: 'Tools',
    description: 'Setup your workspace efficiently',
    children: [
      { name: 'Data Ingestor', route: '/app/tools/data-ingestor' },
      { name: 'Dashboard Builder', route: '/app/tools/dashboard-builder' },
      { name: 'Server Metrics', route: '/app/tools/server-metrics' },
      { name: 'Workflow Builder', route: '/app/tools/workflow-builder' },
    ],
  },
  {
    route: '/app/projects',
    name: 'Projects',
    description: 'Manage your projects',
    children: [
      { name: 'Dashboard', route: '/app/projects' },
      { name: 'All Projects', route: '/app/projects/all' },
    ],
  },
  {
    route: '/app/settings',
    name: 'Settings',
    description: 'Manage your workspace settings',
    children: [{ name: 'General', route: '/app/settings/general' }],
  },
];

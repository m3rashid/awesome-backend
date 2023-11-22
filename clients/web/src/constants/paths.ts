import {
  InboxOutlined,
  SettingOutlined,
  ToolOutlined,
  UserAddOutlined,
} from '@ant-design/icons';

export type AppPath = {
  name: string;
  route: string;
  icon: typeof InboxOutlined;
  description: string;
  children?: Array<{ name: string; route: string }>;
};

export const appPaths: AppPath[] = [
  {
    name: 'Drive',
    route: '/app/drive',
    icon: InboxOutlined,
    description: 'Manage your files and folders',
    children: [
      { name: 'Home', route: '/app/drive/home' },
      { name: 'Bin', route: '/app/drive/bin' },
      { name: 'Shared with you', route: '/app/drive/shared-with-you' },
    ],
  },
  {
    route: '/app/iam',
    icon: UserAddOutlined,
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
    icon: UserAddOutlined,
    name: 'CRM',
    description: 'Manage your customers, leads and campaigns',
    children: [
      { name: 'Leads', route: '/app/crm/leads' },
      { name: 'Campaigns', route: '/app/crm/campaigns' },
    ],
  },
  {
    route: '/app/community',
    icon: UserAddOutlined,
    name: 'Community',
    description: 'Create and manage your community',
    children: [
      { name: 'Posts', route: '/app/community/posts' },
      { name: 'Topics', route: '/app/community/topics' },
    ],
  },
  {
    route: '/app/tools',
    icon: ToolOutlined,
    name: 'App Tools',
    description: 'Setup your workspace efficiently',
    children: [{ name: 'Data Ingestor', route: '/app/tools/data-ingestor' }],
  },
  {
    route: '/app/settings',
    icon: SettingOutlined,
    name: 'Settings',
    description: 'Manage your workspace settings',
    children: [{ name: 'General', route: '/app/settings/general' }],
  },
];

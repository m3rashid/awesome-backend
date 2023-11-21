import { InboxOutlined, UserAddOutlined } from '@ant-design/icons';

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
];

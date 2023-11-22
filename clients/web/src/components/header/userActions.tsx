import { UserOutlined } from '@ant-design/icons';
import { useAuthState } from '@awesome/shared/atoms/auth';
import { Dropdown, MenuProps } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserActions: React.FC = () => {
  const navigate = useNavigate();
  const setAuth = useAuthState()[1];

  const logout = () => {
    window.localStorage.removeItem('token');
    setAuth(null);
    navigate('/');
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'logout',
      onClick: logout,
    },
    {
      key: '2',
      label: 'Hello Deer',
      icon: <UserOutlined />,
    },
  ];

  return (
    <Dropdown menu={{ items, style: { width: 150 } }}>
      <div className='bg-slate-200 h-[32px] rounded-full w-[32px] flex items-center justify-center cursor-pointer'>
        <UserOutlined style={{ fontSize: 16, margin: 0, padding: 0 }} />
      </div>
    </Dropdown>
  );
};

export default UserActions;

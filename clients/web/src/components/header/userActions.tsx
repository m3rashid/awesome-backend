import { useAuthState } from '@awesome/shared/atoms/auth';
import {
  Avatar,
  Divider,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Persona,
} from '@fluentui/react-components';
import { SignOut20Regular } from '@fluentui/react-icons';
import _ from 'lodash-es';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type Item = {
  key: React.Key;
  onClick: () => void;
  icon: typeof SignOut20Regular;
  label: string;
};

const UserActions: React.FC = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuthState();

  const logout = () => {
    window.localStorage.removeItem('awesome:token');
    setAuth(null);
    navigate('/');
  };

  const items: Array<Item> = [];

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Avatar />
      </MenuTrigger>

      <MenuPopover>
        <MenuList style={{ minWidth: 200, padding: 8 }}>
          <Persona
            name={auth?.user.name}
            secondaryText={_.truncate(auth?.user.email, { length: 20 })}
          />

          <Divider className='my-2' />

          <MenuItem onClick={logout} icon={<SignOut20Regular />}>
            Logout
          </MenuItem>

          {items.map((item) => (
            <MenuItem
              key={item.key}
              icon={<item.icon />}
              onClick={item.onClick}
            >
              {item.label}
            </MenuItem>
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export default UserActions;

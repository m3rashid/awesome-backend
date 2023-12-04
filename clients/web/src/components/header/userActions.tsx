import { useAuthState, useAuthValue } from '@awesome/shared/atoms/auth';
import {
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Persona,
} from '@fluentui/react-components';
import { Person20Regular, SignOut20Regular } from '@fluentui/react-icons';
import _ from 'lodash-es';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserActions: React.FC = () => {
  const auth = useAuthValue();
  const navigate = useNavigate();
  const setAuth = useAuthState()[1];

  const logout = () => {
    window.localStorage.removeItem('awesome:token');
    setAuth(null);
    navigate('/');
  };

  const items = [
    {
      key: '1',
      label: 'logout',
      onClick: logout,
      icon: <SignOut20Regular />,
    },
    {
      key: '2',
      label: 'Hello Deer',
      icon: <Person20Regular />,
    },
  ];

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Persona
          name={auth?.user.name}
          style={{ cursor: 'pointer' }}
          secondaryText={_.truncate(auth?.user.email, { length: 20 })}
        />
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          {items.map((item) => (
            <MenuItem key={item.key} onClick={item.onClick} icon={item.icon}>
              {item.label}
            </MenuItem>
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export default UserActions;

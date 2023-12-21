import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Tooltip,
} from '@fluentui/react-components';
import { ChevronDown16Regular } from '@fluentui/react-icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { appPaths } from '../../constants/paths';

const SecondaryHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='h-[30px] bg-blue-100 flex items-center gap-2'>
      {appPaths.map((routeConfig) => {
        if (!routeConfig.children || routeConfig.children.length === 0) {
          return (
            <Tooltip
              key={routeConfig.route}
              relationship='description'
              content={routeConfig.description}
            >
              <Button
                size='small'
                iconPosition='after'
                appearance='transparent'
                onClick={() => navigate(routeConfig.route)}
              >
                {routeConfig.name}
              </Button>
            </Tooltip>
          );
        }

        return (
          <Menu key={routeConfig.route}>
            <Tooltip
              relationship='description'
              content={routeConfig.description}
            >
              <MenuTrigger>
                <Button
                  size='small'
                  iconPosition='after'
                  appearance='transparent'
                  icon={<ChevronDown16Regular />}
                >
                  {routeConfig.name}
                </Button>
              </MenuTrigger>
            </Tooltip>

            <MenuPopover>
              <MenuList>
                {routeConfig.children?.map((child) => {
                  return (
                    <MenuItem
                      key={child.route}
                      onClick={() => navigate(child.route)}
                    >
                      {child.name}
                    </MenuItem>
                  );
                })}
              </MenuList>
            </MenuPopover>
          </Menu>
        );
      })}
    </div>
  );
};

export default SecondaryHeader;

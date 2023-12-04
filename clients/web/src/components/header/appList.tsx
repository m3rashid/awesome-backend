import { Body1, Card, CardHeader, Link } from '@fluentui/react-components';
import React from 'react';

import { appPaths } from '../../constants/paths';

type AppSwitchDrawerContentsProps = {
  onRouteClick: (route: string) => void;
};

const AppSwitchDrawerContents: React.FC<AppSwitchDrawerContentsProps> = ({
  onRouteClick,
}) => {
  return (
    <>
      {appPaths.map((routeConfig) => {
        return (
          <Card
            key={routeConfig.route}
            style={{ marginBottom: 12, cursor: 'pointer' }}
          >
            <CardHeader
              header={<Body1>{routeConfig.name}</Body1>}
              onClick={() => onRouteClick(routeConfig.route)}
              image={
                <routeConfig.icon
                  style={{ fontSize: 16, margin: 0, padding: 0 }}
                />
              }
            />

            <div className='flex flex-wrap'>
              {routeConfig.children &&
                routeConfig.children.map((child) => {
                  return (
                    <Link
                      className='mr-5'
                      key={child.route}
                      style={{ marginRight: 12 }}
                      onClick={() => onRouteClick(child.route)}
                    >
                      {child.name}
                    </Link>
                  );
                })}
            </div>
          </Card>
        );
      })}
    </>
  );
};

export default AppSwitchDrawerContents;

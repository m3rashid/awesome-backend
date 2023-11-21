import { Card, Drawer, theme, Typography } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { appPaths } from '../../constants/paths';

const AppsSvg = (props: { baseColor: string; hoverColor: string }) => {
  const [color, setColor] = useState(props.baseColor);

  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      onMouseLeave={() => setColor(props.baseColor)}
      onMouseEnter={() => setColor(props.hoverColor)}
    >
      <rect width='4' height='4' rx='1' fill={color}></rect>
      <rect y='6' width='4' height='4' rx='1' fill={color}></rect>
      <rect y='12' width='4' height='4' rx='1' fill={color}></rect>
      <rect x='6' width='4' height='4' rx='1' fill={color}></rect>
      <rect x='6' y='6' width='4' height='4' rx='1' fill={color}></rect>
      <rect x='6' y='12' width='4' height='4' rx='1' fill={color}></rect>
      <rect x='12' width='4' height='4' rx='1' fill={color}></rect>
      <rect x='12' y='6' width='4' height='4' rx='1' fill={color}></rect>
      <rect x='12' y='12' width='4' height='4' rx='1' fill={color}></rect>
    </svg>
  );
};

const AppSwitch: React.FC = () => {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const [open, setOpen] = useState(false);

  const onRouteClick = (route: string) => {
    navigate(route);
    setOpen(false);
  };

  return (
    <>
      <div onClick={() => setOpen((p) => !p)} className='cursor-pointer'>
        <AppsSvg baseColor='gray' hoverColor={token.colorPrimary} />
      </div>

      <Drawer
        {...{
          open,
          onClose: () => setOpen((p) => !p),
          styles: {
            header: { display: 'none' },
            body: { padding: 8 },
          },
        }}
      >
        <Typography.Title
          level={3}
          type='secondary'
          style={{ marginTop: 0, marginLeft: 8 }}
        >
          Apps and Services
        </Typography.Title>

        {appPaths.map((routeConfig) => {
          return (
            <Card
              key={routeConfig.route}
              style={{ marginBottom: '1rem' }}
              bodyStyle={{
                padding: 8,
                paddingLeft: 16,
                paddingRight: 16,
                cursor: 'pointer',
              }}
            >
              <div
                className='flex items-center gap-2'
                onClick={() => onRouteClick(routeConfig.route)}
              >
                <routeConfig.icon
                  style={{ fontSize: 16, margin: 0, padding: 0 }}
                />

                <Typography.Title level={4} style={{ margin: 0, padding: 0 }}>
                  {routeConfig.name}
                </Typography.Title>
              </div>
              <Typography.Text>{routeConfig.description}</Typography.Text>

              <div className='flex gap-4 flex-wrap'>
                {routeConfig.children &&
                  routeConfig.children.map((child) => {
                    return (
                      <Typography.Link
                        strong
                        key={child.route}
                        onClick={() => onRouteClick(child.route)}
                      >
                        {child.name}
                      </Typography.Link>
                    );
                  })}
              </div>
            </Card>
          );
        })}
        {/* {Object.entries(appPaths).map(([routeKey, routeConfig]) => {
          return (
            
          );
        })} */}
      </Drawer>
    </>
  );
};

export default AppSwitch;

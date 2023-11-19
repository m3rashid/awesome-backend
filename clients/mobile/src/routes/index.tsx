import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Splash from '../screens/splash';
import {AppStackParamList} from './types';
import AppHome from '../screens/app/home';
import Login from '../screens/auth/login';
import Register from '../screens/auth/register';

const AppStack = createNativeStackNavigator<AppStackParamList>();

const Routes = (): JSX.Element => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        initialRouteName="splash"
        screenOptions={{headerShown: false}}>
        <AppStack.Screen name="splash" component={Splash} />
        <AppStack.Screen name="app-home" component={AppHome} />
        <AppStack.Screen name="auth-login" component={Login} />
        <AppStack.Screen name="auth-register" component={Register} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

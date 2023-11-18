import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Splash from '../screens/splash';
import {AppStackParamList} from './types';
import AppHome from '../screens/app/home';
import Login from '../screens/auth/login';

const AppStack = createNativeStackNavigator<AppStackParamList>();

const Routes = (): JSX.Element => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        initialRouteName="splash"
        screenOptions={{headerShown: false}}>
        <AppStack.Screen name="splash" component={Splash} />
        <AppStack.Screen name="home" component={AppHome} />
        <AppStack.Screen name="login" component={Login} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;

import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../routes/types';
import {View} from 'react-native';
import {Text} from '@gluestack-ui/themed';

const AppHome = (props: NativeStackScreenProps<AppStackParamList, 'home'>) => {
  return (
    <View>
      <Text>App Home</Text>
    </View>
  );
};

export default AppHome;

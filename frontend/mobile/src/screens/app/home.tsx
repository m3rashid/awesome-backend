import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../../routes/types';
import {View} from 'react-native';
import {Text} from '@gluestack-ui/themed';
import {useAuthValue} from '@awesome/shared/atoms/auth';

const AppHome = (
  props: NativeStackScreenProps<AppStackParamList, 'app-home'>,
) => {
  const auth = useAuthValue();
  return (
    <View>
      <Text>App Home: {auth?.user.name}</Text>
    </View>
  );
};

export default AppHome;

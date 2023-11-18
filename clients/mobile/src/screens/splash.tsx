import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {AppStackParamList} from '../routes/types';
import {Text} from '@gluestack-ui/themed';
import appConfig from '@awesome/shared/constants/appConfig';
import useAuth from '../hooks/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = (
  props: NativeStackScreenProps<AppStackParamList, 'splash'>,
): JSX.Element => {
  const {setAuth, checkAuth} = useAuth();
  const setupApp = async () => {
    try {
      await checkAuth();
      props.navigation.replace('home');
    } catch (err: any) {
      setAuth(null);
      props.navigation.replace('login');
      await AsyncStorage.removeItem('token');
    }
  };

  useEffect(() => {
    setupApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/favicon.png')}
        />
        <Text style={styles.text}>Awesome</Text>
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appConfig.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    marginTop: 10,
  },
  innerContainer: {
    height: Dimensions.get('window').height - 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    resizeMode: 'contain',
    width: 80,
    height: 80,
  },
});

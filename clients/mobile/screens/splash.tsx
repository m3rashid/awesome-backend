import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../routes/types';
import {usePerson} from '@awesome/shared';

const Splash = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'splash'>): JSX.Element => {
  const {p} = usePerson();
  console.log(p);
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text>Splash</Text>
        {/* <Image style={styles.logo} source={logo} /> */}
      </View>

      {/* <Image source={poweredBy} style={{height: 40, resizeMode: 'contain'}} /> */}
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E6539',
    alignItems: 'center',
    justifyContent: 'center',
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

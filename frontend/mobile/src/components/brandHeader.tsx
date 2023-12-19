import {Text} from '@gluestack-ui/themed';
import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import {Image} from 'react-native';

const BrandHeader = (props: {title?: string}) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/images/favicon.png')}
        />

        {props.title ? (
          <Text style={styles.titleText}>{props.title}</Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '100%',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
});

export default BrandHeader;

import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StyleSheet, View} from 'react-native';
import {
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  VStack,
  Button,
  InputField,
} from '@gluestack-ui/themed';
import BrandHeader from '../../components/brandHeader';
import useAuth from '../../hooks/auth';

const Login = () => {
  const {email, setEmail, password, setPassword, handleLogin} = useAuth();

  return (
    <View style={styles.container}>
      <BrandHeader title="Login Here" />

      <VStack space="md">
        <FormControl isRequired={true}>
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              type="text"
              placeholder="email"
              value={email.value}
              onChangeText={text => setEmail({value: text, error: null})}
            />
          </Input>
        </FormControl>

        <FormControl isRequired={true}>
          <FormControlLabel>
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              type="password"
              placeholder="password"
              value={password.value}
              onChangeText={text => setPassword({value: text, error: null})}
            />
          </Input>
        </FormControl>

        <Button
          variant="solid"
          action="primary"
          style={{marginTop: 10}}
          onPress={handleLogin}>
          <ButtonText>Login </ButtonText>
        </Button>
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    height: '100%',
  },
});

export default Login;

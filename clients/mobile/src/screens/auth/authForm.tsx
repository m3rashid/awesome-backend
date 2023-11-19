import React from 'react';
import {
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  VStack,
  Button,
  InputField,
  ButtonSpinner,
  Box,
  AlertCircleIcon,
  FormControlErrorIcon,
  FormControlHelper,
  FormControlHelperText,
} from '@gluestack-ui/themed';
import {StyleSheet} from 'react-native';

import useAuth from '../../hooks/auth';
import BrandHeader from '../../components/brandHeader';

const ShowError = ({text}: {text: string}) => {
  if (!text) {
    return null;
  }
  return (
    <FormControlHelper>
      <FormControlErrorIcon as={AlertCircleIcon} />
      <FormControlHelperText> {text}</FormControlHelperText>
    </FormControlHelper>
  );
};

const AuthForm = ({formType}: {formType: 'login' | 'register'}) => {
  const {
    formValues,
    setFormValues,
    handleLogin,
    handleRegister,
    loading,
    errors,
    navigate,
  } = useAuth();

  return (
    <Box style={styles.container}>
      <BrandHeader title={formType === 'login' ? 'Login' : 'Register'} />

      <VStack space="md">
        {formType === 'register' ? (
          <FormControl isRequired={true}>
            <FormControlLabel>
              <FormControlLabelText>Name</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                placeholder="name"
                value={formValues.name}
                onChangeText={text => setFormValues(p => ({...p, name: text}))}
              />
            </Input>
            <ShowError text={errors.name} />
          </FormControl>
        ) : null}

        <FormControl isRequired={true}>
          <FormControlLabel>
            <FormControlLabelText>Email</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              type="text"
              placeholder="email"
              value={formValues.email}
              onChangeText={text => setFormValues(p => ({...p, email: text}))}
            />
          </Input>
          <ShowError text={errors.email} />
        </FormControl>

        <FormControl isRequired={true}>
          <FormControlLabel>
            <FormControlLabelText>Password</FormControlLabelText>
          </FormControlLabel>
          <Input>
            <InputField
              type="password"
              placeholder="password"
              value={formValues.password}
              onChangeText={text =>
                setFormValues(p => ({...p, password: text}))
              }
            />
          </Input>
          <ShowError text={errors.password} />
        </FormControl>

        <Button
          variant="solid"
          action="primary"
          style={{marginTop: 10}}
          isDisabled={loading}
          onPress={formType === 'login' ? handleLogin : handleRegister}>
          {loading ? <ButtonSpinner mr="$1" /> : null}
          <ButtonText>{formType === 'login' ? 'Login' : 'Register'}</ButtonText>
        </Button>
      </VStack>

      <Button
        variant="link"
        onPress={() =>
          navigate(formType === 'login' ? 'auth-register' : 'auth-login')
        }>
        <ButtonText fontWeight="$medium" fontSize="$sm" color="$primary600">
          {formType === 'login'
            ? "Don't have an account? Register here"
            : 'Already have an account? Login here'}
        </ButtonText>
      </Button>
    </Box>
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

export default AuthForm;

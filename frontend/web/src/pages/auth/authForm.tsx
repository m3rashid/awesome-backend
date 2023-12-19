import {
  Button,
  Card,
  Field,
  Input,
  Link,
  Spinner,
} from '@fluentui/react-components';
import { Password20Regular } from '@fluentui/react-icons';
import React from 'react';

import BrandHeader from '../../components/atoms/brandHeader';
import { LoginRegisterFormProps, useAuth } from '../../hooks/auth';

const LoginRegisterForm: React.FC<LoginRegisterFormProps> = ({ formType }) => {
  const {
    login,
    loading,
    createAccount,
    handleFormSubmit,
    changeState,
    registerFormElement,
  } = useAuth();

  return (
    <div className='h-screen w-screen all-center'>
      <Card>
        <BrandHeader />

        <form
          className='flex flex-col gap-4'
          onSubmit={handleFormSubmit(
            formType === 'login' ? login : createAccount
          )}
        >
          {formType === 'register' ? (
            <Field label='Name' required>
              <Input type='text' {...registerFormElement('name')} />
            </Field>
          ) : null}

          <Field label='Email' required>
            <Input type='email' {...registerFormElement('email')} />
          </Field>

          <Field label='Password' required>
            <Input
              type='password'
              contentBefore={<Password20Regular />}
              {...registerFormElement('password')}
            />
          </Field>

          <Button
            appearance='primary'
            style={{ width: '100%' }}
            onClick={handleFormSubmit(
              formType === 'login' ? login : createAccount
            )}
            icon={
              loading ? <Spinner size='tiny' appearance='inverted' /> : null
            }
          >
            {formType === 'login' ? 'Login' : 'Register'}
          </Button>
        </form>

        <div className='flex item-center justify-center'>
          <Link onClick={() => changeState(formType)}>
            {formType === 'login'
              ? "Don't have an account? Create one"
              : 'Already have an account? Login Here'}
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginRegisterForm;

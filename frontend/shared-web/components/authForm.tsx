import React from 'react';
import {
  Card,
  Link,
  Input,
  Field,
  Button,
  Spinner,
} from '@fluentui/react-components';
import { Password20Regular } from '@fluentui/react-icons';

import BrandHeader from './brandHeader';
import useAuth, { FormProps } from '../hooks/auth';

const AuthForm: React.FC<FormProps> = ({ authType, formType }) => {
  const {
    login,
    loading,
    changeState,
    createAccount,
    handleFormSubmit,
    registerFormElement,
  } = useAuth({ formType, authType });

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

        <div className='flex item-center flex-col justify-center'>
          <Link onClick={() => changeState(formType)}>
            {formType === 'login'
              ? authType === 'tenant'
                ? "Don't have an account? Create one"
                : "Don't have your organization account? Create one"
              : authType === 'tenant'
              ? 'Already have an account? Login Here'
              : 'Already an organization holder? Login Here'}
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default AuthForm;

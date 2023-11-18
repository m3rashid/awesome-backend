import {
  LoginRequestBody,
  RegisterRequestBody,
} from '@awesome/shared/types/api/auth';
import { Button, Card, Form, Input, Spin } from 'antd';
import React from 'react';

import BrandHeader from '../../components/atoms/brandHeader';
import { LoginRegisterFormProps, useAuth } from '../../hooks/auth';

const LoginRegisterForm: React.FC<LoginRegisterFormProps> = ({ formType }) => {
  const { login, loading, register, changeState } = useAuth();

  return (
    <div className='h-screen w-screen all-center'>
      <Card>
        <Spin spinning={loading}>
          <BrandHeader />
          <div className='h-8' />

          <Form<
            typeof formType extends 'login'
              ? LoginRequestBody
              : RegisterRequestBody
          >
            layout='vertical'
            onFinish={formType === 'login' ? login : register}
          >
            {formType === 'register' ? (
              <Form.Item label='Name' name='name' rules={[{ required: true }]}>
                <Input placeholder='Your name' />
              </Form.Item>
            ) : null}

            <Form.Item
              label='Email'
              name='email'
              rules={[{ type: 'email' }, { required: true }]}
            >
              <Input placeholder='user@awesome.in' />
            </Form.Item>

            <Form.Item
              label='Password'
              name='password'
              rules={[{ required: true }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit' block>
                {formType === 'login' ? 'Login' : 'Register'}
              </Button>
            </Form.Item>
          </Form>

          <Button block type='link' onClick={() => changeState(formType)}>
            {formType === 'login'
              ? "Don't have an account? Create one"
              : 'Already have an account? Login Here'}
          </Button>
        </Spin>
      </Card>
    </div>
  );
};

export default LoginRegisterForm;

import { StyleProvider } from '@ant-design/cssinjs';
import Editor, { Monaco } from '@monaco-editor/react';
import { Theme as AntDTheme } from '@rjsf/antd';
import { withTheme } from '@rjsf/core';
import { RJSFSchema } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { Button, Card } from 'antd';
import React from 'react';

import PageContainer from '../../../components/pageContainer';

const schema: RJSFSchema = {
  title: 'A registration form',
  description: 'A simple form example.',
  type: 'object',
  required: ['firstName', 'lastName'],
  properties: {
    firstName: {
      type: 'string',
      title: 'First name',
      default: 'Chuck',
    },
    lastName: {
      type: 'string',
      title: 'Last name',
    },
    roll: {
      type: 'string',
      title: 'Roll',
      enum: ['admin', 'user', 'guest'],
    },
    age: {
      type: 'integer',
      title: 'Age',
    },
    bio: {
      type: 'string',
      title: 'Bio',
    },
    password: {
      type: 'string',
      title: 'Password',
      minLength: 3,
    },
    telephone: {
      type: 'string',
      title: 'Telephone',
      minLength: 10,
    },
  },
};

const uiSchema = {
  firstName: {
    'ui:autofocus': true,
    'ui:emptyValue': '',
    'ui:placeholder':
      'ui:emptyValue causes this field to always be valid despite being required',
    'ui:autocomplete': 'family-name',
    'ui:enableMarkdownInDescription': true,
    'ui:description':
      'Make text **bold** or *italic*. Take a look at other options [here](https://probablyup.com/markdown-to-jsx/).',
  },
  lastName: {
    'ui:autocomplete': 'given-name',
    'ui:enableMarkdownInDescription': true,
    'ui:description':
      'Make things **bold** or *italic*. Embed snippets of `code`. <small>And this is a small texts.</small> ',
  },
  age: {
    'ui:widget': 'updown',
    'ui:title': 'Age of person',
    'ui:description': '(earth year)',
  },
  bio: {
    'ui:widget': 'textarea',
  },
  password: {
    'ui:widget': 'password',
    'ui:help': 'Hint: Make it strong!',
  },
  telephone: {
    'ui:options': {
      inputType: 'tel',
    },
  },
};

const Form = withTheme(AntDTheme);

const FormBuilderPage: React.FC = () => {
  const onSubmit = (data: any) => console.log(data);

  return (
    <PageContainer>
      <Editor height={600} language='json' />
      <StyleProvider>
        <Card className='w-80'>
          <Form
            schema={schema}
            uiSchema={uiSchema}
            validator={validator}
            onSubmit={onSubmit}
          >
            <div>
              <Button type='primary'>Submit</Button>
              <Button>Cancel</Button>
            </div>
          </Form>
        </Card>
      </StyleProvider>
    </PageContainer>
  );
};

export default FormBuilderPage;

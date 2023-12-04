import { useAuthValue } from '@awesome/shared/atoms/auth';
import { Card, Spinner, Text } from '@fluentui/react-components';
import { Form, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import renderer from '../../../components/formBuilder';
import { service } from '../../../helpers/service';

const SingleForm: React.FC = () => {
  const auth = useAuthValue();
  const params = useParams();
  const [form] = Form.useForm();
  const [jsonForm, setJsonForm] = useState<any>({});

  useEffect(() => {
    if (!params.formId) return;
    const getFormService = service('/api/anonymous/forms/get');
    getFormService({
      method: 'POST',
      data: { id: Number(params.formId) },
    })
      .then((res) => {
        setJsonForm({
          ...res.data,
          jsonSchema: JSON.parse(res.data.jsonSchema),
        });
      })
      .catch(console.log);
  }, [params.formId]);

  const onFinish = async (values: any) => {
    try {
      await form.validateFields();
      const submitFormService = service('/api/anonymous/forms/response');
      await submitFormService({
        method: 'POST',
        data: {
          formId: Number(params.formId),
          responseData: JSON.stringify(values),
          userId: auth?.user.id,
        },
      });
      message.success('Form submitted successfully');
      form.resetFields();
    } catch (err: any) {
      message.error(err.message);
    }
  };

  if (!jsonForm) return <Spinner size='extra-large' />;

  return (
    <div className='flex justify-center items-center min-h-screen p-2'>
      <Card style={{ minWidth: 320 }} title={jsonForm.title}>
        {jsonForm.description ? (
          <div className='mb-4'>
            <Text>{jsonForm.description}</Text>
          </div>
        ) : null}
        <Form form={form} onFinish={onFinish} layout='vertical'>
          {renderer(jsonForm.jsonSchema)}
        </Form>
      </Card>
    </div>
  );
};

export default SingleForm;

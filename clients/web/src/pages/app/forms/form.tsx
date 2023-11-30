import { useAuthValue } from '@awesome/shared/atoms/auth';
import { Card, Form, message, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../../../components/atoms/loader';
import renderer from '../../../components/formBuilder';
import { service } from '../../../helpers/service';

export type FormResponseProps = {
  //
};

const FormResponse: React.FC<FormResponseProps> = () => {
  const auth = useAuthValue();
  const params = useParams();
  const [form] = Form.useForm();
  const [jsonForm, setJsonForm] = useState<any>({});

  useEffect(() => {
    if (!params.formId) return;
    const getFormService = service('/api/forms/get');
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
      const submitFormService = service('/api/forms/response');
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

  if (!jsonForm) return <Loader />;

  return (
    <div className='flex justify-center p-2'>
      <Card style={{ minWidth: 320 }} title={jsonForm.title}>
        {jsonForm.description ? (
          <div className='mb-4'>
            <Typography.Text>{jsonForm.description}</Typography.Text>
          </div>
        ) : null}
        <Form form={form} onFinish={onFinish} layout='vertical'>
          {renderer(jsonForm.jsonSchema)}
        </Form>
      </Card>
    </div>
  );
};

export default FormResponse;

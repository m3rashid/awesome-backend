import BrandHeader from '@awesome/shared/components/brandHeader';
import {
  Button,
  Card,
  Field,
  Input,
  Spinner,
} from '@fluentui/react-components';
import React from 'react';
import useForm from '@awesome/shared/hooks/form';

export type CreateTenantFormProps = {
  onSuccess?: () => void;
  onFailure?: () => void;
};

const CreateTenantForm: React.FC<CreateTenantFormProps> = ({
  onFailure,
  onSuccess,
}) => {
  const { form, loading, onSubmit } = useForm<{ name: string }>({
    submitEndpoint: '/api/host/create',
    onSuccess: () => {
      form.reset();
      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onFailure) onFailure();
    },
  });

  return (
    <Card>
      <BrandHeader />

      <form className='flex flex-col gap-4' onSubmit={onSubmit}>
        <Field label='Name' required>
          <Input type='text' {...form.register('name')} />
        </Field>

        <Button
          appearance='primary'
          style={{ width: '100%' }}
          onClick={onSubmit}
          icon={loading ? <Spinner size='tiny' appearance='inverted' /> : null}
        >
          Create Your organization
        </Button>
      </form>
    </Card>
  );
};

export default CreateTenantForm;

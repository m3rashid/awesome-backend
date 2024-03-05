import useForm from '@awesome/shared/hooks/form';
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Field,
  Input,
} from '@fluentui/react-components';
import React from 'react';
import useLeads from './useLeads';
import { leadStatus } from '@awesome/shared/types/crm';

export type AddLeadProps = {};

const AddLead: React.FC<AddLeadProps> = () => {
  const { addEditModalOpen, setAddEditModalOpen, getLeads } = useLeads();

  const { form, loading, onSubmit } = useForm<{
    name: string;
    email: string;
    status: (typeof leadStatus)[number];
  }>({
    onSuccess: getLeads,
    submitEndpoint: '/api/crm/leads/create',
    beforeSubmit: (values) => ({
      body: { ...values },
      resourceIndex: {
        name: values.name,
        resourceType: 'leads',
        description: values.email,
      },
    }),
  });

  return (
    <Dialog
      open={addEditModalOpen}
      onOpenChange={(_, { open: o }) => setAddEditModalOpen(o)}
    >
      <DialogSurface>
        <form onSubmit={onSubmit}>
          <DialogBody>
            <DialogTitle>Create a new Lead</DialogTitle>

            <DialogContent>
              <Field label='Name' required>
                <Input {...form.register('name')} />
              </Field>

              <Field label='Email' required>
                <Input {...form.register('email')} />
              </Field>

              <Field label='Status' required>
                <select {...form.register('status')}>
                  {leadStatus.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </Field>
            </DialogContent>

            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance='secondary'>Close</Button>
              </DialogTrigger>
              <Button
                disabled={loading}
                onClick={onSubmit}
                appearance='primary'
              >
                Create
              </Button>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  );
};

export default AddLead;

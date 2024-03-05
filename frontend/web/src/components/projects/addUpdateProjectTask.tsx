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
  Select,
  Textarea,
} from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import React from 'react';

import useForm from '@awesome/shared/hooks/form';

const taskStatus = ['backlog', 'todo', 'inprogress', 'review', 'done'];

export type AddUpdateProjectTaskProps = {
  getTasks: (id: string) => Promise<void>;
  projectId: string;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialValues?: any;
};

const AddUpdateProjectTask: React.FC<AddUpdateProjectTaskProps> = ({
  getTasks,
  projectId,
  dialogOpen,
  setDialogOpen,
}) => {
  const auth = useAuthValue();

  const { form, onSubmit } = useForm<{
    name: string;
    description: string;
    taskStatus: string;
    assignedToId: number;
    deadline: string;
  }>({
    submitEndpoint: '/api/projects/tasks/create',
    onFinally: () => setDialogOpen(false),
    onSuccess: () => getTasks(projectId).catch(console.log),
    beforeSubmit: (data) => ({
      body: {
        ...data,
        projectId: Number(projectId),
        reportedById: auth?.user.id,
      },
    }),
  });

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(_, { open }) => setDialogOpen(open)}
    >
      <DialogSurface>
        <form onSubmit={onSubmit}>
          <DialogBody>
            <DialogTitle>Create a new Task</DialogTitle>
            <DialogContent>
              <Field label='Task Name' required>
                <Input {...form.register('name')} />
              </Field>

              <Field label='Description'>
                <Textarea {...form.register('description')} />
              </Field>

              <Field label='Task Status' required>
                <Select {...form.register('taskStatus')}>
                  {taskStatus.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field label='Assigned To' required>
                {/*  */}
              </Field>

              <Field label='Deadline' required>
                <DatePicker
                  placeholder='Select a date...'
                  {...form.register('deadline')}
                />
              </Field>
            </DialogContent>

            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance='secondary'>Close</Button>
              </DialogTrigger>
              <Button appearance='primary' onClick={onSubmit}>
                Create
              </Button>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  );
};

export default AddUpdateProjectTask;

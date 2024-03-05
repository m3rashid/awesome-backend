import { SubmitHandler, useForm as useHookForm } from 'react-hook-form';

import useLoading from './loading';
import { service } from '../utils/service';
import { resourceTypes } from '../types/search';

type useFormProps<T> = {
  submitEndpoint: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onFinally?: () => void;
  initialValues?: T;
  beforeSubmit?: (values: T) => {
    body: T;
    resourceIndex?: {
      name: string;
      resourceType: (typeof resourceTypes)[number];
      description?: string;
    };
  };
};

const useForm = <T extends Record<string, any>>({
  submitEndpoint,
  initialValues,
  onError,
  onSuccess,
  onFinally,
  beforeSubmit,
}: useFormProps<T>) => {
  const { loading, start, stop } = useLoading();
  const form = useHookForm<T>({
    shouldFocusError: true,
    values: initialValues,
  });

  const formSubmitHandler: SubmitHandler<T> = async (values) => {
    try {
      start('submit');

      const requestBody = beforeSubmit
        ? beforeSubmit(values)
        : { body: values };
      const postService = service(submitEndpoint, { method: 'POST' });
      const { data } = await postService({
        data: requestBody,
      });

      form.reset();
      onSuccess && onSuccess(data);
    } catch (err: any) {
      console.log(err);
      onError && onError(err);
    } finally {
      stop('submit');
      onFinally && onFinally();
    }
  };

  return {
    form,
    loading,
    onSubmit: form.handleSubmit(formSubmitHandler),
  };
};

export default useForm;

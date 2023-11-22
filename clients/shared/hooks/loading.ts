import { useState } from 'react';

type CarrierFunction<FunctionArgs extends Array<any>, FunctionResponse> = (
  ...args: FunctionArgs
) => Promise<FunctionResponse>;

const useLoading = (loadingState: string[] = []) => {
  const [queue, setQueue] = useState<string[]>(loadingState || []);

  const start = (name: string): void => {
    setQueue((currentQueue) => [...currentQueue, name]);
  };
  const stop = (name: string): void => {
    setQueue((currentQueue) => currentQueue.filter((item) => item !== name));
  };

  const loading = queue.length > 0;

  const loader =
    <FunctionArgs extends Array<any>, FunctionResponse>(
      name: string,
      func: CarrierFunction<FunctionArgs, FunctionResponse>
    ): CarrierFunction<FunctionArgs, FunctionResponse | null> =>
    async (...args: FunctionArgs) => {
      try {
        // const result = (await func(...args).catch(handleError(`${name} failed`))) || null;
        start(name);
        // NProgress.start();
        const result: FunctionResponse | null = await func(...args);
        return result;
      } catch (err: any) {
        console.error(`Error in ${name} loader`, err);
        return null;
      } finally {
        stop(name);
        // NProgress.done();
      }
    };

  return {
    stop,
    start,
    loader,
    loading,
  };
};

export default useLoading;

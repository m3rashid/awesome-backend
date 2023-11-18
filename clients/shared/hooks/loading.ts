import { useState } from 'react';

const useLoading = () => {
  const [que, setQue] = useState<string[]>([]);

  const start = (name: string): void => {
    setQue((currentQue) => [...currentQue, name]);
  };

  const stop = (name: string): void => {
    setQue((currentQue) => {
      const index = currentQue.indexOf(name);
      return currentQue.filter((_, i) => i !== index);
    });
  };

  const loading = que.length > 0;

  return {
    loading,
    start,
    stop,
  };
};

export default useLoading;

import { useEffect, useRef, useState } from 'react';

export type UseScriptParams = {
  url: string;
  async?: boolean;
  onload?: () => void;
};

export const useScript = ({ url, async = true, onload }: UseScriptParams) => {
  useEffect(() => {
    const element = document.querySelector('body');
    const script = document.createElement('script');
    script.src = url;
    script.async = async;
    if (onload) script.onload = onload;
    if (element) element.appendChild(script);
    return () => {
      if (element) element.removeChild(script);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
};

export const getRandomId = () => Math.random().toString(36).substr(2, 9);

export const useComponentId = () => {
  const id = useRef<string>(getRandomId());
  return id.current;
};

export const useDidMount = (effect: () => void | (() => void), deps: any[]) => {
  const effectFn = useRef<() => void | (() => void)>(effect);
  const destroyFn = useRef<void | (() => void)>();
  const effectCalled = useRef(false);
  const rendered = useRef(false);
  const [, setVal] = useState<number>(0);

  if (effectCalled.current) {
    rendered.current = true;
  }

  useEffect(() => {
    if (!effectCalled.current) {
      destroyFn.current = effectFn.current();
      effectCalled.current = true;
    }

    setVal((val) => val + 1);
    return () => {
      if (!rendered.current) {
        return;
      }
      if (destroyFn.current) {
        destroyFn.current();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

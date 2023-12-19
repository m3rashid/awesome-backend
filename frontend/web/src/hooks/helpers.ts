import { useEffect } from 'react';

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

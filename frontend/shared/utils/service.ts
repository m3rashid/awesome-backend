import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const baseUrl = 'http://127.0.0.1:4000';

export type RequestOptions = Omit<AxiosRequestConfig, 'url' | 'baseURL'>;
export type OtherOptions = {
  token?: string;
  noBaseURL?: boolean;
};

export const service = <Res = any>(
  url: string,
  options: RequestOptions,
  noBaseUrl?: boolean
) => {
  const token = localStorage.getItem('awesome:token');

  return (config?: AxiosRequestConfig): Promise<AxiosResponse<Res>> => {
    return axios<Res>({
      url,
      method: options.method || 'GET',
      baseURL: noBaseUrl ? '' : baseUrl,
      ...(config || {}),
      headers: {
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  };
};

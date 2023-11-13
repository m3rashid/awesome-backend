import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

type RequestOptions = Omit<AxiosRequestConfig, 'url' | 'baseURL'>;

export const Service = <Res = any,>(
  url: string,
  options: RequestOptions
): Promise<AxiosResponse<Res>> => {
  return axios<Res>({
    url,
    method: options.method || 'GET',
    baseURL: import.meta.env.VITE_SERVER_HOST || '',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
};

export type Service<Res> = typeof Service<Res>;

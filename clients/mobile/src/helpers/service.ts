import {
  baseUrl,
  OtherOptions,
  RequestOptions,
} from '@awesome/shared/helpers/service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

export const service = async <Res = any>(
  url: string,
  options: RequestOptions,
  otherOptions: OtherOptions = {},
) => {
  return async (config?: AxiosRequestConfig): Promise<AxiosResponse<Res>> => {
    const token = await AsyncStorage.getItem('token');

    return axios<Res>({
      url,
      method: options.method || 'GET',
      baseURL: otherOptions.noBaseURL ? '' : baseUrl,
      withCredentials: true,
      ...(config || {}),
      headers: {
        ...(options.headers || {}),
        ...(token ? {Authorization: `Bearer ${token}`} : {}),
      },
    });
  };
};

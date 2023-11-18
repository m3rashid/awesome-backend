import {
  RequestOptions,
  service as sharedService,
} from '@awesome/shared/helpers/service';

export const service = <Res = any,>(
  url: string,
  options?: RequestOptions,
  noBaseUrl?: boolean
) => {
  return sharedService<Res>(url, options || {}, {
    noBaseURL: noBaseUrl,
    token: localStorage.getItem('token') || undefined,
  });
};

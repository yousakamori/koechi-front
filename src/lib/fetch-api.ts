import { HttpError } from '@/error/http-error';
import { API_URL } from '@/lib/constants';

export const fetchApi = async <T = unknown>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> => {
  const res: Response = await fetch(API_URL + encodeURI(endpoint), {
    mode: 'cors', // corsを許可
    credentials: 'include', // Cookieの送受信許可
    ...options,
    headers: {
      Accept: 'application/json',
      ...options?.headers,
    },
  });

  const contentType = res.headers.get('Content-Type');
  const isJSON = contentType?.includes('application/json');

  if (!res.ok) {
    const error = new HttpError(res);

    if (isJSON) {
      error.message = (await res.json()).message;
    }
    throw error;
  }

  return res.status === 204 ? null : await res.json();
};

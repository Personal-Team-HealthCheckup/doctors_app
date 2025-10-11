import { baseURL } from './config';
import { store } from '../redux/store';

type IResponseType = 'json' | 'text' | 'blob';
type IResolve<T = any> = {
  response: T | null;
  error: string | null;
};
type IMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const resolve = async <T>(promise: () => Promise<T>): Promise<IResolve<T>> => {
  const resolved: IResolve<T> = {
    response: null,
    error: null,
  };

  try {
    const response = await promise();
    resolved.response = response;
  } catch (e: any) {
    console.error('NetworkCall Error:', e);
    // If the error has a message, use it; otherwise fallback
    resolved.error =
      e?.message || 'Something went wrong. Please try again later.';
  }

  return resolved;
};

const networkCall = async <T = any>(
  url: string,
  method: IMethod = 'GET',
  body?: RequestInit['body'],
  headers?: RequestInit['headers'],
  responseType: IResponseType = 'json',
): Promise<IResolve<T>> => {
  const makeCall = async (): Promise<T> => {
    const fullUrl = /(http(s?)):\/\//i.test(url) ? url : `${baseURL}/${url}`;
    const AuthData = store.getState()?.Auth;
    const token = AuthData?.token;

    const defaultHeaders = {
      'Content-Type':
        body instanceof FormData ? 'multipart/form-data' : 'application/json',
      ...(token && { token }),
      ...headers,
    };

    const response = await fetch(fullUrl, {
      method,
      headers: defaultHeaders,
      ...(body && { body }),
    });

    if (!response.ok) {
      // Try to parse error message from server
      let errorMessage = `HTTP Error ${response.status}`;
      try {
        const data = await response.json();
        if (data?.message) errorMessage = data.message;
      } catch (e) {
        throw e;
      }
      throw new Error(errorMessage);
    }

    // Return response based on responseType
    return response[responseType]();
  };

  return resolve(makeCall);
};

export default networkCall;

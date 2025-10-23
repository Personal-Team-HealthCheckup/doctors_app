import { baseURL } from './config';
import { store } from '../redux/store';
import { getStoredAuthToken } from './authKeychain';

type IResponseType = 'json' | 'text' | 'blob';
type IResolve<T = any> = {
  response: T | null;
  error: string | null;
  errorResponse: any | null;
};
type IMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const resolve = async <T>(promise: () => Promise<T>): Promise<IResolve<T>> => {
  const resolved: IResolve<T> = {
    response: null,
    error: null,
    errorResponse: null,
  };

  try {
    const response = await promise();
    resolved.response = response;
  } catch (e: any) {
    console.error('NetworkCall Error:', e);
    resolved.error =
      e?.message || 'Something went wrong. Please try again later.';
    resolved.errorResponse = e?.response || e;
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
    const tokenStored = await getStoredAuthToken();
    const AuthData = store.getState()?.Auth;
    const token = AuthData?.token ?? tokenStored;

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
      let errorData: any = null;
      let errorMessage = `HTTP Error ${response.status}`;

      try {
        errorData = await response.json();
        if (errorData?.message) {
          errorMessage = errorData.message;
        }
      } catch (e) {
        console.warn('Error parsing error response:', e);
        throw e;
      }
      const error: any = new Error(errorMessage);
      error.response = errorData;
      throw error;
    }

    // Return response based on responseType
    return response[responseType]();
  };

  return resolve(makeCall);
};

export default networkCall;

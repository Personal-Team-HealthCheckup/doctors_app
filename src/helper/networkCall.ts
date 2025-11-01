import { baseURL } from './config';
import { store } from '../redux/store';
import { getStoredAuthToken } from './authKeychain';

type IResponseType = 'json' | 'text' | 'blob';
type IResolve<T = unknown> = {
  response: T | null;
  error: string | null;
  errorResponse: unknown;
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
  } catch (error: unknown) {
    console.error('NetworkCall Error:', error);
    resolved.error = deriveErrorMessage(error);
    resolved.errorResponse = extractErrorResponse(error);
  }

  return resolved;
};

const networkCall = async <T = unknown>(
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
    console.log('-----token ', token);

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
      let errorData: unknown = null;
      let errorMessage = `HTTP Error ${response.status}`;

      try {
        errorData = await response.json();
        if (
          typeof errorData === 'object' &&
          errorData !== null &&
          'message' in errorData &&
          typeof (errorData as { message?: unknown }).message === 'string'
        ) {
          errorMessage = (errorData as { message: string }).message;
        }
      } catch (e) {
        console.warn('Error parsing error response:', e);
        throw e;
      }
      const error = new Error(errorMessage) as Error & {
        response?: unknown;
      };
      error.response = errorData;
      throw error;
    }

    // Return response based on responseType
    return response[responseType]();
  };

  return resolve(makeCall);
};

const deriveErrorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message?: unknown }).message === 'string'
  ) {
    return (error as { message: string }).message;
  }

  return 'Something went wrong. Please try again later.';
};

const extractErrorResponse = (error: unknown): unknown => {
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error
  ) {
    return (error as { response?: unknown }).response ?? null;
  }

  return error;
};

export default networkCall;

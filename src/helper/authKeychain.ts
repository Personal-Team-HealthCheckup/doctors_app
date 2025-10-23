import * as Keychain from 'react-native-keychain';

const AUTH_USERNAME = 'auth';

export const storeAuthToken = async (token: string | null | undefined) => {
  if (!token) {
    return;
  }

  try {
    await Keychain.setGenericPassword(AUTH_USERNAME, token);
  } catch (error) {
    console.warn('Failed to store token in keychain', error);
  }
};

export const getStoredAuthToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    return credentials ? credentials.password : null;
  } catch (error) {
    console.warn('Failed to load token from keychain', error);
    return null;
  }
};

export const clearStoredAuthToken = async () => {
  try {
    await Keychain.resetGenericPassword();
  } catch (error) {
    console.warn('Failed to clear token from keychain', error);
  }
};

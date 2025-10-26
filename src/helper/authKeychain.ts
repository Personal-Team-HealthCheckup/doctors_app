import AsyncStorage from '../helper/Storage';
import * as Keychain from 'react-native-keychain';

const AUTH_USERNAME = 'auth';
const AUTH_BOOTSTRAP_FLAG_KEY = '@doctor_app/auth/keychainBootstrapped';

let hasBootstrappedAuthKeychain = false;

const markKeychainBootstrapped = async () => {
  try {
    await AsyncStorage.setItem(AUTH_BOOTSTRAP_FLAG_KEY, 'true');
  } catch (error) {
    console.warn('Failed to mark auth keychain bootstrapped', error);
  }
  hasBootstrappedAuthKeychain = true;
};

const ensureAuthKeychainBootstrapped = async () => {
  if (hasBootstrappedAuthKeychain) {
    return;
  }

  try {
    const alreadyBootstrapped = await AsyncStorage.getItem(
      AUTH_BOOTSTRAP_FLAG_KEY,
    );

    if (!alreadyBootstrapped) {
      await Keychain.resetGenericPassword();
      await markKeychainBootstrapped();
      return;
    }

    hasBootstrappedAuthKeychain = true;
  } catch (error) {
    console.warn('Failed to ensure auth keychain bootstrapped', error);
  }
};

export const storeAuthToken = async (token: string | null | undefined) => {
  if (!token) {
    return;
  }

  await ensureAuthKeychainBootstrapped();

  try {
    await Keychain.setGenericPassword(AUTH_USERNAME, token);
    if (!hasBootstrappedAuthKeychain) {
      await markKeychainBootstrapped();
    }
  } catch (error) {
    console.warn('Failed to store token in keychain', error);
  }
};

export const getStoredAuthToken = async (): Promise<string | null> => {
  await ensureAuthKeychainBootstrapped();

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

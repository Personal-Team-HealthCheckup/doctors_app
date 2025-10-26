import AsyncStorage from '@react-native-async-storage/async-storage';
import { salt } from './config';

const getItem = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (!data) {
      return null;
    }
    return decryption(data) ?? null;
  } catch (error) {
    console.warn('StorageProvider#getItem failed', error);
    return null;
  }
};

const setItem = async (key: string, value: unknown) => {
  try {
    const serialized =
      typeof value === 'string' ? value : JSON.stringify(value);

    if (serialized == null) {
      await AsyncStorage.removeItem(key);
      return;
    }

    const encoded = encryption(serialized);
    await AsyncStorage.setItem(key, encoded);
  } catch (error) {
    console.warn('StorageProvider#setItem failed', error);
  }
};
const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.warn('StorageProvider#removeItem failed', error);
  }
};

const StorageProvider = {
  getItem,
  setItem,
  removeItem,
};

export default StorageProvider;

const encryption = (decodeText: string) => {
  const textToChars = (text: string) =>
    text.split('').map(c => c.charCodeAt(0));
  const byteHex = (n: string) => ('0' + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code: any) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);

  return decodeText
    .split('')
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join('');
};

const decryption = (encoded: string) => {
  const textToChars = (text: string) =>
    text.split('').map(c => c.charCodeAt(0));
  const applySaltToChar = (code: any) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);
  const bytes = encoded.match(/.{1,2}/g);
  if (!bytes) {
    return null;
  }

  return bytes
    .map(hex => parseInt(hex, 16))
    .map(applySaltToChar)
    .map(charCode => String.fromCharCode(charCode))
    .join('');
};

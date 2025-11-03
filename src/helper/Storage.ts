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

const textToCodePoints = (text: string): number[] =>
  Array.from(text, char => char.codePointAt(0) ?? 0);

const saltCodePoints = textToCodePoints(salt);

const byteHex = (n: number) => n.toString(16).padStart(2, '0');

const applySaltToChar = (code: number) =>
  saltCodePoints.reduce((acc, saltCode) => acc ^ saltCode, code);

const encryption = (decodeText: string) =>
  textToCodePoints(decodeText).map(applySaltToChar).map(byteHex).join('');

const decryption = (encoded: string) => {
  const bytes = encoded.match(/.{1,2}/g);
  if (!bytes) {
    return null;
  }

  return bytes
    .map(hex => Number.parseInt(hex, 16))
    .map(applySaltToChar)
    .map(charCode => String.fromCodePoint(charCode))
    .join('');
};

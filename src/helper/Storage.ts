import AsyncStorage from '@react-native-async-storage/async-storage';
import { salt } from './config';

const getItem = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data && decryption(data);
  } catch (error) {
    return undefined;
  }
};

const setItem = async (key: string, value: unknown) => {
  try {
    await AsyncStorage.setItem(key, encryption(JSON.stringify(value)));
    return true;
  } catch (error) {
    return false;
  }
};

const StorageProvider = {
  getItem,
  setItem,
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
  return encoded
    .match(/.{1,2}/g)
    ?.map(hex => parseInt(hex, 16))
    .map(applySaltToChar)
    .map(charCode => String.fromCharCode(charCode))
    .join('');
};

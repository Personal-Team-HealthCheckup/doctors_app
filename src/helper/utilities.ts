import moment from 'moment';
import {
  Keyboard,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';
import { Navigation } from '../global/types';

const secretKey = 'secret-strong-key'; // Use a strong key from environment variables in production

export const formateDate = (date: string | Date) => {
  return moment(date).format('DD-MM-YYYY');
};

export const checkEmailValidation = (email: string) => {
  const regEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regEx.test(String(email).toLowerCase().trim());
};

export const closeKeyBoard = () => {
  Keyboard.dismiss();
};

export const handleScroll = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => {
  const { y } = event.nativeEvent.contentOffset;
  return y > 10;
};

export async function setStorageData(key: string, data: any) {
  if (key && data) {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKey,
    ).toString();
    await AsyncStorage.setItem(key, encryptedData);
  }
}

export async function getStorageData(
  key: string,
  parseToJson: boolean = false,
) {
  if (key) {
    const encryptedData = (await AsyncStorage.getItem(key)) || null;
    if (encryptedData) {
      const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      if (parseToJson && decryptedData) {
        return JSON.parse(decryptedData);
      } else {
        return decryptedData;
      }
    }
  }
  return null;
}

export async function removeStorageData(key: string) {
  if (key) {
    await AsyncStorage.removeItem(key);
  }
}

// navigate to single screen
export const navigateTo = (
  navigation?: Navigation,
  screenName: string = '',
  params?: object,
) => {
  if (navigation && navigation.navigate) {
    navigation.navigate(screenName, params);
  }
};

// replace to single screen
export const replaceTo = (
  navigation: Navigation,
  screenName: string,
  params?: object,
) => {
  if (navigation && navigation.replace) {
    navigation.replace(screenName, params);
  }
};

// navigate to single screen with nested routes
export const nestedNavigateTo = (
  navigation: Navigation,
  screenName: string[],
  parentRouteName: string,
  params?: object,
) => {
  if (navigation && navigation.navigate) {
    let nestedParams = { ...params };
    for (let i = screenName.length - 1; i >= 0; i--) {
      nestedParams = { screen: screenName[i], params: nestedParams };
    }
    navigation.navigate(parentRouteName, nestedParams);
  }
};

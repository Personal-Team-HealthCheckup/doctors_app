import moment from 'moment';
import {
  Keyboard,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { Navigation } from '../global/types';

export const formateDate = (date: string | Date) => {
  return moment(date).format('DD-MM-YYYY');
};

export const checkEmailValidation = (email: string) => {
  const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regEx.test(String(email).toLowerCase().trim());
};

export const handleOnChange = (state: any, value: string, field: any) => {
  return { ...state, [field]: value, error: { ...state.error, [field]: '' } };
};

export const checkNameValidation = (name: string) => {
  const regEx = /^(?:[a-zA-Z]+(?: [a-zA-Z]+)*)+$/;
  return regEx.test(String(name).toLowerCase().trim());
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

// navigate to single screen
export const navigateTo = (
  navigation?: Navigation,
  screenName: string = '',
  params?: object,
) => {
  navigation?.navigate?.(screenName, params);
};

// go back to previous screen
export const goBack = (navigation?: Navigation) => {
  navigation?.goBack?.();
  closeDrawer(navigation);
};

// replace to single screen
export const replaceTo = (
  navigation?: Navigation,
  screenName: string = '',
  params?: object,
) => {
  navigation?.replace?.(screenName, params);
};

// close to drawer screen
export const closeDrawer = (navigation?: Navigation) => {
  navigation?.closeDrawer?.();
};

// navigate to single screen with nested routes
export const nestedNavigateTo = (
  navigation?: Navigation,
  screenName: string[] = [],
  parentRouteName: string = '',
  params?: object,
) => {
  if (!navigation?.navigate) {
    return;
  }
  let nestedParams = { ...params };
  for (let i = screenName.length - 1; i >= 0; i--) {
    nestedParams = { screen: screenName[i], params: nestedParams };
  }
  navigation.navigate(parentRouteName, nestedParams);
};

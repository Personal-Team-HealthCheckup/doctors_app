import moment from 'moment';
import {Keyboard, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';

export const formateDate = (date: string | Date) => {
  return moment(date).format('DD-MM-YYYY');
};

export const checkEmailValidation = (email: string) => {
  const regEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validEmail = regEx.test(String(email).toLowerCase().trim());
  if (!validEmail) {
    return false;
  }
  return true;
};

export const closeKeyBoard = () => {
  Keyboard.dismiss();
};

export const handleScroll = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
) => {
  const {y} = event.nativeEvent.contentOffset;
  if (y > 10) {
    return true;
  } else {
    return false;
  }
};

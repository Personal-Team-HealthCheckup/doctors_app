import moment from 'moment';

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

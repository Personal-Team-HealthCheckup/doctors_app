export const baseURL = 'http://10.129.124.247:4000/api/'; // add the base url here

// add the endpoints here like this
export const endpoints = {
  LOGIN: 'signin',
  REGISTER: 'signup',
  VERIFYOTP: 'verifyotp',
  RESEND_OTP: 'resend-otp',
  GET_PRODUCTS: 'products',
  SINGLE_PRODUCTS: 'products/:productId',
  GET_CATEGORIES: 'products/get-categories',
};

export const salt = 'doctor_app_salt'; // add the salt here from env

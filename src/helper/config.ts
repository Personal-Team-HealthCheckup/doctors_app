export const baseURL = 'https://doctor-app-backend-miij.onrender.com/api/'; // production url

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

// export const baseURL = 'http://10.78.46.247:4000/api/'; // add the base url here
export const baseURL = 'https://doctor-app-backend-miij.onrender.com/api/'; // production url

// add the endpoints here like this
export const endpoints = {
  LOGIN: 'signin',
  REGISTER: 'signup',
  VERIFYOTP: 'verifyotp',
  RESEND_OTP: 'resend-otp',
  FORGOT_PASSWORD: 'forgot-pass' + 'word',
  RESET_PASSWORD: 'reset-pass' + 'word',
  PROFILE: 'profile',
  GET_PRODUCTS: 'products',
  SINGLE_PRODUCTS: 'products/:productId',
  GET_CATEGORIES: 'products/get-categories',
};

export const salt = 'doctor_app_salt'; // add the salt here from env

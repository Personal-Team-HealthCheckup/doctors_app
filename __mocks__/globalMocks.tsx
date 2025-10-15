import { View as MockView } from 'react-native';
import React, { use } from 'react';

jest.mock('react-native-linear-gradient', () => (props: {}) => (
  <MockView {...props} />
));

jest.mock('react-native-vector-icons/Entypo', () => (props: {}) => (
  <MockView {...props} />
));

jest.mock('react-native-vector-icons/FontAwesome', () => (props: {}) => (
  <MockView {...props} />
));
jest.mock('react-native-vector-icons/FontAwesome5', () => (props: {}) => (
  <MockView {...props} />
));

jest.mock('../src/assets/assets', () => ({
  LightSvg: (props: {}) => <MockView {...props} />,
  NotificationBellSvg: (props: {}) => <MockView {...props} />,
  SearchSvg: (props: {}) => <MockView {...props} />,
  LogoSvg: (props: {}) => <MockView {...props} />,
  StarSvg: (props: {}) => <MockView {...props} />,
  GoogleSvg: (props: {}) => <MockView {...props} />,
  FacebookSvg: (props: {}) => <MockView {...props} />,
  gradientSignupPng: 'mocked-image',
  gradientPng: 'mocked-image',
  HomeScreenPng: 'mocked-image',
  HomeScreenPng2: 'mocked-image',
  starImage: 'mocked-image',
}));

jest.mock('../src/helper/Scale', () => ({
  moderateScale: (size: number) => size,
  verticalScale: (size: number) => size,
  scale: (size: number) => size,
  horizontalScale: (size: number) => size,
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock('react-redux', () => {
  return {
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
    connect:
      (mapStateToProps?: any, mapDispatchToProps?: any) => (Component: any) =>
        Component,
  };
});

jest.mock('@reduxjs/toolkit', () => {
  return {
    createSlice: jest.fn().mockImplementation(props => ({
      ...props,
      actions: { ...props.actions, actionLogout: jest.fn() },
    })),
    createAsyncThunk: jest.fn(),
    configureStore: jest.fn(),
  };
});

jest.mock('reactotron-react-native', () => ({
  setAsyncStorageHandler: jest.fn().mockImplementation(() => ({
    configure: jest.fn().mockReturnThis(),
    useReactNative: jest.fn().mockReturnThis(),
    use: jest.fn().mockReturnThis(),
    connect: jest.fn().mockReturnThis(),
    clear: jest.fn().mockReturnThis(),
    log: jest.fn().mockReturnThis(),
    error: jest.fn().mockReturnThis(),
    warn: jest.fn().mockReturnThis(),
    display: jest.fn().mockReturnThis(),
  })),
  createEnhancer: jest.fn(),
  trackGlobalErrors: jest.fn(),
}));

// jest.mock('i18n-js', () => ({
//   I18n: jest.fn().mockImplementation(() => ({
//     t: jest.fn(key => key),
//     locale: 'en',
//     enableFallback: false,
//     translations: { en: {} },
//     missingTranslation: { get: (text: string) => text },
//   })),
// }));

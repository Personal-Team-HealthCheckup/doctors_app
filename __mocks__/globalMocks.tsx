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
jest.mock('react-native-vector-icons/Feather', () => (props: {}) => (
  <MockView {...props} />
));

jest.mock('../src/assets/assets', () => ({
  LightSvg: (props: {}) => <MockView {...props} />,
  NotificationBellSvg: (props: {}) => <MockView {...props} />,
  SearchSvg: (props: {}) => <MockView {...props} />,
  LogoSvg: (props: {}) => <MockView {...props} />,
  StarSvg: (props: {}) => <MockView {...props} />,
  OnBoarding1Svg: (props: {}) => <MockView {...props} />,
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

const getMockState = () =>
  global.__TEST_REDUX_STATE__ ?? {
    Auth: {},
  };

const mockDispatch = jest.fn();

jest.mock('react-redux', () => {
  const setMockState = (state: unknown) => {
    global.__TEST_REDUX_STATE__ = state;
    mockDispatch.mockClear();
  };

  const useSelector = jest.fn(selector => selector(getMockState()));
  const useDispatch = jest.fn(() => mockDispatch);

  const connect =
    (mapStateToProps?: any, mapDispatchToProps?: any) => (Component: any) => {
      const ConnectedComponent = (props: any) => {
        const stateProps = mapStateToProps
          ? mapStateToProps(getMockState(), props)
          : {};

        let dispatchProps = {};
        if (typeof mapDispatchToProps === 'function') {
          dispatchProps = mapDispatchToProps(mockDispatch, props) ?? {};
        } else if (mapDispatchToProps) {
          dispatchProps = mapDispatchToProps;
        }

        return <Component {...stateProps} {...dispatchProps} {...props} />;
      };

      ConnectedComponent.displayName = `MockConnect(${
        Component.displayName || Component.name || 'Component'
      })`;
      (ConnectedComponent as any).WrappedComponent = Component;

      return ConnectedComponent;
    };

  const Provider = ({ children }: { children: React.ReactNode }) => children;

  return {
    useSelector,
    useDispatch,
    connect,
    Provider,
    __setMockState: setMockState,
    __getMockDispatch: () => mockDispatch,
  };
});

(global as any).__setMockReduxState = (state: unknown) => {
  global.__TEST_REDUX_STATE__ = state;
  mockDispatch.mockClear();
};

(global as any).__getMockReduxDispatch = () => mockDispatch;

jest.mock('@reduxjs/toolkit', () => jest.requireActual('@reduxjs/toolkit'));

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
  createEnhancer: jest.fn(() => (createStore: any) => (...args: any[]) => {
    const store = createStore(...args);
    return {
      ...store,
      dispatch: store.dispatch,
    };
  }),
  trackGlobalErrors: jest.fn(),
}));

jest.mock('../src/config/reactotron.config', () => ({
  createEnhancer: jest
    .fn()
    .mockImplementation(() => (createStore: any) => (...args: any[]) => {
      const store = createStore(...args);
      return {
        ...store,
        dispatch: store.dispatch,
      };
    }),
  display: jest.fn(),
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

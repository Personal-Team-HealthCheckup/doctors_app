import 'react-native-gesture-handler';
import React from 'react';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import MainStack from './src/navigation/MainStack';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { Linking, Platform } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';
interface AppProps {}

interface AppState {}

const packageName = 'com.doctor_app';

export const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: ['https://healthcheck-nine.vercel.app/Contact', '/Contact'],

  async getInitialURL(): Promise<string | null> {
    const url = await Linking.getInitialURL();
    return url;
  },

  subscribe(listener: (url: string) => void) {
    const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
      listener(url);
    });

    return () => {
      linkingSubscription.remove();
    };
  },

  config: {
    screens: {
      Main_Home: {
        screens: {
          SingleProduct: 'api/v1/products/:id',
        },
      },
    },
  },
};
class App extends React.Component<AppProps, AppState> {
  rnBiometrics = new ReactNativeBiometrics();
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }

  handleBiometrics = async () => {
    try {
      const result = await this.rnBiometrics.simplePrompt({
        promptMessage: 'Confirm fingerprint',
      });
      console.log('Fingerprint verified', result);
      return true;
    } catch (error) {
      console.log('Biometrics failed', error);
      return false;
    }
  };

  async componentDidMount() {
    //     if(await this.handleBiometrics()){
    // // login
    //     }else{
    // // navigate to login page
    //     };
    const initialUrl = await Linking.getInitialURL();
    if (initialUrl) {
      console.log('Initial URL:', initialUrl);
    }
  }

  // Check if app is installed
  isAppInstalled = async () => {
    try {
      const scheme =
        Platform.OS === 'ios' ? `yourAppScheme://` : `package:${packageName}`;
      const isInstalled = await Linking.canOpenURL(scheme);
      return isInstalled;
    } catch (error) {
      console.log('Error checking if app is installed', error);
      return false;
    }
  };

  // Open Play Store or App Store
  openStore = () => {
    const playStoreUrl = `market://details?id=${packageName}`;
    const appStoreUrl = 'https://apps.apple.com/app/your-app-id';

    const url = Platform.OS === 'android' ? playStoreUrl : appStoreUrl;
    Linking.openURL(url);
  };

  render() {
    if (__DEV__) {
      import('./src/config/reactotron.config').then(() =>
        console.log('Reactotron Configured'),
      );
    }
    return (
      <SafeAreaProvider>
        <NavigationContainer linking={linking}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <MainStack />
            </PersistGate>
          </Provider>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

export default App;

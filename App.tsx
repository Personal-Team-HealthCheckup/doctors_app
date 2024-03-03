import 'react-native-gesture-handler';
import React from 'react';
import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import MainStack from './src/navigation/MainStack';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {Linking} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
interface AppProps {}

interface AppState {}
// isAppInstalled: async () => {
//   const packageName = 'com.extwebtech.tejaorganic';
//   try {
//     const scheme: string = Platform.OS === 'ios' ? `yourAppScheme://` : `package:${packageName}`
//     const isInstalled = await Linking.canOpenURL(scheme);
//     return isInstalled;
//   } catch (error) {
//     return false;
//   }
// },
// openPlayStore: () => {
//   const packageName = 'com.extwebtech.tejaorganic';
//   const playStoreUrl = `market://details?id=${packageName}`;
//   const appStoreUrl = 'https://apps.apple.com/app/your-app-id';

//   const url: string = Platform.OS === 'android' ? playStoreUrl : appStoreUrl;
//   Linking.openURL(url);
// };
export const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: ['app://mychat', 'http://example.com'],

  async getInitialURL(): Promise<string | null> {
    const url = await Linking.getInitialURL();
    return url;
  },

  subscribe(listener: (arg0: string) => void) {
    const linkingSubscription = Linking.addEventListener('url', ({url}) => {
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

  handledata = async () => {
    try {
      const resultObject = await this.rnBiometrics.simplePrompt({
        promptMessage: 'Confirm fingerprint',
      });
      console.log('finger print verified', resultObject);
    } catch (error) {
      console.log('biometrics failed', error);
    }
  };
  async componentDidMount() {
    this.handledata();
    // Linking.addEventListener('url', event => {});
    // const response = await Linking.getInitialURL();
  }
  render() {
    return (
      <NavigationContainer linking={linking}>
        <Provider store={store}>
          <MainStack />
        </Provider>
      </NavigationContainer>
    );
  }
}

export default App;

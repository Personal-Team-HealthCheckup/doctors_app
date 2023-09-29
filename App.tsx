import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/navigation/MainStack';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
interface AppProps {}

interface AppState {}
class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <NavigationContainer>
        <Provider store={store}>
          <MainStack />
        </Provider>
      </NavigationContainer>
    );
  }
}

export default App;

import 'react-native-gesture-handler';
import React from 'react';
import Signin from './src/screen/auth/Signin';
interface AppProps {}

interface AppState {}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }
  render() {
    return <Signin />;
  }
}

export default App;

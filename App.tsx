import 'react-native-gesture-handler';
import React from 'react';
import Signup from './src/screen/auth/Signup';
interface AppProps {}

interface AppState {}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }
  render() {
    return <Signup />;
  }
}

export default App;

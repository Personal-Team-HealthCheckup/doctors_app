import 'react-native-gesture-handler';
import React from 'react';
import HomeStack from './src/navigation/HomeStack';
interface AppProps {}

interface AppState {}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }
  render() {
    return <HomeStack />;
  }
}

export default App;

import React from 'react';
import {Text} from 'react-native';

interface AppProps {}

interface AppState {}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Text>App</Text>
      </>
    );
  }
}

export default App;

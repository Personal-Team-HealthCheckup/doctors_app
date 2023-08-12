import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
interface AppProps {}

interface AppState {}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <SafeAreaView>
        <Text>App</Text>
        <EntypoIcon name="500px" size={23} color={'red'} />
      </SafeAreaView>
    );
  }
}

export default App;

import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';

interface SplashScreensProps {}

interface SplashScreensState {}

interface SplashScreensSS {}

class SplashScreens extends React.Component<
  SplashScreensProps,
  SplashScreensState,
  SplashScreensSS
> {
  constructor(props: SplashScreensProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <SafeAreaView>
        <StatusBar translucent />
        <View style={styles.container}>
          <Text>Splashscrern</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default SplashScreens;

const styles = StyleSheet.create({
  container: {},
});

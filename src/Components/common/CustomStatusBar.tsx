import React, { Component } from 'react';
import { ColorValue, Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { COLORS } from '../../global/theme';

interface IProps {
  backgroundColor?: ColorValue;
  isScrollEnabled?: boolean;
}
interface IState { }
class CustomStatusBar extends Component<IProps, IState> {
  render() {
    const { backgroundColor = "transparent", isScrollEnabled } = this.props;
    // if (Platform.OS === 'ios') {
    //   return <View style={[styles.statusBar, { backgroundColor: backgroundColor ?? COLORS.black }]}>
    //     <SafeAreaView>
    //       <StatusBar
    //         barStyle={backgroundColor ? 'dark-content' : 'light-content'}
    //         backgroundColor={backgroundColor}
    //         networkActivityIndicatorVisible
    //       />
    //     </SafeAreaView>
    //   </View >
    // }
    return (
      <StatusBar
        barStyle={isScrollEnabled ? 'dark-content' : 'light-content'}
        translucent // to get background transparent in android
        backgroundColor={backgroundColor}
        networkActivityIndicatorVisible
      />
    );
  }
}
export default CustomStatusBar;

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
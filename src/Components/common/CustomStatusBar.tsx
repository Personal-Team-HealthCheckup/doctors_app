import React, {Component} from 'react';
import {StatusBar} from 'react-native';

class CustomStatusBar extends Component {
  render() {
    return (
      <StatusBar
        barStyle={'light-content'}
        translucent // to get background transparent in android
        backgroundColor={'transparent'}
        networkActivityIndicatorVisible
      />
    );
  }
}
export default CustomStatusBar;

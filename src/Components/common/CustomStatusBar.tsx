import React, {Component} from 'react';
import {ColorValue, StatusBar} from 'react-native';

interface IProps {
  backgroundColor?: ColorValue;
  isScrollEnabled?: boolean;
}
interface IState {}
class CustomStatusBar extends Component<IProps, IState> {
  render() {
    const {backgroundColor = 'transparent', isScrollEnabled} = this.props;
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

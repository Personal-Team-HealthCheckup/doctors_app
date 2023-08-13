import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {COLORS} from '../global/colors';

const CustomMainView: React.FC<{
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}> = ({children, style}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default CustomMainView;
const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    backgroundColor: COLORS.black,
  },
});

import {
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import { COLORS, FONTS } from '../../global/theme';
import { moderateScale } from '../../helper/Scale';
interface CustomGButtonProps {
  style?: StyleProp<ViewStyle>;
  tittle: string;
  onPress?: () => void;
  textStyle?: StyleProp<TextStyle>;
  isGray?: boolean;
  testID?: string;
  disabled?: boolean;
}
const CustomGButton: React.FC<CustomGButtonProps> = ({
  style,
  tittle,
  onPress,
  textStyle,
  testID = 'custom-g-button',
  isGray = false,
  disabled = false,
}) => {
  let colors = [COLORS.greeen2, COLORS.greeen1];
  if (isGray) {
    colors = [COLORS.gradientWhite, COLORS.lightBlack2];
  }
  if (disabled) {
    colors = ['#2F4F4FE5', '#3B6F6F'];
  }

  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={isGray ? { x: 1, y: 0.7748 } : { x: 1, y: 1 }}
      style={[styles.linearGradient, style, disabled && { opacity: 0.9 }]}
    >
      <TouchableOpacity
        style={styles.buttonView}
        testID={testID}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={[styles.buttonText, textStyle]}>{tittle}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default CustomGButton;

const styles = StyleSheet.create({
  linearGradient: {
    borderRadius: moderateScale(8),
    width: responsiveScreenWidth(75),
    height: responsiveScreenHeight(7),
  },
  buttonText: {
    fontSize: moderateScale(18),
    fontFamily: FONTS.rubik.medium,
    textAlign: 'center',
    color: COLORS.white,
    backgroundColor: 'transparent',
    textTransform: 'capitalize',
  },
  buttonView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
});

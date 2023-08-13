import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {moderateScale, verticalScale} from '../helper/Scale';
import {COLORS} from '../global/colors';
interface ButtonProps {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}
const CustomButton: React.FC<ButtonProps> = ({title, onPress, style}) => {
  return (
    <TouchableOpacity style={[styles.buttonView, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
const styles = StyleSheet.create({
  buttonView: {
    width: responsiveScreenWidth(100),
    height: verticalScale(54),
    flexDirection: 'row',
    paddingVertical: responsiveHeight(2),
    backgroundColor: COLORS.black2gray,
    borderRadius: moderateScale(12.39),
    justifyContent: 'center',
    paddingHorizontal: responsiveScreenWidth(10),
  },
  buttonText: {
    color: COLORS.white2gray,
  },
});

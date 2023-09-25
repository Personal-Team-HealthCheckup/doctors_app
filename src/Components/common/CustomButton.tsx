import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../helper/Scale';
import {COLORS} from '../../global/colors';
import {FONTS} from '../../assets/assets';
interface ButtonProps {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  Icon?: React.JSX.Element;
}
const CustomButton: React.FC<ButtonProps> = ({title, onPress, style, Icon}) => {
  return (
    <TouchableOpacity style={[styles.buttonView, style]} onPress={onPress}>
      {Icon && Icon}
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
    paddingVertical: verticalScale(1),
    backgroundColor: COLORS.black2gray,
    borderRadius: moderateScale(12.39),
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(10),
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white2gray,
    fontFamily: FONTS.rubik.light,
    fontSize: moderateScale(16),
    marginLeft: responsiveScreenWidth(5),
  },
});

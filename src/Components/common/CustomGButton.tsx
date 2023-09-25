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
import {COLORS} from '../../global/colors';
import {moderateScale} from '../../helper/Scale';
import {FONTS} from '../../assets/assets';
interface CustomGButtonProps {
  style?: StyleProp<ViewStyle>;
  tittle: string;
  onPress?: () => void;
  textStyle?: StyleProp<TextStyle>;
}
const CustomGButton: React.FC<CustomGButtonProps> = ({
  style,
  tittle,
  onPress,
  textStyle,
}) => {
  return (
    <LinearGradient
      colors={[COLORS.greeen2, COLORS.greeen1]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={[styles.linearGradient, style]}>
      <TouchableOpacity style={styles.buttonView} onPress={onPress}>
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

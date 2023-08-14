import {
  StyleSheet,
  TextInput,
  StyleProp,
  TextStyle,
  View,
  Text,
} from 'react-native';
import React from 'react';
import {COLORS} from '../global/colors';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {moderateScale} from '../helper/Scale';
import {FONTS} from '../assets/assets';
interface TextInputProps {
  style?: StyleProp<TextStyle>;
  placeholder?: string;
  value?: string;
  placeholderTextColor?: string;
  onChangeText?: (value: string) => void;
  secureTextEntry?: boolean;
  errMessage?: string;
}
const CustomTextInput: React.FC<TextInputProps> = ({
  style,
  placeholder,
  value,
  placeholderTextColor,
  onChangeText,
  secureTextEntry,
  errMessage,
}) => {
  return (
    <View style={styles.view}>
      <TextInput
        placeholder={placeholder}
        value={value}
        style={[styles.textInput, style]}
        placeholderTextColor={
          placeholderTextColor ? placeholderTextColor : COLORS.white2gray
        }
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      {errMessage && <Text style={styles.errMessage}>{errMessage}</Text>}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: COLORS.black2gray,
    width: responsiveScreenWidth(90),
    borderRadius: moderateScale(12.685),
    paddingHorizontal: responsiveScreenWidth(8),
    paddingVertical: responsiveScreenHeight(2),
    fontFamily: FONTS.rubik.light,
    fontSize: moderateScale(16),
    color: COLORS.white,
    height: responsiveScreenHeight(8),
  },
  errMessage: {
    position: 'absolute',
    bottom: responsiveScreenHeight(0),
    color: COLORS.red,
    fontFamily: FONTS.rubik.light,
    fontSize: moderateScale(12),
  },
  view: {
    position: 'relative',
    height: responsiveScreenHeight(10.5),
    marginBottom: responsiveScreenHeight(0.5),
  },
});

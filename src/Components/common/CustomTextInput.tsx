import {
  StyleSheet,
  TextInput,
  StyleProp,
  TextStyle,
  View,
  Text,
} from 'react-native';
import React from 'react';
import { COLORS, FONTS } from '../../global/theme';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import { moderateScale } from '../../helper/Scale';
interface TextInputProps extends React.ComponentProps<typeof TextInput> {
  style?: StyleProp<TextStyle>;
  placeholder?: string;
  value?: string;
  placeholderTextColor?: string;
  onChangeText?: (value: string) => void;
  secureTextEntry?: boolean;
  errorMessage?: string;
  label?: string;
  editable?: boolean;
}
const CustomTextInput: React.FC<TextInputProps> = ({
  style,
  placeholder,
  value,
  placeholderTextColor,
  onChangeText,
  secureTextEntry,
  errorMessage,
  editable = true,
  label,
  ...props
}) => {
  return (
    <View style={styles.view}>
      {label && <Text style={styles.labelStyles}>{label}</Text>}
      <TextInput
        {...props}
        placeholder={placeholder}
        value={value}
        style={[
          styles.textInput,
          style,
          errorMessage && styles.errorStylesTextInput,
        ]}
        placeholderTextColor={
          placeholderTextColor ? placeholderTextColor : COLORS.white2gray
        }
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={editable}
      />
      {errorMessage && <Text style={styles.errMessage}>{errorMessage}</Text>}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  errorStylesTextInput: {
    borderWidth: 1,
    borderColor: COLORS.red,
  },
  labelStyles: {
    fontFamily: FONTS.rubik.regular,
    fontSize: moderateScale(13),
    color: COLORS.white,
    marginBottom: responsiveScreenHeight(0.1),
  },
  textInput: {
    backgroundColor: COLORS.black2gray,
    width: responsiveScreenWidth(90),
    borderRadius: moderateScale(12.685),
    paddingHorizontal: 20,
    paddingVertical: responsiveScreenHeight(2),
    fontFamily: FONTS.rubik.light,
    fontSize: moderateScale(16),
    color: COLORS.white,
    height: responsiveScreenHeight(7),
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
    height: responsiveScreenHeight(9.5),
    marginVertical: responsiveScreenHeight(0.5),
  },
});

import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputKeyPressEventData,
  NativeSyntheticEvent,
} from 'react-native';
import { COLORS, FONTS } from '../global/theme';
import { responsiveHeight } from 'react-native-responsive-dimensions';

interface OTPTextInputProps {
  length?: number;
  onChangeOTP?: (otp: string) => void;
  value: string;
  testID?: string;
}

const OTPTextInput: React.FC<OTPTextInputProps> = ({
  length = 4,
  onChangeOTP,
  value,
  testID,
}) => {
  const [otp, setOtp] = useState<string[]>(
    value ? value.split('') : new Array(length).fill(''),
  );
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    onChangeOTP?.(newOtp.join(''));

    // Move to next input automatically
    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (event.nativeEvent.key === 'Backspace' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          testID={testID && `${testID}-${index}`}
          key={index}
          ref={(ref: any) => (inputs.current[index] = ref)}
          style={styles.input}
          keyboardType="number-pad"
          maxLength={1}
          value={digit}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          textAlign="center"
          selectionColor="#2DA0A4"
          placeholder=""
          placeholderTextColor="#A0A0A0"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    marginTop: responsiveHeight(5),
  },
  input: {
    width: 65,
    height: 60,
    borderRadius: 12,
    fontSize: 26,
    color: COLORS.green,
    backgroundColor: COLORS.lightBlack3,
    fontFamily: FONTS.spaceGrotesk.bold,
  },
});

export default OTPTextInput;

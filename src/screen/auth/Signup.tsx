import React from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomStatusBar from '../../Components/CustomStatusBar';
import {
  FONTS,
  FacebookSvg,
  GoogleSvg,
  LogoSvg,
  StarSvg,
  gradientSignupPng,
} from '../../assets/assets';
import {COLORS} from '../../global/colors';
import {
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {moderateScale, verticalScale} from '../../helper/Scale';
import CustomButton from '../../Components/CustomButton';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomIcons from 'react-native-vector-icons/FontAwesome5';
import CustomGButton from '../../Components/CustomGButton';

interface SignupProps {}

interface SignupState {
  isChecked: boolean;
}
class Signup extends React.Component<SignupProps, SignupState> {
  constructor(props: SignupProps) {
    super(props);
    this.state = {
      isChecked: false,
    };
  }

  toggleCheck = () => {
    this.setState(prev => ({isChecked: !prev.isChecked}));
  };
  navigateToLogin = () => {};
  render() {
    return (
      <>
        <CustomStatusBar />

        <KeyboardAvoidingView
          enabled
          style={styles.main}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView style={styles.main}>
            <ImageBackground source={gradientSignupPng} style={styles.image}>
              <StarSvg style={styles.imagesvg} />
              <StarSvg style={styles.imagesvg2} />
              <Text style={styles.textSignup}>Sign up</Text>
              <LogoSvg
                width={responsiveScreenWidth(70)}
                height={
                  Platform.OS === 'ios'
                    ? responsiveHeight(15)
                    : responsiveHeight(13)
                }
                style={styles.svg}
                resizeMode="cover"
              />
              <Text style={styles.subText}>
                VHA is an innovated, automated system and the very first
                blockchain based Virtual Health Assistant that will provide
                immediate medical assistance to the patients 24/7.
              </Text>
              <View style={styles.googleView}>
                <CustomButton
                  Icon={<GoogleSvg />}
                  style={styles.buttonView}
                  title="Google"
                />
                <CustomButton
                  Icon={<FacebookSvg />}
                  style={styles.buttonView}
                  title="Facebook"
                />
              </View>
              <View style={styles.inputView}>
                <CustomTextInput placeholder="Name" />
                <CustomTextInput placeholder="Email" />
                <CustomTextInput placeholder="Password" />
                <Pressable
                  style={styles.buttonCheck}
                  onPress={this.toggleCheck}>
                  <CustomIcons
                    name={this.state.isChecked ? 'check-circle' : 'circle'}
                    size={20}
                    color={
                      this.state.isChecked ? COLORS.green : COLORS.greyBlack
                    }
                  />
                  <Text style={styles.textIAgree}>
                    I agree with the Terms of Service & Privacy Policy
                  </Text>
                </Pressable>
              </View>
              <CustomGButton tittle="Sign up" style={styles.buttonView1} />
              <View style={styles.lastView}>
                <Text style={styles.textIhave}>Have an account?</Text>
                <Text style={styles.textIhave} onPress={this.navigateToLogin}>
                  Log in
                </Text>
              </View>
            </ImageBackground>
          </ScrollView>
        </KeyboardAvoidingView>
      </>
    );
  }
}

export default Signup;
const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: 'center',
    resizeMode: 'cover',
    paddingTop: responsiveHeight(7),
    position: 'relative',
    paddingHorizontal: responsiveScreenWidth(5),
  },
  textSignup: {
    color: COLORS.white,
    fontFamily: FONTS.rubik.medium,
    fontSize: moderateScale(26),
    textTransform: 'capitalize',
  },
  main: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    backgroundColor: COLORS.black,
  },
  imagesvg: {
    position: 'absolute',
    top: responsiveHeight(7),
    right: responsiveScreenWidth(33),
    zIndex: -1,
  },
  imagesvg2: {
    position: 'absolute',
    top: responsiveHeight(15),
    right: responsiveScreenWidth(24),
    zIndex: -1,
  },
  svg: {
    width: responsiveScreenWidth(70),
  },
  subText: {
    fontFamily: FONTS.rubik.regular,
    fontSize: moderateScale(14),
    color: COLORS.white2gray,
    textAlign: 'center',
  },
  googleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsiveHeight(2),
    width: '100%',
  },
  buttonView: {
    width: '48.5%',
    height: verticalScale(54),
  },
  inputView: {
    marginTop: responsiveHeight(5),
  },
  circle: {},
  textIAgree: {
    fontFamily: FONTS.rubik.regular,
    fontSize: moderateScale(12),
    color: COLORS.white2gray,
    marginLeft: responsiveScreenWidth(2),
  },
  buttonCheck: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonView1: {
    marginTop: responsiveHeight(7),
  },
  lastView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: COLORS.white2gray,
  },
  textIhave: {
    fontFamily: FONTS.rubik.regular,
    fontSize: moderateScale(14),
    color: COLORS.green,
    marginVertical: responsiveHeight(2),
  },
});

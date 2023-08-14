import React from 'react';
import {ImageBackground, Platform, StyleSheet, Text, View} from 'react-native';
import CustomStatusBar from '../../Components/CustomStatusBar';
import {
  FONTS,
  FacebookSvg,
  GoogleSvg,
  LogoSvg,
  StarSvg,
  gradientSignupPng,
} from '../../assets/assets';
import CustomMainView from '../../Components/CustomMainView';
import {COLORS} from '../../global/colors';
import {
  responsiveHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {moderateScale, verticalScale} from '../../helper/Scale';
import CustomButton from '../../Components/CustomButton';
import CustomTextInput from '../../Components/CustomTextInput';

interface SignupProps {}

interface SignupState {}
class Signup extends React.Component<SignupProps, SignupState> {
  constructor(props: SignupProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <CustomStatusBar />
        <CustomMainView style={styles.main}>
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
              <CustomTextInput
                placeholder="Name"
                errMessage="something went wrong."
              />
              <CustomTextInput
                placeholder="Name"
                // errMessage="something went wrong"
              />
              <CustomTextInput
                placeholder="Name"
                // errMessage="something went wrong"
              />
            </View>
          </ImageBackground>
        </CustomMainView>
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
  main: {},
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
});

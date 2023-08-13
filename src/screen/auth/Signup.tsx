import React from 'react';
import {ImageBackground, StyleSheet, Text} from 'react-native';
import CustomStatusBar from '../../Components/CustomStatusBar';
import {FONTS, LogoSvg, StarSvg, gradientSignupPng} from '../../assets';
import CustomMainView from '../../Components/CustomMainView';
import {COLORS} from '../../global/colors';
import {
  responsiveHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {moderateScale} from '../../helper/Scale';

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
            <LogoSvg width={responsiveScreenWidth(70)} style={styles.svg} />
            <Text style={styles.subText}>
              VHA is an innovated, automated system and the very first
              blockchain based Virtual Health Assistant that will provide
              immediate medical assistance to the patients 24/7.
            </Text>
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
});

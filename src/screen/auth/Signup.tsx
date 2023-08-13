import React from 'react';
import {ImageBackground, StyleSheet, Text} from 'react-native';
import CustomStatusBar from '../../Components/CustomStatusBar';
import {StarSvg, gradientSignupPng} from '../../assets';
import CustomMainView from '../../Components/CustomMainView';
import {COLORS} from '../../global/colors';
import {
  responsiveHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

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
            <Text style={styles.textSignup}>Signup</Text>
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
  },
  textSignup: {color: COLORS.white},
  main: {},
  imagesvg: {
    position: 'absolute',
    top: responsiveHeight(6),
    right: responsiveScreenWidth(40),
    zIndex: -1,
  },
  imagesvg2: {
    position: 'absolute',
    top: responsiveHeight(10),
    right: responsiveScreenWidth(30),
    zIndex: -1,
  },
});

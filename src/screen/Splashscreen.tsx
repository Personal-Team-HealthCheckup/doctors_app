import React from 'react';
import {ImageBackground, StatusBar, StyleSheet, Text, View} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {COLORS} from '../global/colors';
import {
  BinanceLogoSvg,
  FONTS,
  HexagonSvg,
  LogoSvg,
  gradientPng,
} from '../assets';
import {moderateScale} from '../helper/Scale';
interface SplashScreensProps {}

interface SplashScreensState {}

interface SplashScreensSS {}

class SplashScreens extends React.Component<
  SplashScreensProps,
  SplashScreensState,
  SplashScreensSS
> {
  constructor(props: SplashScreensProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <StatusBar
          barStyle={'light-content'}
          translucent // to get background transparent in android
          backgroundColor={'transparent'}
        />
        <View style={styles.container}>
          <ImageBackground source={gradientPng} style={styles.image}>
            <LogoSvg style={styles.svg} />
            <HexagonSvg style={styles.svg2} />
            <Text style={styles.text}>Powered By</Text>
            <BinanceLogoSvg />
          </ImageBackground>
        </View>
      </>
    );
  }
}

export default SplashScreens;

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    backgroundColor: COLORS.black,
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: responsiveHeight(10),
  },
  text: {
    color: COLORS.white,
    fontFamily: FONTS.poppins.semiBold,
    textTransform: 'capitalize',
    fontSize: moderateScale(15.13),
  },
  svg: {marginBottom: 0, width: responsiveWidth(100)},
  svg2: {
    marginBottom: responsiveHeight(7),
  },
});

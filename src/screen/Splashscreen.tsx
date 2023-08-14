import React from 'react';
import {ImageBackground, StyleSheet, Text} from 'react-native';
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
} from '../assets/assets';
import {moderateScale} from '../helper/Scale';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomMainView from '../Components/CustomMainView';
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
        <CustomStatusBar />
        <CustomMainView style={styles.container}>
          <ImageBackground source={gradientPng} style={styles.image}>
            <LogoSvg
              width={responsiveWidth(100)}
              height={responsiveHeight(15)}
              style={styles.svg}
            />
            <HexagonSvg
              width={responsiveWidth(80)}
              height={responsiveHeight(30)}
              style={styles.svg2}
            />
            <Text style={styles.text}>Powered By</Text>
            <BinanceLogoSvg
              width={responsiveWidth(100)}
              height={responsiveHeight(10)}
            />
          </ImageBackground>
        </CustomMainView>
      </>
    );
  }
}

export default SplashScreens;

const styles = StyleSheet.create({
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
  container: {},
});

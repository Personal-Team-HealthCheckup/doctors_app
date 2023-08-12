import React from 'react';
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {COLORS} from '../global/colors';
import {
  BinanceLogoSvg,
  Gradient,
  HexagonSvg,
  LogoSvg,
  gradientPng,
} from '../assets';
import {Image} from 'react-native';
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
        <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} />
        <View style={styles.container}>
          <ImageBackground source={gradientPng} style={styles.image}>
            <LogoSvg />
            <HexagonSvg />
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
  },
  text: {
    color: COLORS.white,
  },
});

import React from 'react';
import {Animated, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {COLORS, FONTS} from '../global/theme';
import {
  BinanceLogoSvg,
  CheckImg,
  HexagonSvg,
  LogoSvg,
  gradientPng,
} from '../assets/assets';
import {moderateScale} from '../helper/Scale';
import CustomStatusBar from '../Components/common/CustomStatusBar';
import CustomMainView from '../Components/common/CustomMainView';
import {MAINSTACK} from '../Constants/Navigator';
import CustomLoader from '../Components/CustomLoader';
interface SplashScreensProps {
  navigation?: {
    replace: (args: string) => void;
  };
}

interface SplashScreensState {
  time: number;
  firstTime?: 'loading' | 'Check' | 'splashScreen';
}

interface SplashScreensSS {}

class SplashScreens extends React.Component<
  SplashScreensProps,
  SplashScreensState,
  SplashScreensSS
> {
  timer: number = 0;
  constructor(props: SplashScreensProps) {
    super(props);
    this.state = {
      time: 2000,
      firstTime: 'splashScreen',
    };
  }

  componentDidMount(): void {
    this.setState({firstTime: 'loading'});
    this.timer = Number(
      setTimeout(() => {
        this.setState({firstTime: 'Check'});
      }, 1000),
    );
    this.timer = Number(
      setTimeout(() => {
        this.setState({firstTime: 'splashScreen'});
      }, 2000),
    );
    this.timer = Number(
      setTimeout(() => {
        this.props.navigation?.replace(MAINSTACK.AUTHNAVIGATION);
      }, 3000),
    );
  }
  componentWillUnmount(): void {
    clearTimeout(this.timer);
  }
  render() {
    switch (this.state.firstTime) {
      case 'loading':
        return <CustomLoader />;
      case 'Check':
        return (
          <View style={styles.loadImg}>
            <Animated.Image source={CheckImg} style={[styles.image1]} />
          </View>
        );
    }
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
  loadImg: {
    flex: 1,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image1: {
    width: responsiveWidth(15),
    height: responsiveHeight(15),
    resizeMode: 'contain',
  },
});

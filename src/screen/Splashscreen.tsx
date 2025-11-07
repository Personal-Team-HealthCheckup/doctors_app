import React from 'react';
import {
  Animated,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { COLORS, FONTS } from '../global/theme';
import {
  BinanceLogoSvg,
  CheckImg,
  HexagonSvg,
  LogoSvg,
  gradientPng,
} from '../assets/assets';
import { moderateScale } from '../helper/Scale';
import CustomStatusBar from '../Components/common/CustomStatusBar';
import CustomMainView from '../Components/common/CustomMainView';
import { MAINSTACK } from '../Constants/Navigator';
import CustomLoader from '../Components/CustomLoader';
import { getStoredAuthToken } from '../helper/authKeychain';
interface SplashScreensProps {
  navigation?: {
    replace: (args: string) => void;
  };
}

type SplashStateStatus = 'loading' | 'Check' | 'splashScreen';

interface SplashScreensState {
  firstTime: SplashStateStatus;
}

interface SplashScreensSS {}

class SplashScreens extends React.Component<
  SplashScreensProps,
  SplashScreensState,
  SplashScreensSS
> {
  private timers: ReturnType<typeof setTimeout>[] = [];
  constructor(props: SplashScreensProps) {
    super(props);
    this.state = {
      firstTime: 'splashScreen',
    };
  }

  componentDidMount(): void {
    this.setState({ firstTime: 'loading' });
    this.registerTimeout(() => {
      this.setState({ firstTime: 'Check' });
    }, 1000);
    this.registerTimeout(() => {
      this.setState({ firstTime: 'splashScreen' });
    }, 2000);
    this.registerTimeout(() => {
      void this.handleNavigation();
    }, 3000);
  }
  componentWillUnmount(): void {
    for (const timer of this.timers) {
      clearTimeout(timer);
    }
    this.timers = [];
  }

  private readonly registerTimeout = (callback: () => void, delay: number) => {
    const timer = setTimeout(callback, delay);
    this.timers.push(timer);
  };

  private readonly handleNavigation = async () => {
    const token = await getStoredAuthToken();
    if (token) {
      this.props.navigation?.replace(MAINSTACK.HOMENAVIGATION);
    } else {
      this.props.navigation?.replace(MAINSTACK.AUTHNAVIGATION);
    }
  };
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
  svg: { marginBottom: 0, width: responsiveWidth(100) },
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

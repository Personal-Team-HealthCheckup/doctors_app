import React from 'react';
import CustomStatusBar from '../../Components/common/CustomStatusBar';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomMainView from '../../Components/common/CustomMainView';
import {bgOn1Png, bgOn2Png} from '../../assets/assets';
import {
  responsiveHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import CustomGButton from '../../Components/common/CustomGButton';
import {COLORS, FONTS} from '../../global/theme';
import {moderateScale} from '../../helper/Scale';
import {OnboardingData as data} from '../../global/data';
import {MAINSTACK} from '../../Constants/Navigator';

interface OnBoardingProps {
  navigation?: {
    navigate: (args: string) => void;
    replace: (args: string) => void;
  };
}

interface OnBoardingState {
  index: number;
}

class OnBoarding extends React.Component<OnBoardingProps, OnBoardingState> {
  constructor(props: OnBoardingProps) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  handleSkip = () => {
    this.props.navigation?.replace(MAINSTACK.HOMENAVIGATION);
  };

  handleGetStarted = () => {
    if (data.length - 1 > this.state.index) {
      this.setState({index: this.state.index + 1});
    } else {
      this.handleSkip();
    }
  };
  render() {
    const {Svg, isBgOn1Png, description, title} = data[this.state.index];
    return (
      <>
        <CustomStatusBar />
        <CustomMainView>
          <ImageBackground
            source={isBgOn1Png ? bgOn1Png : bgOn2Png}
            style={styles.image}>
            <ScrollView contentContainerStyle={styles.scr}>
              <Svg
                width={responsiveScreenWidth(80)}
                height={responsiveScreenWidth(80)}
                style={styles.onBoarding}
              />
              <View style={styles.mainTextView}>
                <Text style={styles.textTitle}>{title}</Text>
                <Text style={styles.textSubTitle}>{description}</Text>

                <CustomGButton
                  tittle="Get Started"
                  style={styles.button}
                  onPress={this.handleGetStarted}
                />
                <Text onPress={this.handleSkip} style={styles.skip}>
                  Skip
                </Text>
              </View>
            </ScrollView>
          </ImageBackground>
        </CustomMainView>
      </>
    );
  }
}

export default OnBoarding;
const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: 'center',
    resizeMode: 'cover',
    paddingTop: responsiveHeight(15),
    position: 'relative',
    paddingHorizontal: responsiveScreenWidth(5),
  },
  onBoarding: {
    borderRadius: responsiveScreenWidth(80) / 2,
  },
  mainTextView: {
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    marginTop: responsiveHeight(11),
  },
  textTitle: {
    color: COLORS.white,
    fontFamily: FONTS.rubik.medium,
    fontSize: moderateScale(28),
    textAlign: 'center',
  },
  textSubTitle: {
    color: COLORS.white2gray,
    fontFamily: FONTS.rubik.regular,
    fontSize: moderateScale(14),
    textAlign: 'center',
  },

  skip: {
    color: COLORS.white,
    marginTop: responsiveHeight(2),
    fontFamily: FONTS.rubik.regular,
    fontSize: moderateScale(14),
    textTransform: 'capitalize',
    height: responsiveHeight(5),
  },
  button: {
    marginTop: responsiveHeight(4),
  },
  scr: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: responsiveHeight(65),
  },
});

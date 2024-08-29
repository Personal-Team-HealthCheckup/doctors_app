import React from 'react';
import CustomStatusBar from '../../Components/common/CustomStatusBar';
import {ImageBackground, Text, View, StyleSheet} from 'react-native';
import {
  responsiveScreenWidth,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CustomButton from '../../Components/common/CustomButton';
import CustomGButton from '../../Components/common/CustomGButton';
import CustomTextInput from '../../Components/common/CustomTextInput';
import {
  gradientSignupPng,
  LogoSvg,
  GoogleSvg,
  FacebookSvg,
  StarBlueSvg,
} from '../../assets/assets';
import {COLORS, FONTS} from '../../global/theme';
import {moderateScale, verticalScale} from '../../helper/Scale';
import {AUTH, MAINSTACK} from '../../Constants/Navigator';
import CustomMainView from '../../Components/common/CustomMainView';

interface SigninProps {
  navigation?: {
    navigate: (args: string) => void;
  };
}

interface SigninState {}

class Signin extends React.Component<SigninProps, SigninState> {
  constructor(props: SigninProps) {
    super(props);
    this.state = {};
  }
  navigateToSignup = () => {
    this.props.navigation?.navigate(AUTH.SIGNUP);
  };
  handleLogin = () => {
    this.props.navigation?.navigate(MAINSTACK.HOMENAVIGATION);
  };
  render() {
    return (
      <>
        <CustomStatusBar />
        <CustomMainView>
          <ImageBackground source={gradientSignupPng} style={styles.image}>
            <StarBlueSvg style={styles.imagesvg} />
            <StarBlueSvg style={styles.imagesvg2} />
            <LogoSvg
              width={responsiveScreenWidth(70)}
              height={responsiveHeight(15)}
              style={styles.svg}
              resizeMode="cover"
            />
            <Text style={styles.textSignup}>Welcome back</Text>
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
              <CustomTextInput placeholder="Email" />
              <CustomTextInput placeholder="Password" />
            </View>
            <CustomGButton
              tittle="Login"
              style={styles.buttonView1}
              onPress={this.handleLogin}
            />
            <Text style={styles.textIhave}>Forgor password</Text>
            <View style={styles.lastView}>
              <Text style={styles.textIhave}>Don’t have an account?</Text>
              <Text style={styles.textIhave} onPress={this.navigateToSignup}>
                Join us
              </Text>
            </View>
          </ImageBackground>
        </CustomMainView>
      </>
    );
  }
}

export default Signin;
const styles = StyleSheet.create({
  image: {
    alignItems: 'center',
    resizeMode: 'cover',
    paddingTop: responsiveHeight(2),
    position: 'relative',
    paddingHorizontal: responsiveScreenWidth(5),
    flex: 1,
  },
  textSignup: {
    color: COLORS.white,
    fontFamily: FONTS.rubik.medium,
    fontSize: moderateScale(26),
    textTransform: 'capitalize',
  },
  main: {
    flex: 1,
    backgroundColor: COLORS.black,
    width: responsiveWidth(100),
    height: responsiveHeight(100),
  },
  imagesvg: {
    position: 'absolute',
    top: responsiveHeight(8),
    right: responsiveScreenWidth(30),
    zIndex: -1,
  },
  imagesvg2: {
    position: 'absolute',
    top: responsiveHeight(17),
    right: responsiveScreenWidth(18),
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
    marginTop: responsiveHeight(1),
  },
  lastView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: COLORS.white2gray,
    marginTop: responsiveScreenHeight(10),
  },
  textIhave: {
    fontFamily: FONTS.rubik.regular,
    fontSize: moderateScale(14),
    color: COLORS.green,
    marginVertical: responsiveHeight(2),
  },
});

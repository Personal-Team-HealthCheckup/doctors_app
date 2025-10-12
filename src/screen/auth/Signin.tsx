import React from 'react';
import CustomStatusBar from '../../Components/common/CustomStatusBar';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
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
import { COLORS, FONTS } from '../../global/theme';
import { moderateScale, verticalScale } from '../../helper/Scale';
import { AUTH, MAINSTACK } from '../../Constants/Navigator';
import CustomMainView from '../../Components/common/CustomMainView';
import BottomSheet from '../../Components/CustomBottomSheet';
import { RootState } from '../../redux/store';
import { loginAction } from '../../redux/reducers/auth';
import { connect } from 'react-redux';
import { Navigation } from '../../global/types';
import {
  checkEmailValidation,
  handleOnChange,
  navigateTo,
} from '../../helper/utilities';
import CustomLoader from '../../Components/CustomLoader';

interface SigninProps {
  navigation?: Navigation;
}

type ErrorType = {
  email?: string;
  password?: string;
};
interface SigninState {
  email: string;
  password: string;
  error: ErrorType;
}

interface ReduxProps {
  loginData: RootState['Auth'];
  loginApi: (data: { email: string; password: string }) => void;
}

type Props = SigninProps & ReduxProps;
class Signin extends React.Component<Props, SigninState> {
  forgotPasswordSheetRef: BottomSheet | null = null;
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {},
    };
  }
  navigateToSignup = () => {
    navigateTo(this.props.navigation, AUTH.SIGNUP);
  };
  openForgot = () => {
    this.forgotPasswordSheetRef?.show();
  };
  handleValidation = () => {
    const { email, password } = this.state;
    let isValid = true;
    const errors: ErrorType = {};
    if (!email) {
      errors.email = 'Email is required';
      isValid = false;
    }
    if (!checkEmailValidation(email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }
    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    }
    if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    this.setState({ error: errors });
    return isValid;
  };

  handleLogin = async () => {
    if (!this.handleValidation()) return;
    try {
      await this.props.loginApi({
        email: this.state.email,
        password: this.state.password,
      });

      if (
        this.props.loginData.message?.includes('success') &&
        this.props.loginData.token &&
        this.props.loginData.userRole === 'user'
      ) {
        Alert.alert('Successs', this.props.loginData.message);
        navigateTo(this.props.navigation, MAINSTACK.HOMENAVIGATION);
      } else {
        Alert.alert('Error', this.props.loginData.message || 'Login failed');
        if (this.props.loginData.message?.includes('not verified')) {
          navigateTo(this.props.navigation, AUTH.VERIFICATION, {
            email: this.state.email,
          });
        }
      }
    } catch (error) {}
  };

  handleOnChange = (value: string, field: 'email' | 'password') => {
    const newState = handleOnChange(this.state, value, field);
    this.setState(newState);
  };

  render() {
    const { loading } = this.props.loginData;
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
              <CustomTextInput
                placeholder="Email"
                value={this.state.email}
                onChangeText={text => this.handleOnChange(text, 'email')}
                errorMessage={this.state.error.email}
              />
              <CustomTextInput
                placeholder="Password"
                value={this.state.password}
                onChangeText={text => this.handleOnChange(text, 'password')}
                errorMessage={this.state.error.password}
              />
            </View>
            {loading ? (
              <CustomLoader />
            ) : (
              <CustomGButton
                tittle="Login"
                style={styles.buttonView1}
                onPress={this.handleLogin}
                disabled={loading || !this.state.email || !this.state.password}
              />
            )}
            <TouchableOpacity
              disabled={loading}
              onPress={() => this.openForgot()}
            >
              <Text style={styles.textIhave}>Forgor password</Text>
            </TouchableOpacity>
            <View style={styles.lastView}>
              <Text style={styles.textIhave}>Don’t have an account?</Text>
              <Text
                style={styles.textIhave}
                disabled={loading}
                onPress={() => this.navigateToSignup()}
              >
                Join us
              </Text>
            </View>

            <BottomSheet
              ref={ref => {
                this.forgotPasswordSheetRef = ref;
              }}
              backgroundColor="rgba(0, 0, 0, 0.50)"
              radius={20}
              sheetBackgroundColor={COLORS.black2gray}
              height={responsiveHeight(50)}
            >
              <View style={styles.buttonView}>
                <Text style={styles.text}>BottomSheet</Text>
              </View>
            </BottomSheet>
          </ImageBackground>
        </CustomMainView>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  loginData: state.Auth,
});

const mapDispatchToProps = {
  loginApi: (data: { email: string; password: string }) => loginAction(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);

const styles = StyleSheet.create({
  text: {},
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

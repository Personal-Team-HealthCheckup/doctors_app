import React from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomStatusBar from '../../Components/common/CustomStatusBar';
import {
  FacebookSvg,
  GoogleSvg,
  LogoSvg,
  StarSvg,
  gradientSignupPng,
} from '../../assets/assets';
import { COLORS, FONTS } from '../../global/theme';
import {
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { moderateScale, verticalScale } from '../../helper/Scale';
import CustomButton from '../../Components/common/CustomButton';
import CustomTextInput from '../../Components/common/CustomTextInput';
import CustomIcons from 'react-native-vector-icons/FontAwesome5';
import CustomGButton from '../../Components/common/CustomGButton';
import { AUTH } from '../../Constants/Navigator';
import { RootState } from '../../redux/store';
import { connect } from 'react-redux';
import { signupAction } from '../../redux/reducers/auth';
import CustomLoader from '../../Components/CustomLoader';
import { Navigation } from '../../global/types';
import {
  checkEmailValidation,
  checkNameValidation,
  handleOnChange,
  navigateTo,
} from '../../helper/utilities';
import CustomMainView from '../../Components/common/CustomMainView';
import { translate } from '../../helper/i18';

interface SignupProps {
  navigation?: Navigation;
}

interface SignupState {
  isChecked: boolean;
  email: string;
  password: string;
  fullName: string;
  error: {
    email?: string;
    password?: string;
    fullName?: string;
    isChecked?: string;
  };
}

interface ReduxProps {
  signupData: RootState['Auth'];
  signup: (data: {
    email: string;
    password: string;
    fullName: string;
    role: 'user';
    acceptedTerms: boolean;
  }) => void;
}

type Props = SignupProps & ReduxProps;

class Signup extends React.Component<Props, SignupState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isChecked: false,
      email: '',
      password: '',
      fullName: '',
      error: {},
    };
  }

  toggleCheck = () => {
    this.setState(prev => ({ isChecked: !prev.isChecked }));
  };
  handleOnChange = (
    value: string,
    field: 'email' | 'password' | 'fullName',
  ) => {
    const newState = handleOnChange(this.state, value, field);
    this.setState(newState);
  };

  navigateToLogin = () => {
    navigateTo(this.props.navigation, AUTH.SIGNIN);
  };

  handleValidation = () => {
    const { email, password, fullName, isChecked } = this.state;
    let isValid = true;
    const errors: any = {};
    if (!email) {
      errors.email = translate('auth.emailRequired');
      isValid = false;
    }
    if (!checkEmailValidation(email)) {
      errors.email = translate('auth.emailInvalid');
      isValid = false;
    }
    if (!password) {
      errors.password = translate('auth.passwordRequired');
      isValid = false;
    }
    if (password.length < 6) {
      errors.password = translate('auth.passwordMin');
      isValid = false;
    }
    if (!fullName) {
      errors.fullName = translate('auth.fullNameRequired');
      isValid = false;
    }
    if (!checkNameValidation(fullName)) {
      errors.fullName = translate('auth.fullNameInvalid');
      isValid = false;
    }
    if (!isChecked) {
      errors.isChecked = translate('auth.termsRequired');
      isValid = false;
    }
    this.setState({ error: errors });
    return isValid;
  };

  handleRegister = async () => {
    const { email, password, fullName } = this.state;
    if (!this.handleValidation()) return;
    try {
      await this.props.signup({
        email,
        password,
        fullName,
        role: 'user',
        acceptedTerms: this.state.isChecked,
      });
      if (this.props.signupData.token) {
        navigateTo(this.props.navigation, AUTH.VERIFICATION);
      }
    } catch (error) {}
  };

  render() {
    return (
      <CustomMainView>
        <CustomStatusBar />

        <KeyboardAvoidingView
          enabled
          style={styles.main}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ImageBackground source={gradientSignupPng} style={styles.image}>
            <StarSvg style={styles.imagesvg} />
            <StarSvg style={styles.imagesvg2} />
            <ScrollView
              bounces={false}
              style={[
                styles.main,
                {
                  paddingTop: responsiveHeight(7),
                  paddingHorizontal: responsiveScreenWidth(5),
                },
              ]}
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: responsiveHeight(4),
                alignItems: 'center',
              }}
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.textSignup}>Sign up</Text>
              <LogoSvg
                width={responsiveScreenWidth(70)}
                height={
                  Platform.OS === 'ios'
                    ? responsiveHeight(15)
                    : responsiveHeight(13)
                }
                style={styles.svg}
                resizeMode="cover"
              />
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
                  placeholder={translate('auth.fullNamePlaceholder')}
                  errorMessage={this.state.error.fullName}
                  value={this.state.fullName}
                  maxLength={30}
                  onChangeText={value => this.handleOnChange(value, 'fullName')}
                />
                <CustomTextInput
                  placeholder={translate('auth.emailPlaceholder')}
                  errorMessage={this.state.error.email}
                  value={this.state.email}
                  maxLength={50}
                  onChangeText={value => this.handleOnChange(value, 'email')}
                />
                <CustomTextInput
                  placeholder={translate('auth.passwordPlaceholder')}
                  errorMessage={this.state.error.password}
                  value={this.state.password}
                  maxLength={15}
                  onChangeText={value => this.handleOnChange(value, 'password')}
                />
                <Pressable
                  style={styles.buttonCheck}
                  onPress={this.toggleCheck}
                >
                  <CustomIcons
                    name={this.state.isChecked ? 'check-circle' : 'circle'}
                    size={20}
                    color={
                      this.state.isChecked ? COLORS.green : COLORS.greyBlack
                    }
                  />
                  <Text style={styles.textIAgree}>
                    {translate('auth.termsText')}
                  </Text>
                </Pressable>
                {this.state.error.isChecked && (
                  <View style={{ marginTop: 5 }}>
                    <Text style={styles.errMessage}>
                      {this.state.error.isChecked}
                    </Text>
                  </View>
                )}
              </View>

              {this.props.signupData.message && (
                <View style={{ marginTop: responsiveHeight(3) }}>
                  <Text style={styles.errMessage}>
                    {this.props.signupData.message}
                  </Text>
                </View>
              )}
              {this.props.signupData.loading ? (
                <CustomLoader />
              ) : (
                <CustomGButton
                  tittle="Sign up"
                  testID="btn-signup"
                  style={styles.buttonView1}
                  onPress={() => this.handleRegister()}
                />
              )}
              <View style={styles.lastView}>
                <Text style={styles.textIhave}>
                  {translate('auth.haveAccount')}
                </Text>
                <Text
                  testID="login-txt"
                  style={styles.textIhave}
                  onPress={this.navigateToLogin}
                >
                  {translate('auth.login')}
                </Text>
              </View>
            </ScrollView>
          </ImageBackground>
        </KeyboardAvoidingView>
      </CustomMainView>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  signupData: state.Auth,
});

const mapDispatchToProps = {
  signup: (data: {
    email: string;
    password: string;
    fullName: string;
    role: 'user';
    acceptedTerms: boolean;
  }) => signupAction(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
const styles = StyleSheet.create({
  errMessage: {
    color: COLORS.red,
    fontFamily: FONTS.rubik.light,
    fontSize: moderateScale(12),
  },
  image: {
    flex: 1,
    alignItems: 'center',
    resizeMode: 'cover',

    position: 'relative',
  },
  textSignup: {
    color: COLORS.white,
    fontFamily: FONTS.rubik.medium,
    fontSize: moderateScale(26),
    textTransform: 'capitalize',
  },
  main: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    flex: 1,
  },
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
    marginTop: responsiveHeight(7),
  },
  lastView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: COLORS.white2gray,
  },
  textIhave: {
    fontFamily: FONTS.rubik.regular,
    fontSize: moderateScale(14),
    color: COLORS.green,
    marginVertical: responsiveHeight(2),
  },
});

import React from 'react';
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomMainView from '../../Components/common/CustomMainView';
import CustomStatusBar from '../../Components/common/CustomStatusBar';
import CustomHeader from '../../Components/common/CustomHeader';
import CustomTextInput from '../../Components/common/CustomTextInput';
import CustomGButton from '../../Components/common/CustomGButton';
import { COLORS, FONTS } from '../../global/theme';
import {
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { moderateScale, verticalScale } from '../../helper/Scale';
import { Navigation } from '../../global/types';
import { AUTH } from '../../Constants/Navigator';
import { translate } from '../../helper/i18';
import { navigateTo, replaceTo } from '../../helper/utilities';
import { LogoSvg, StarSvg, gradientSignupPng } from '../../assets/assets';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import { resetPasswordAction } from '../../redux/reducers/auth';

interface ResetPasswordProps {
  navigation?: Navigation;
  route?: any;
}

interface ReduxProps {
  authData: RootState['Auth'];
  resetPasswordApi: (data: {
    email: string;
    otp: string;
    password: string;
  }) => void;
}

type Props = ResetPasswordProps & ReduxProps;

type ErrorType = {
  password?: string;
  confirmPassword?: string;
};

interface ResetPasswordState {
  password: string;
  confirmPassword: string;
  error: ErrorType;
  email: string;
  otp: string;
}

class ResetPassword extends React.Component<Props, ResetPasswordState> {
  constructor(props: Props) {
    super(props);
    const { email = '', otp = '' } = props.route?.params ?? {};
    const fallbackEmail = email || props.authData.email || '';
    this.state = {
      password: '',
      confirmPassword: '',
      error: {},
      email: fallbackEmail,
      otp: otp || '',
    };
  }

  componentDidMount(): void {
    if (!this.state.otp) {
      Alert.alert('Error', translate('auth.resetSessionMissing'), [
        {
          text: 'OK',
          onPress: () => navigateTo(this.props.navigation, AUTH.FORGOTPASSWORD),
        },
      ]);
    }
  }

  handlePasswordChange = (value: string) => {
    this.setState(prevState => ({
      password: value,
      error: { ...prevState.error, password: undefined },
    }));
  };

  handleConfirmPasswordChange = (value: string) => {
    this.setState(prevState => ({
      confirmPassword: value,
      error: { ...prevState.error, confirmPassword: undefined },
    }));
  };

  validateForm = () => {
    const { password, confirmPassword } = this.state;
    const errors: ErrorType = {};
    let isValid = true;

    if (!password) {
      errors.password = translate('auth.passwordRequired');
      isValid = false;
    } else if (password.length < 6) {
      errors.password = translate('auth.passwordMin');
      isValid = false;
    }

    if (!confirmPassword) {
      errors.confirmPassword = translate('auth.passwordRequired');
      isValid = false;
    } else if (confirmPassword !== password) {
      errors.confirmPassword = translate('auth.passwordMismatch');
      isValid = false;
    }

    this.setState({ error: errors });
    return isValid;
  };

  handleResetPress = async () => {
    if (!this.validateForm()) {
      return;
    }

    const { email, otp, password } = this.state;

    if (!email || !otp) {
      Alert.alert('Error', translate('auth.resetSessionInvalid'));
      return;
    }

    try {
      await this.props.resetPasswordApi({ email, otp, password });
      const { message } = this.props.authData;

      if (message?.toLowerCase().includes('success')) {
        Alert.alert('Success', message || translate('auth.passwordUpdated'), [
          {
            text: 'OK',
            onPress: () => replaceTo(this.props.navigation, AUTH.SIGNIN),
          },
        ]);
        this.setState({
          password: '',
          confirmPassword: '',
        });
      } else {
        Alert.alert('Error', message || translate('auth.loginErrorMessage'));
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';
      Alert.alert('Error', errorMessage);
    }
  };

  handleNavigateToLogin = () => {
    replaceTo(this.props.navigation, AUTH.SIGNIN);
  };

  render() {
    const { loading } = this.props.authData;
    const { password, confirmPassword, error } = this.state;

    return (
      <CustomMainView>
        <CustomStatusBar />
        <KeyboardAvoidingView
          enabled
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            bounces={false}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <ImageBackground
              source={gradientSignupPng}
              style={styles.background}
            >
              <SafeAreaView style={styles.safeArea}>
                <CustomHeader
                  navigation={this.props.navigation}
                  heading={translate('auth.resetPasswordHeading')}
                  isIcon={false}
                  isShowSearchIcon={false}
                  isShowNotificationIcon={false}
                />
                <StarSvg style={styles.decorationOne} />
                <StarSvg style={styles.decorationTwo} />
                <LogoSvg
                  width={responsiveScreenWidth(65)}
                  height={responsiveHeight(14)}
                  style={styles.logo}
                  resizeMode="contain"
                />

                <View style={styles.card}>
                  <Text style={styles.titleText}>
                    {translate('auth.resetPasswordHeading')}
                  </Text>
                  <Text style={styles.subtitleText}>
                    {translate('auth.resetPasswordDescription')}
                  </Text>

                  <View style={styles.inputWrapper}>
                    <CustomTextInput
                      placeholder={translate('auth.newPasswordPlaceholder')}
                      value={password}
                      onChangeText={this.handlePasswordChange}
                      errorMessage={error.password}
                      style={{ width: responsiveWidth(80) }}
                      shouldShowTogglePassword={true}
                      secureTextEntry={true}
                    />
                    <CustomTextInput
                      placeholder={translate('auth.confirmPasswordPlaceholder')}
                      value={confirmPassword}
                      onChangeText={this.handleConfirmPasswordChange}
                      errorMessage={error.confirmPassword}
                      style={{ width: responsiveWidth(80) }}
                      shouldShowTogglePassword={true}
                      secureTextEntry={true}
                    />
                  </View>

                  <CustomGButton
                    tittle={translate('auth.resetPasswordButton')}
                    style={styles.resetButton}
                    disabled={loading}
                    onPress={this.handleResetPress}
                  />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={this.handleNavigateToLogin}
                    style={styles.backToLoginContainer}
                  >
                    <Text style={styles.backToLoginText}>
                      {translate('auth.backToLogin')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            </ImageBackground>
          </ScrollView>
        </KeyboardAvoidingView>
      </CustomMainView>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  authData: state.Auth,
});

const mapDispatchToProps = {
  resetPasswordApi: (data: { email: string; otp: string; password: string }) =>
    resetPasswordAction(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  background: {
    flex: 1,
    paddingHorizontal: responsiveWidth(6),
    paddingVertical: responsiveHeight(4),
  },
  safeArea: {
    flex: 1,
  },
  decorationOne: {
    position: 'absolute',
    top: responsiveHeight(10),
    left: responsiveWidth(8),
    opacity: 0.45,
  },
  decorationTwo: {
    position: 'absolute',
    top: responsiveHeight(18),
    right: responsiveWidth(10),
    opacity: 0.45,
  },
  logo: {
    alignSelf: 'center',
    marginTop: responsiveHeight(3),
    marginBottom: responsiveHeight(4),
  },
  card: {
    backgroundColor: 'rgba(7, 20, 40, 0.78)',
    borderRadius: 22,
    paddingVertical: responsiveHeight(4),
    paddingHorizontal: responsiveWidth(5),
    borderWidth: 1,
    borderColor: 'rgba(94, 239, 255, 0.22)',
    shadowColor: '#0F5C8F',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.32,
    shadowRadius: 28,
    elevation: 12,
  },
  titleText: {
    fontFamily: FONTS.rubik.medium,
    fontSize: moderateScale(24),
    color: COLORS.white,
    marginBottom: responsiveHeight(1.5),
    textAlign: 'center',
  },
  subtitleText: {
    fontFamily: FONTS.rubik.regular,
    fontSize: moderateScale(14),
    color: COLORS.white2gray,
    textAlign: 'center',
    marginBottom: responsiveHeight(3),
    lineHeight: moderateScale(20),
  },
  inputWrapper: {
    marginBottom: responsiveHeight(2.5),
  },
  resetButton: {
    height: verticalScale(54),
  },
  backToLoginContainer: {
    marginTop: responsiveHeight(2.5),
    alignItems: 'center',
  },
  backToLoginText: {
    fontFamily: FONTS.rubik.medium,
    fontSize: moderateScale(14),
    color: COLORS.green,
  },
});

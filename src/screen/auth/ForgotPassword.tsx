import React from 'react';
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
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
import { navigateTo, checkEmailValidation } from '../../helper/utilities';
import { LogoSvg, StarSvg, gradientSignupPng } from '../../assets/assets';

interface ForgotPasswordProps {
  navigation?: Navigation;
}

interface ForgotPasswordState {
  email: string;
  error: string;
  loading: boolean;
}

class ForgotPassword extends React.Component<
  ForgotPasswordProps,
  ForgotPasswordState
> {
  constructor(props: ForgotPasswordProps) {
    super(props);
    this.state = {
      email: '',
      error: '',
      loading: false,
    };
  }

  handleEmailChange = (value: string) => {
    this.setState({
      email: value,
      error: '',
    });
  };

  validateEmail = () => {
    const { email } = this.state;
    if (!email) {
      this.setState({ error: translate('auth.emailRequired') });
      return false;
    }
    if (!checkEmailValidation(email)) {
      this.setState({ error: translate('auth.emailInvalid') });
      return false;
    }
    return true;
  };

  handleResetPress = async () => {
    if (!this.validateEmail()) {
      return;
    }
    try {
      this.setState({ loading: true });
      await new Promise(resolve => setTimeout(resolve, 1200));
      Alert.alert(
        translate('auth.forgotPasswordHeading'),
        `We have sent a reset link to ${this.state.email}.`,
      );
      navigateTo(this.props.navigation, AUTH.SIGNIN);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';
      Alert.alert('Error', errorMessage);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleNavigateToLogin = () => {
    navigateTo(this.props.navigation, AUTH.SIGNIN);
  };

  render() {
    const { email, error, loading } = this.state;

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
                  heading={translate('auth.forgotPasswordHeading')}
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
                    {translate('auth.forgotPasswordHeading')}
                  </Text>
                  <Text style={styles.subtitleText}>
                    {translate('auth.forgotPasswordDescription')}
                  </Text>
                  <View style={styles.inputWrapper}>
                    <CustomTextInput
                      placeholder={translate('auth.emailPlaceholder')}
                      value={email}
                      onChangeText={this.handleEmailChange}
                      errorMessage={error}
                      style={{ width: responsiveWidth(80) }}
                    />
                  </View>

                  <CustomGButton
                    tittle={translate('auth.sendResetLink')}
                    style={styles.resetButton}
                    disabled={loading}
                    onPress={this.handleResetPress}
                  />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={this.handleNavigateToLogin}
                    style={styles.rememberContainer}
                  >
                    <Text style={styles.rememberText}>
                      {translate('auth.rememberPassword')}{' '}
                      <Text style={styles.loginLink}>
                        {translate('auth.login')}
                      </Text>
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

export default ForgotPassword;

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  background: {
    flex: 1,
    paddingHorizontal: responsiveScreenWidth(5),
    paddingBottom: responsiveHeight(4),
  },
  safeArea: {
    flex: 1,
  },
  decorationOne: {
    position: 'absolute',
    top: responsiveHeight(10),
    right: responsiveWidth(20),
    opacity: 0.65,
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
  rememberContainer: {
    marginTop: responsiveHeight(2.5),
    alignItems: 'center',
  },
  rememberText: {
    fontFamily: FONTS.rubik.regular,
    fontSize: moderateScale(14),
    color: COLORS.white2gray,
  },
  loginLink: {
    color: COLORS.green,
    fontFamily: FONTS.rubik.medium,
  },
});

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
import { connect } from 'react-redux';
import { forgotPasswordAction } from '../../redux/reducers/auth';
import { RootState } from '../../redux/store';
import { commonStyles } from './CommonStyles';

interface ForgotPasswordProps {
  navigation?: Navigation;
}

interface ReduxProps {
  forgotPassData: RootState['Auth'];
  forgotPasswordApi: (data: { email: string }) => void;
}

type Props = ForgotPasswordProps & ReduxProps;
interface ForgotPasswordState {
  email: string;
  error: string;
  loading: boolean;
}

class ForgotPassword extends React.Component<Props, ForgotPasswordState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      error: '',
      loading: false,
    };
  }

  handleEmailChange = (value: string) => {
    this.setState({ email: value, error: '' });
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
      const { forgotPasswordApi } = this.props;
      await forgotPasswordApi({ email: this.state.email });
      const { message, token, type } = this.props.forgotPassData;
      Alert.alert('Success', JSON.stringify(message));

      if (message?.includes('success') && token && type === 'forgot-password') {
        navigateTo(this.props.navigation, AUTH.VERIFICATION, {
          email: this.state.email,
          fromScreen: 'ForgotPassword',
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';
      Alert.alert('Error', errorMessage);
    }
  };

  handleNavigateToLogin = () => {
    navigateTo(this.props.navigation, AUTH.SIGNIN);
  };

  render() {
    const { loading } = this.props.forgotPassData;
    const { error, email } = this.state;

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
                <StarSvg style={commonStyles.decorationTwo} />
                <LogoSvg
                  width={responsiveScreenWidth(65)}
                  height={responsiveHeight(14)}
                  style={commonStyles.logo}
                  resizeMode="contain"
                />

                <View style={commonStyles.card}>
                  <Text style={commonStyles.titleText}>
                    {translate('auth.forgotPasswordHeading')}
                  </Text>
                  <Text style={commonStyles.subtitleText}>
                    {translate('auth.forgotPasswordDescription')}
                  </Text>
                  <View style={commonStyles.inputWrapper}>
                    <CustomTextInput
                      placeholder={translate('auth.emailPlaceholder')}
                      value={email}
                      onChangeText={value => this.handleEmailChange(value)}
                      errorMessage={error}
                      style={{ width: responsiveWidth(80) }}
                    />
                  </View>

                  <CustomGButton
                    tittle={translate('auth.sendResetLink')}
                    style={commonStyles.resetButton}
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

const mapStateToProps = (state: RootState) => ({
  forgotPassData: state.Auth,
});

const mapDispatchToProps = {
  forgotPasswordApi: (data: { email: string }) => forgotPasswordAction(data),
};
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

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

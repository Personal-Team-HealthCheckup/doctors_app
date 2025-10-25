import React from 'react';
import {
  Alert,
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
import { LogoSvg, StarSvg, gradientSignupPng } from '../../assets/assets';
import { COLORS, FONTS } from '../../global/theme';
import {
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { moderateScale } from '../../helper/Scale';
import CustomGButton from '../../Components/common/CustomGButton';
import { AUTH } from '../../Constants/Navigator';
import { RootState } from '../../redux/store';
import { connect } from 'react-redux';
import { Navigation } from '../../global/types';
import { navigateTo } from '../../helper/utilities';
import CustomHeader from '../../Components/common/CustomHeader';
import OTPTextInput from '../../Components/OTPTextInput';
import CustomMainView from '../../Components/common/CustomMainView';
import { resendOtpAction, verifyOtpAction } from '../../redux/reducers/auth';
import { translate } from '../../helper/i18';

interface VerificationCodeProps {
  navigation?: Navigation;
  route?: any;
}

interface VerificationCodeState {
  code: string;
  timer: number;
  isForgotPasswordFlow?: boolean;
}

interface ReduxProps {
  verifyOTPData: RootState['Auth'];
  verifyOtpApi: (data: { otp: string }) => void;
  resendOtpApi: (data: { email: string }) => void;
}

type Props = VerificationCodeProps & ReduxProps;

// constants
const MAX_TIME = 120; // 2 minutes in seconds
class VerificationCode extends React.Component<Props, VerificationCodeState> {
  timer: any = null;
  constructor(props: Props) {
    super(props);
    this.state = {
      code: '',
      timer: MAX_TIME,
    };
  }

  handleResendOtp = async () => {
    try {
      await this.props.resendOtpApi({
        email: this.props.verifyOTPData.email,
      });
      if (this.props.verifyOTPData.message?.includes('success')) {
        Alert.alert('Successs', this.props.verifyOTPData.message);
      } else {
        Alert.alert(
          'Error',
          this.props.verifyOTPData.message || 'OTP not Verified',
        );
      }
    } catch (error) {}
  };

  handleVerification = async () => {
    try {
      await this.props.verifyOtpApi({
        otp: this.state.code,
      });
      if (this.props.verifyOTPData.message?.includes('success')) {
        Alert.alert('Successs', this.props.verifyOTPData.message);
        const isForgotFlow = this.state.isForgotPasswordFlow;
        const targetScreen = !isForgotFlow ? AUTH.SIGNIN : AUTH.RESETPASSWORD;
        const emailParam =
          this.props.verifyOTPData.email ||
          this.props.route?.params?.email ||
          '';
        const params = isForgotFlow
          ? {
              email: emailParam,
              otp: this.state.code,
            }
          : undefined;
        navigateTo(this.props.navigation, targetScreen, params);
      } else {
        Alert.alert(
          'Error',
          this.props.verifyOTPData.message || 'OTP not Verified',
        );
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';
      Alert.alert('Error', errorMessage);
    }
  };

  handleOTPChange = (code: string) => {
    this.setState({ code });
  };

  componentDidMount(): void {
    const { fromScreen } = this.props.route?.params || {};

    if (fromScreen && fromScreen === 'ForgotPassword') {
      this.setState({ isForgotPasswordFlow: true });
    }
    this.timer = setInterval(() => {
      if (this.state.timer > 0) {
        this.setState({ timer: this.state.timer - 1 });
      }
    }, 1000);
  }

  componentWillUnmount(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  formatedTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `(${minutes < 10 ? '0' + minutes : minutes}:${
      seconds < 10 ? '0' + seconds : seconds
    })`;
  };

  render() {
    const { verifyOTPData } = this.props;
    const isResendingDisabled = this.state.timer > 0;
    return (
      <CustomMainView>
        <CustomStatusBar />

        <KeyboardAvoidingView
          enabled
          style={styles.mainContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            bounces={false}
            style={styles.mainContainer}
            showsVerticalScrollIndicator={false}
          >
            <ImageBackground
              source={gradientSignupPng}
              style={styles.backgroundImage}
            >
              <CustomHeader
                navigation={this.props.navigation}
                heading={translate('auth.verifyCodeTxt')}
                isIcon={false}
                isShowSearchIcon={false}
                isShowNotificationIcon={false}
              />
              <StarSvg style={styles.starSvg} />
              <StarSvg style={styles.starSvg2} />
              <LogoSvg
                width={responsiveScreenWidth(70)}
                height={
                  Platform.OS === 'ios'
                    ? responsiveHeight(15)
                    : responsiveHeight(13)
                }
                style={styles.logoSvg}
                resizeMode="cover"
              />
              <View style={styles.inputContainer}>
                <Text style={styles.verificationCodeText}>
                  {translate('auth.digitVerificationTxt')}
                </Text>
                <Text style={styles.verificationSubtitle}>
                  {translate('auth.verificationSubtitle')}
                  {verifyOTPData.email}
                </Text>
                <OTPTextInput
                  testID="otp-text-input"
                  value={this.state.code}
                  onChangeOTP={(otp: string) => this.handleOTPChange(otp)}
                />
                <Pressable
                  testID="btn-resend-otp"
                  onPress={this.handleResendOtp}
                  style={[
                    styles.resendCodeView,
                    !isResendingDisabled && styles.resendCodeEnabled,
                  ]}
                  disabled={isResendingDisabled || verifyOTPData.loading}
                >
                  <Text style={styles.resendCodeText}>
                    {translate('auth.resendCodeTxt')}
                    {isResendingDisabled && this.formatedTime(this.state.timer)}
                  </Text>
                </Pressable>
              </View>

              <CustomGButton
                testID="btn-verify"
                tittle={translate('auth.verify')}
                disabled={this.state.code.length < 4 || verifyOTPData.loading}
                style={styles.verifyButtonContainer}
                onPress={() => this.handleVerification()}
              />
            </ImageBackground>
          </ScrollView>
        </KeyboardAvoidingView>
      </CustomMainView>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  verifyOTPData: state.Auth,
});

const mapDispatchToProps = {
  verifyOtpApi: (data: { otp: string }) => verifyOtpAction(data),
  resendOtpApi: (data: { email: string }) => resendOtpAction(data),
};

export default connect(mapStateToProps, mapDispatchToProps)(VerificationCode);

const styles = StyleSheet.create({
  resendCodeView: {
    marginTop: responsiveHeight(3),
    alignSelf: 'center',
  },
  resendCodeEnabled: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
  },
  resendCodeText: {
    color: COLORS.white,
    fontFamily: FONTS.inter['regular[400]'],
    fontSize: moderateScale(12),
  },

  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    resizeMode: 'cover',
    paddingTop: responsiveHeight(7),
    position: 'relative',
    paddingHorizontal: responsiveScreenWidth(10),
    justifyContent: 'space-between',
    height: responsiveHeight(100),
    width: responsiveWidth(100),
    paddingBottom: responsiveHeight(10),
  },
  verificationCodeText: {
    color: COLORS.white,
    fontFamily: FONTS.rubik.medium,
    fontSize: moderateScale(26),
    textTransform: 'capitalize',
  },
  mainContainer: {
    backgroundColor: COLORS.black,
    flex: 1,
  },
  starSvg: {
    position: 'absolute',
    top: responsiveHeight(7),
    right: responsiveScreenWidth(33),
    zIndex: -1,
  },
  starSvg2: {
    position: 'absolute',
    top: responsiveHeight(15),
    right: responsiveScreenWidth(24),
    zIndex: -1,
  },
  logoSvg: {
    width: responsiveScreenWidth(70),
    marginLeft: -responsiveWidth(10),
  },
  verificationSubtitle: {
    fontFamily: FONTS.rubik.regular,
    fontSize: moderateScale(14),
    color: COLORS.white2gray,
    marginTop: responsiveHeight(1),
  },

  inputContainer: {
    marginTop: responsiveHeight(5),
    flex: 1,
  },

  verifyButtonContainer: {
    marginTop: responsiveHeight(7),
  },
});

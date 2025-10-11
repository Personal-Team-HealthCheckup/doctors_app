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
import { moderateScale, verticalScale } from '../../helper/Scale';
import CustomGButton from '../../Components/common/CustomGButton';
import { MAINSTACK } from '../../Constants/Navigator';
import { RootState } from '../../redux/store';
import { connect } from 'react-redux';
import { Navigation } from '../../global/types';
import { navigateTo } from '../../helper/utilities';
import CustomHeader from '../../Components/common/CustomHeader';
import OTPTextInput from '../../Components/OTPTextInput';
import CustomMainView from '../../Components/common/CustomMainView';
import { verifyOtpAction } from '../../redux/reducers/auth';

interface VerificationCodeProps {
  navigation?: Navigation;
}

interface VerificationCodeState {
  code: string;
}

interface ReduxProps {
  verifyOTPData: RootState['Auth'];
  verifyOtpApi: (data: { otp: string }) => void;
}

type Props = VerificationCodeProps & ReduxProps;

class VerificationCode extends React.Component<Props, VerificationCodeState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      code: '',
    };
  }

  handleResendOtp = () => {
    // logic for resend otp
  };

  handleVerification = async () => {
    try {
      await this.props.verifyOtpApi({
        otp: this.state.code,
      });
      Alert.alert(
        'Success',
        this.props.verifyOTPData.message || 'OTP Verified',
      );
      // navigateTo(this.props.navigation, MAINSTACK.HOMENAVIGATION);
    } catch (error) {}
  };

  handleOTPChange = (code: string) => {
    console.log('Entered OTP:', code);
    this.setState({ code });
  };

  render() {
    const { verifyOTPData } = this.props;
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
                heading="Verification Code"
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
                  Enter 4 Digits Code
                </Text>
                <Text style={styles.verificationSubtitle}>
                  We’ve sent a 4-digit verification code to your email
                  shubham@yopmail.com
                </Text>
                <OTPTextInput
                  value={this.state.code}
                  onChangeOTP={(otp: string) => this.handleOTPChange(otp)}
                />
                <Pressable
                  onPress={this.handleResendOtp}
                  style={{
                    marginTop: responsiveHeight(3),
                    alignSelf: 'center',
                  }}
                >
                  <Text style={styles.resendCodeText}>Resend Code 02:00</Text>
                </Pressable>
              </View>

              <CustomGButton
                tittle="Verify Code"
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
};

export default connect(mapStateToProps, mapDispatchToProps)(VerificationCode);

const styles = StyleSheet.create({
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

import React from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CustomStatusBar from '../../Components/common/CustomStatusBar';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  HomeScreenPng2 as HomeScreenPng,
  imageProfile1,
} from '../../assets/assets';
import Header from '../../Components/common/CustomHeader';
import { COLORS, FONTS } from '../../global/theme';
import LinearGradient from 'react-native-linear-gradient';
import VectorIcon from 'react-native-vector-icons/FontAwesome5';
import CustomTextInput from '../../Components/common/CustomTextInput';
import CustomGButton from '../../Components/common/CustomGButton';
import { closeKeyBoard, handleScroll } from '../../helper/utilities';
interface ProfilePageProps { }

interface ProfilePageState {
  isScrollEnabled: boolean;
}

class ProfilePage extends React.Component<ProfilePageProps, ProfilePageState> {
  constructor(props: ProfilePageProps) {
    super(props);
    this.state = {
      isScrollEnabled: false,
    };
  }

  handleScroll1 = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    this.setState({ isScrollEnabled: handleScroll(event) });
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <CustomStatusBar />
        <ImageBackground source={HomeScreenPng} style={styles.image}>
          <Header heading="Profile" />
          <ScrollView
            scrollEventThrottle={16}
            bounces={false}
            contentContainerStyle={{ paddingBottom: "10%" }}
            style={styles.container}>
            <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => closeKeyBoard()}>
              <KeyboardAvoidingView keyboardVerticalOffset={12} behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
                <View style={styles.mainView}>
                  <Text style={styles.title}>Set up your profile</Text>
                  <Text style={styles.subtitle}>
                    Update your profile to connect your doctor with better
                    impression.
                  </Text>

                  <LinearGradient
                    colors={[COLORS.lightCyan, COLORS.lightYellow]}
                    start={{ x: 0.0, y: 0.5 }}
                    end={{ x: 1.0, y: 0.5 }}
                    style={styles.imageView}>
                    <View style={styles.cameraView}>
                      <VectorIcon
                        name="camera"
                        color={COLORS.white}
                        size={20}
                      />
                    </View>
                    <Image source={imageProfile1} style={styles.image1} />
                  </LinearGradient>

                  <View style={styles.mainView1}>
                    <Text style={[styles.title, styles.titper]}>
                      Personal information
                    </Text>
                    <CustomTextInput placeholder="Sara Doe" />
                    <CustomTextInput placeholder="+8801800000000" />
                    <CustomTextInput placeholder="DD MM YYYY" />
                    <CustomTextInput placeholder="Add Details" />
                    <CustomGButton tittle="continue" />
                  </View>
                </View>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

export default ProfilePage;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    backgroundColor: COLORS.black,
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    resizeMode: 'cover',
    paddingVertical: responsiveHeight(3),
    paddingHorizontal: responsiveScreenWidth(5),
  },
  mainView: {
    flex: 1,
    alignItems: 'center',
    marginTop: responsiveHeight(3),
    flexDirection: 'column',
  },
  title: {
    fontFamily: FONTS.rubik.medium,
    fontSize: responsiveFontSize(2.5),
    color: COLORS.white,
  },
  subtitle: {
    fontFamily: FONTS.rubik.regular,
    fontSize: responsiveFontSize(2),
    color: COLORS.white,
    textAlign: 'center',
    marginTop: responsiveHeight(1),
  },
  imageView: {
    width: responsiveHeight(15),
    height: responsiveHeight(15),
    borderRadius: responsiveHeight(15) / 2,
    marginVertical: responsiveHeight(4),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 0,
  },
  image1: {
    width: responsiveHeight(14),
    height: responsiveHeight(14),
    borderRadius: responsiveHeight(14) / 2,
    resizeMode: 'cover',
  },
  cameraView: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: responsiveHeight(5),
    height: responsiveHeight(5),
    backgroundColor: COLORS.light,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveHeight(5) / 2,
    zIndex: 10,
  },
  mainView1: {
    // marginTop: responsiveHeight(3),
    alignItems: 'center',
  },
  titper: {
    fontSize: responsiveFontSize(2.4),
    marginVertical: responsiveHeight(2),
  },
});

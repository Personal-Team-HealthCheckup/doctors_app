import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomStatusBar from '../../Components/common/CustomStatusBar';
import CustomMainView from '../../Components/common/CustomMainView';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {
  HomeScreenPng2 as HomeScreenPng,
  imageProfile1,
} from '../../assets/assets';
import Header from '../../Components/common/CustomHeader';
import {COLORS, FONTS} from '../../global/theme';
import LinearGradient from 'react-native-linear-gradient';
import VectorIcon from 'react-native-vector-icons/FontAwesome5';
import CustomTextInput from '../../Components/common/CustomTextInput';
import CustomGButton from '../../Components/common/CustomGButton';
interface ProfilePageProps {}

interface ProfilePageState {}

class ProfilePage extends React.Component<ProfilePageProps, ProfilePageState> {
  constructor(props: ProfilePageProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <CustomStatusBar />
        <CustomMainView>
          <ImageBackground source={HomeScreenPng} style={styles.image}>
            <Header heading="Profile" />
            <View style={styles.mainView}>
              <Text style={styles.title}>Set up your profile</Text>
              <Text style={styles.subtitle}>
                Update your profile to connect your doctor with better
                impression.
              </Text>

              <LinearGradient
                colors={[COLORS.lightCyan, COLORS.lightYellow]}
                start={{x: 0.0, y: 0.5}}
                end={{x: 1.0, y: 0.5}}
                style={styles.imageView}>
                <View style={styles.cameraView}>
                  <VectorIcon name="camera" color={COLORS.white} size={20} />
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
          </ImageBackground>
        </CustomMainView>
      </>
    );
  }
}

export default ProfilePage;
const styles = StyleSheet.create({
  image: {
    alignItems: 'center',
    resizeMode: 'cover',
    paddingTop: responsiveHeight(3),
    position: 'relative',
    paddingHorizontal: responsiveScreenWidth(5),
    flex: 1,
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
  },
  titper: {
    fontSize: responsiveFontSize(2.4),
    marginVertical: responsiveHeight(2),
  },
});

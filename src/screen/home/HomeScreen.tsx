import React from 'react';
import CustomStatusBar from '../../Components/CustomStatusBar';
import CustomMainView from '../../Components/CustomMainView';
import {
  FlatList,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLORS} from '../../global/colors';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {FONTS, HomeScreenPng, OnBoarding1Svg} from '../../assets/assets';
import {moderateScale} from '../../helper/Scale';
import {commonDeseaseData} from '../../global/data';
import {CommonDeseaseData} from '../../global/types';
import CustomHeading from '../../Components/CustomHeading';
import Header from '../../Components/Header';

interface HomeScreenProps {}

interface HomeScreenState {
  isLinearGradient: boolean;
}
const time = 2000;
class HomeScreen extends React.Component<HomeScreenProps, HomeScreenState> {
  timer: number = 0;
  constructor(props: HomeScreenProps) {
    super(props);
    this.state = {
      isLinearGradient: true,
    };
  }
  componentDidMount(): void {
    this.timer = Number(
      setTimeout(() => {
        this.setState({isLinearGradient: false});
      }, time),
    );
  }

  componentWillUnmount(): void {
    clearTimeout(this.timer);
  }

  _renderCommnDesease = ({item}: {item: CommonDeseaseData}) => {
    const Svg = item.image;
    return (
      <ImageBackground
        source={item.backgroudImage as ImageSourcePropType}
        style={styles.backImage}>
        <Svg />
        <Text style={styles.textTitle}>{item.title}</Text>
      </ImageBackground>
    );
  };

  _renderAppointments = () => {
    return <></>;
  };
  render() {
    return (
      <>
        <CustomStatusBar />
        <CustomMainView>
          <ImageBackground source={HomeScreenPng} style={styles.imageView}>
            {this.state.isLinearGradient && (
              <LinearGradient
                colors={[COLORS.greeen2, COLORS.greeen1]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={[styles.linearGradient]}>
                <View style={styles.viewText}>
                  <Text style={styles.profilename}>Hi Olivia Doe</Text>
                  <Text style={styles.welText}>Welcome To VHA</Text>
                </View>
                <OnBoarding1Svg
                  width={responsiveScreenWidth(20)}
                  height={responsiveScreenWidth(20)}
                  style={styles.image}
                />
              </LinearGradient>
            )}
            <Header />
            <View style={styles.viewStyle}>
              <CustomHeading title="Common Diseases" />
              <FlatList
                horizontal
                data={commonDeseaseData}
                renderItem={this._renderCommnDesease}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.contentContainerStyle}
              />
            </View>
            <View style={styles.viewStyle}>
              <CustomHeading title="Your Appointments" />
              <FlatList
                horizontal
                data={commonDeseaseData}
                renderItem={this._renderAppointments}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.contentContainerStyle}
              />
            </View>
          </ImageBackground>
        </CustomMainView>
      </>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    color: COLORS.white,
  },
  linearGradient: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(18),
    paddingBottom: responsiveScreenHeight(1),
    paddingHorizontal: responsiveScreenWidth(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    zIndex: 100,
  },
  imageView: {
    flex: 1,
    paddingTop: responsiveScreenHeight(5),
  },

  profilename: {
    color: COLORS.white,
    fontFamily: FONTS.rubik.light,
    fontSize: moderateScale(20),
  },
  welText: {
    color: COLORS.white,
    fontFamily: FONTS.rubik.bold,
    fontSize: moderateScale(25),
  },
  image: {
    borderRadius: responsiveScreenWidth(10),
  },
  viewText: {
    flex: 1,
  },

  viewStyle: {},

  backImage: {
    width: responsiveScreenWidth(22),
    height: responsiveScreenHeight(12),
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: moderateScale(12),
    marginLeft: responsiveScreenWidth(2),
    resizeMode: 'cover',
  },
  contentContainerStyle: {
    paddingHorizontal: responsiveScreenWidth(2),
  },
  textTitle: {
    color: COLORS.white,
    fontFamily: FONTS.rubik.medium,
    fontSize: moderateScale(14),
    marginTop: responsiveScreenHeight(2),
    marginBottom: responsiveScreenHeight(1),
  },
});

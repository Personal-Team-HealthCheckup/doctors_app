import React from 'react';
import CustomStatusBar from '../../Components/CustomStatusBar';
import CustomMainView from '../../Components/CustomMainView';
import {
  FlatList,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../global/colors';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {
  FONTS,
  HomeScreenPng,
  LightSvg,
  NotificationBellSvg,
  OnBoarding1Svg,
  SearchSvg,
  SvgRightArrowSvg,
} from '../../assets/assets';
import {moderateScale} from '../../helper/Scale';
import {commonDeseaseData} from '../../global/data';
import {CommonDeseaseData} from '../../global/types';

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
      <ImageBackground source={item.backgroudImage as ImageSourcePropType}>
        <Svg />
        <Text>{item.title}</Text>
      </ImageBackground>
    );
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
            <View style={styles.mainView}>
              <View style={styles.leftView}>
                <OnBoarding1Svg
                  width={responsiveScreenWidth(18)}
                  height={responsiveScreenWidth(18)}
                  style={styles.image}
                />
              </View>
              <View style={styles.iconView}>
                <View style={styles.icon}>
                  <LightSvg
                    width={'100%'}
                    height={'100%'}
                    style={styles.image}
                  />
                </View>
                <View style={styles.icon}>
                  <SearchSvg
                    width={'100%'}
                    height={'70%'}
                    style={styles.image}
                  />
                </View>
                <View style={styles.icon}>
                  <NotificationBellSvg
                    width={'100%'}
                    height={'100%'}
                    style={styles.image}
                  />
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>1</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.viewStyle}>
              <View style={styles.mainTextView}>
                <Text style={styles.mainText}>Common Diseases</Text>
                <TouchableOpacity style={styles.btn}>
                  <Text style={styles.buttonSeeText}>See all</Text>
                  <SvgRightArrowSvg />
                </TouchableOpacity>
              </View>
              <FlatList
                horizontal
                data={commonDeseaseData}
                renderItem={this._renderCommnDesease}
                keyExtractor={item => item.id.toString()}
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
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveScreenWidth(4),
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(16),
  },
  leftView: {
    flex: 1,
  },
  iconView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    marginLeft: responsiveScreenWidth(4),
    position: 'relative',
    width: responsiveScreenWidth(10),
    height: responsiveScreenWidth(10),
  },
  badge: {
    width: responsiveScreenWidth(5),
    height: responsiveScreenWidth(5),
    position: 'absolute',
    backgroundColor: 'red',
    right: responsiveScreenWidth(-2),
    top: responsiveScreenHeight(-2),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveScreenWidth(2.5),
  },
  badgeText: {
    fontFamily: FONTS.rubik.medium,
    fontSize: moderateScale(10),
    color: COLORS.white,
  },
  viewStyle: {},
  mainTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveScreenWidth(4),
    paddingVertical: responsiveScreenHeight(2),
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    flex: 1,
    fontFamily: FONTS.rubik.medium,
    fontSize: moderateScale(18),
    color: COLORS.white,
  },
  buttonSeeText: {
    color: COLORS.white2gray,
    fontFamily: FONTS.rubik.light,
    fontSize: moderateScale(12),
  },
});

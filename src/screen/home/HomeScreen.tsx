/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import CustomStatusBar from '../../Components/common/CustomStatusBar';
import {
  FlatList,
  Image,
  ImageBackground,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FONTS} from '../../global/theme';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {HomeScreenPng, OnBoarding1Svg} from '../../assets/assets';
import {moderateScale} from '../../helper/Scale';
import {commonDeseaseData, yourAppointmentsData} from '../../global/data';
import {CommonDeseaseData, YourAppointmentsData} from '../../global/types';
import CustomHeading from '../../Components/common/CustomHeading';
import Header from '../../Components/common/Header';
import CustomGButton from '../../Components/common/CustomGButton';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Rating} from 'react-native-ratings';

interface HomeScreenProps {}

interface HomeScreenState {
  isLinearGradient: boolean;
  yourAppointmentsData: YourAppointmentsData[];
}
const time = 2000;
class HomeScreen extends React.Component<HomeScreenProps, HomeScreenState> {
  timer: number = 0;
  constructor(props: HomeScreenProps) {
    super(props);
    this.state = {
      isLinearGradient: true,
      yourAppointmentsData: yourAppointmentsData,
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

  toggleFaverite = (appID: number) => {
    this.setState(preState => ({
      yourAppointmentsData: preState.yourAppointmentsData.map(element => {
        if (element.id === appID) {
          element.isFaveritiated = !element.isFaveritiated;
        }
        return element;
      }),
    }));
  };
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

  ratingCompleted = () => {};

  _renderAppointments = ({
    item,
    index,
  }: {
    item: YourAppointmentsData;
    index: number;
  }) => {
    const degree = item.degree.split('|').join(',');
    const ratingSplit = item.rating.toString().split('.');
    const rating = Number(ratingSplit[0]);
    return (
      <View
        style={[
          styles.appointmentMainView,
          {
            marginRight:
              yourAppointmentsData.length - 1 === index
                ? null
                : responsiveScreenWidth(1),
          },
        ]}>
        <View style={styles.viewImg}>
          <TouchableOpacity
            onPress={() => this.toggleFaverite(item.id)}
            style={styles.likeView}>
            <FontAwesomeIcon
              name={item.isFaveritiated ? 'heart' : 'heart-o'}
              color={item.isFaveritiated ? COLORS.red1 : COLORS.lightBlack2}
              size={20}
            />
          </TouchableOpacity>
          <Image
            source={item.image as ImageSourcePropType}
            style={styles.imageApp}
          />
          <View style={styles.textView}>
            <Text style={styles.textTitle1}>{item.name}</Text>
            <Text style={styles.subTextTitle1}>{degree}</Text>
            <Text style={styles.subTextExpe}>
              {item.experience} Years experience
            </Text>
            <Rating
              ratingBackgroundColor={COLORS.white2gray}
              type="custom"
              style={{backgroundColor: COLORS.transparent}}
              ratingColor={COLORS.yellow}
              imageSize={30}
              readonly
              startingValue={rating}
            />
          </View>
        </View>
        <View style={styles.view1}>
          <View style={styles.view2}>
            <Text style={styles.textNext}>Next Available</Text>
            <View style={styles.view3}>
              <Text style={[styles.textdate]}>10:00</Text>
              <Text style={[styles.textdate, styles.text2]}> AM tomorrow</Text>
            </View>
          </View>
          <View>
            <CustomGButton
              tittle="Reschedule"
              style={styles.button}
              textStyle={styles.buttonText}
            />
          </View>
        </View>
      </View>
    );
  };
  _renderMedicalStores = () => {
    return <></>;
  };
  render() {
    return (
      <>
        <CustomStatusBar />
        <ScrollView bounces={false} contentContainerStyle={styles.container}>
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
                data={this.state.yourAppointmentsData}
                renderItem={this._renderAppointments}
                keyExtractor={item => item.id.toString()}
              />
            </View>
            <View style={styles.viewStyle}>
              <CustomHeading title="Medical Stores" />
              <FlatList
                horizontal
                data={this.state.yourAppointmentsData}
                renderItem={this._renderMedicalStores}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          </ImageBackground>
        </ScrollView>
      </>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    backgroundColor: COLORS.black,
    flex: 1,
  },
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
  appointmentMainView: {
    backgroundColor: COLORS.black2gray,
    paddingHorizontal: responsiveScreenWidth(4),
    width: responsiveWidth(91),
    paddingVertical: responsiveHeight(2),
    borderRadius: moderateScale(12.68),
    position: 'relative',
  },
  imageApp: {
    width: responsiveWidth(28),
    height: responsiveWidth(25),
    borderRadius: moderateScale(4),
    resizeMode: 'cover',
  },
  viewImg: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'relative',
  },
  textTitle1: {
    color: COLORS.white,
    fontFamily: FONTS.rubik.medium,
    fontSize: moderateScale(18),
    lineHeight: moderateScale(18),
  },
  subTextTitle1: {
    color: COLORS.green,
    fontFamily: FONTS.rubik.regular,
    fontSize: moderateScale(13),
  },
  textView: {
    flex: 1,
    marginLeft: responsiveWidth(2),
  },
  subTextExpe: {
    color: COLORS.white2gray,
    fontFamily: FONTS.rubik.light,
    fontSize: moderateScale(12),
  },
  view1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveScreenHeight(2),
    alignItems: 'center',
  },
  view2: {
    flex: 1,
  },
  textNext: {
    color: COLORS.green,
    fontFamily: FONTS.rubik.medium,
    fontSize: moderateScale(13),
  },
  view3: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textdate: {
    fontFamily: FONTS.rubik.medium,
    fontSize: moderateScale(12),
    color: COLORS.white2gray,
  },
  text2: {
    fontFamily: FONTS.rubik.light,
  },
  button: {
    width: responsiveWidth(30),
    height: responsiveHeight(5),
  },
  buttonText: {
    fontSize: moderateScale(12),
  },
  likeView: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1000,
  },
  starView: {
    marginTop: responsiveHeight(1),
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  star: {
    width: responsiveWidth(5),
    height: responsiveWidth(5),
    zIndex: 0,
  },
  activeStar: {
    position: 'absolute',
    backgroundColor: 'yellow',
    width: responsiveWidth(5),
    height: responsiveWidth(5),
    zIndex: 1,
  },
});

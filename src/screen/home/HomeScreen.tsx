import React from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { COLORS, FONTS } from '../../global/theme';
import CustomStatusBar from '../../Components/common/CustomStatusBar';
import { HomeScreenPng, OnBoarding1Svg } from '../../assets/assets';
import { moderateScale } from '../../helper/Scale';
import {
  commonDeseaseData,
  medicalStoreData,
  qualifiedDoctorData,
  yourAppointmentsData,
} from '../../global/data';
import {
  CommonDeseaseData,
  MedicalStoreData,
  Navigation,
  QualifiedDoctorData,
  YourAppointmentsData,
} from '../../global/types';
import CustomHeading from '../../Components/common/CustomHeading';
import Header from '../../Components/common/Header';
import CustomRating from '../../Components/CustomRating';
import CustomAppointmentCard from '../../Components/common/CustomAppointmentCard';
import { DASHBOARD } from '../../Constants/Navigator';
import { navigateTo } from '../../helper/utilities';
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';

interface HomeScreenProps {
  navigation?: Navigation;
}

interface HomeScreenReduxProps {
  authData: RootState['Auth'];
}

type Props = HomeScreenProps & HomeScreenReduxProps;
interface HomeScreenState {
  isLinearGradient: boolean;
  yourAppointmentsData: YourAppointmentsData[];
  medicalPharmacy: MedicalStoreData[];
  qualifiedDoctor: QualifiedDoctorData[];
}
const time = 2000;
class HomeScreen extends React.Component<Props, HomeScreenState> {
  timer: number = 0;
  constructor(props: Props) {
    super(props);
    this.state = {
      isLinearGradient: true,
      yourAppointmentsData: yourAppointmentsData,
      medicalPharmacy: medicalStoreData,
      qualifiedDoctor: qualifiedDoctorData,
    };
  }

  componentDidMount(): void {
    this.timer = Number(
      setTimeout(() => {
        this.setState({ isLinearGradient: false });
      }, time),
    );
  }

  componentWillUnmount(): void {
    clearTimeout(this.timer);
  }

  toggleFaverite = (appID: number) => {
    this.setState(preState => ({
      qualifiedDoctor: preState.qualifiedDoctor.map(element => {
        if (element.id === appID) {
          element.isFaveritiated = !element.isFaveritiated;
        }
        return element;
      }),
    }));
  };

  navigateToAppointments = () => {
    this.props.navigation?.navigate &&
      this.props.navigation?.navigate(DASHBOARD.SELECTTIME);
  };

  _renderCommnDesease = ({ item }: { item: CommonDeseaseData }) => {
    const Svg = item.image;
    return (
      <ImageBackground
        source={item.backgroudImage as ImageSourcePropType}
        style={styles.backImage}
      >
        <Svg />
        <Text style={styles.textTitle}>{item.title}</Text>
      </ImageBackground>
    );
  };
  _renderAppointments = ({
    item,
    index,
  }: {
    item: YourAppointmentsData;
    index: number;
  }) => {
    return (
      <View
        style={[
          index === yourAppointmentsData.length - 1 && styles.cont,
          index === 0 && styles.cont1,
        ]}
      >
        <CustomAppointmentCard
          index={index}
          item={item}
          navigateTo={() => this.navigateToAppointments()}
          yourAppointmentsData={this.state.yourAppointmentsData}
        />
      </View>
    );
  };
  _renderMedicalStores = ({
    item,
    index,
  }: {
    item: MedicalStoreData;
    index: number;
  }) => {
    const lastIndex = this.state.medicalPharmacy.length - 1 === index;
    return (
      <View style={[styles.medView, lastIndex && styles.medView1]}>
        <Image
          source={item.image as ImageSourcePropType}
          style={styles.imageMedic}
        />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.subTitle}</Text>
        <CustomRating
          iconSize={20}
          starViewStyle={styles.viewStar}
          initialValue={item.rating}
          isDisable
          onChange={() => {}}
        />
      </View>
    );
  };

  renderQualifiedDoctor = ({
    item,
    index,
  }: {
    item: QualifiedDoctorData;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigateTo(this.props.navigation, DASHBOARD.DOCTORDETAILS, {
            doctorId: item.id,
          });
        }}
        activeOpacity={1}
        style={[
          styles.qualifierView,
          index === this.state.qualifiedDoctor.length - 1 && styles.lastCss,
        ]}
      >
        <View style={[styles.flexCss, styles.ViewQualifier]}>
          <TouchableOpacity
            onPress={() => this.toggleFaverite(item.id)}
            style={styles.likeView1}
          >
            <FontAwesomeIcon
              name={item.isFaveritiated ? 'heart' : 'heart-o'}
              color={item.isFaveritiated ? COLORS.red1 : COLORS.lightBlack2}
              size={18}
            />
          </TouchableOpacity>
          <View style={[styles.flexCss, styles.viewRating]}>
            <FontAwesomeIcon name="star" color={COLORS.yellow} size={18} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <View style={styles.imageView1}>
          <Image source={item.image} style={styles.image1} />
        </View>
        <View style={styles.textView1}>
          <Text numberOfLines={1} style={[styles.textCommon, styles.text1]}>
            {item.name}
          </Text>
          <View style={[styles.flexCss, styles.textView2]}>
            <Text style={[styles.textCommon, styles.text1$]}>$</Text>
            <Text style={[styles.textCommon, styles.text1sub]}>
              {item.fees}
            </Text>
            <Text style={[styles.textCommon, styles.text1sub]}>/hours</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  handleNavigation = (text: string) => {
    this.props.navigation?.navigate && this.props.navigation.navigate(text);
  };
  toggleDrawer = () => {
    this.props.navigation?.openDrawer && this.props.navigation?.openDrawer();
  };
  render() {
    const { user } = this.props.authData;
    return (
      <View style={styles.mainView}>
        <CustomStatusBar />
        <ImageBackground source={HomeScreenPng} style={styles.imageView}>
          {this.state.isLinearGradient && (
            <LinearGradient
              colors={[COLORS.greeen2, COLORS.greeen1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.linearGradient]}
            >
              <View style={styles.viewText}>
                <Text style={styles.profilename}>Hi {user?.fullName}</Text>
                <Text style={styles.welText}>Welcome To VHA</Text>
              </View>
              <OnBoarding1Svg
                width={responsiveScreenWidth(20)}
                height={responsiveScreenWidth(20)}
                style={styles.image}
              />
            </LinearGradient>
          )}

          <Header
            navigateTo={this.handleNavigation}
            toggleDrawer={this.toggleDrawer}
          />

          <ScrollView
            scrollEventThrottle={16}
            scrollEnabled
            bounces={false}
            contentContainerStyle={styles.contentContainerStyleMain}
            style={styles.container}
          >
            {/* Common Diseases */}
            <View style={styles.viewStyle}>
              <CustomHeading title="Common Diseases" />
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={commonDeseaseData}
                renderItem={this._renderCommnDesease}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.contentContainerStyle}
              />
            </View>

            {/* You Appointment */}
            <View style={styles.viewStyle}>
              <CustomHeading title="Your Appointments" />
              <FlatList
                horizontal
                data={this.state.yourAppointmentsData}
                renderItem={this._renderAppointments}
                keyExtractor={item => item.id.toString()}
              />
            </View>

            {/* Medical sotres */}
            <View style={styles.viewStyle}>
              <CustomHeading title="Medical Stores" />
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={this.state.medicalPharmacy}
                renderItem={this._renderMedicalStores}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.contentContainerStyle1}
              />
            </View>

            {/* Qualified Doctors */}
            <View style={styles.viewStyle}>
              <CustomHeading
                isIcon
                title="Qualified Doctor"
                onPressSeeAll={() => this.handleNavigation(DASHBOARD.DOCTORS)}
              />
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={this.state.qualifiedDoctor}
                renderItem={this.renderQualifiedDoctor}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.contentContainerStyle1}
              />
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  authData: state.Auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    paddingTop: responsiveScreenHeight(2),
  },
  mainView: {
    flex: 1,
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    backgroundColor: COLORS.black,
  },
  imageView: {
    flex: 1,
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    resizeMode: 'cover',
  },
  contentContainerStyleMain: {
    paddingBottom: responsiveHeight(4),
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
  contentContainerStyle1: {
    paddingHorizontal: responsiveScreenWidth(4),
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
    marginRight: responsiveWidth(1),
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
  medView: {
    backgroundColor: COLORS.black2gray,
    width: responsiveWidth(58),
    minHeight: responsiveHeight(35),
    marginRight: responsiveHeight(2),
    zIndex: 10,
    borderRadius: responsiveHeight(2),
    overflow: 'hidden',
    alignItems: 'center',
  },
  medView1: {
    marginRight: responsiveHeight(0),
  },
  imageMedic: {
    width: responsiveWidth(58),
    height: responsiveHeight(30),
    resizeMode: 'cover',
    zIndex: 0,
  },
  subtitle: {
    fontFamily: FONTS.rubik.light,
    color: COLORS.white2gray,
    fontSize: moderateScale(12),
    marginVertical: responsiveHeight(0.5),
  },
  title: {
    fontFamily: FONTS.rubik.medium,
    color: COLORS.white,
    fontSize: moderateScale(18),
    marginVertical: responsiveHeight(0.5),
  },
  viewStar: {
    justifyContent: 'space-between',
    gap: responsiveWidth(1),
    paddingBottom: responsiveScreenHeight(1.5),
  },
  customRating: { justifyContent: 'flex-start', gap: responsiveWidth(2) },
  cont: {
    marginRight: responsiveScreenWidth(1),
  },
  cont1: {
    marginLeft: responsiveScreenWidth(3),
  },

  qualifierView: {
    backgroundColor: COLORS.black2gray,
    borderRadius: moderateScale(12.68),
    width: responsiveWidth(30),
    marginRight: responsiveWidth(3),
    padding: responsiveWidth(1.5),
    paddingHorizontal: responsiveWidth(2),
    paddingBottom: responsiveHeight(0.5),
  },
  lastCss: {
    marginRight: 0,
    paddingHorizontal: 0,
  },
  likeView1: {},
  ViewQualifier: {
    justifyContent: 'space-between',
  },
  viewRating: {
    gap: responsiveWidth(1.4),
  },
  ratingImage: {
    width: responsiveWidth(2),
    height: responsiveHeight(2),
    tintColor: COLORS.yellow,
    resizeMode: 'contain',
  },
  ratingText: {
    color: COLORS.white,
    fontFamily: FONTS.rubik.medium,
    fontSize: responsiveFontSize(1.5),
  },
  flexCss: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageView1: {
    alignSelf: 'center',
    marginVertical: responsiveHeight(1.3),
  },
  image1: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    borderRadius: responsiveScreenWidth(20) / 2,
    resizeMode: 'cover',
  },
  textView1: {
    alignItems: 'center',
    margin: 0,
  },
  text1: {
    fontSize: responsiveFontSize(2),
  },
  text1sub: {
    fontSize: responsiveFontSize(1.5),
  },
  textCommon: {
    fontFamily: FONTS.rubik.medium,
    color: COLORS.white,
  },
  text1$: {
    color: COLORS.green3,
    fontSize: responsiveFontSize(1.5),
  },
  textView2: {},
});

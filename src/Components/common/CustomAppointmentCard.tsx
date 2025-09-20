import React from 'react';
import { YourAppointmentsData } from '../../global/types';
import CustomGButton from './CustomGButton';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
  Image,
  Text,
  Animated,
} from 'react-native';
import CustomRating from '../../Components/CustomRating';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { COLORS, FONTS } from '../../global/theme';
import { moderateScale } from '../../helper/Scale';
import { HeartImg, HeartRedImg } from '../../assets/assets';

interface CustomAppointmentCardProps {
  item: YourAppointmentsData;
  index: number;
  yourAppointmentsData: YourAppointmentsData[];
  navigateTo?: () => void;
}

interface CustomAppointmentCardState {
  yourAppointmentsData: YourAppointmentsData[];
  animation: Animated.Value;
}

class CustomAppointmentCard extends React.Component<
  CustomAppointmentCardProps,
  CustomAppointmentCardState
> {
  constructor(props: CustomAppointmentCardProps) {
    super(props);
    this.state = {
      animation: new Animated.Value(1),
      yourAppointmentsData: props.yourAppointmentsData,
    };
  }
  componentDidMount(): void {
    this.setState({ yourAppointmentsData: this.props.yourAppointmentsData });
  }

  toggleFaverite = (appID: number) => {
    this.setState(preState => ({
      yourAppointmentsData: preState.yourAppointmentsData.map(element => {
        if (element.id === appID) {
          !element.isFaveritiated &&
            Animated.spring(this.state.animation, {
              toValue: 1.2,
              friction: 1.5,
              useNativeDriver: true,
            }).start(() => {
              Animated.spring(this.state.animation, {
                toValue: 1,
                friction: 2,
                useNativeDriver: true,
              }).start();
            });
          element.isFaveritiated = !element.isFaveritiated;
        }
        return element;
      }),
    }));
  };

  render() {
    const { item } = this.props;
    const degree = item.degree.split('|').join(',');
    return (
      <View style={[styles.appointmentMainView]}>
        <View style={styles.viewImg}>
          <TouchableOpacity
            onPress={() => this.toggleFaverite(item.id)}
            style={styles.likeView}
          >
            <Animated.Image
              resizeMode={'contain'}
              source={item.isFaveritiated ? HeartRedImg : HeartImg}
              style={[
                styles.likeImage,
                { transform: [{ scale: this.state.animation }] },
              ]}
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
            <View style={styles.viewText}>
              <CustomRating
                iconSize={20}
                starViewStyle={[styles.viewStar, styles.customRating]}
                initialValue={item.rating}
                isDisable
                onChange={() => {}}
              />
              <Text style={styles.textdate}>
                {item.rating}
                <Text style={styles.text2}>({item.views})</Text>
              </Text>
            </View>
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
              tittle={item.isAvailable ? 'Book Now' : 'Reschedule'}
              style={styles.button}
              textStyle={styles.buttonText}
              onPress={() => this.props?.navigateTo && this.props?.navigateTo()}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingBottom: responsiveScreenHeight(1.5),
  },
  container: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    backgroundColor: COLORS.black,
    flex: 1,
  },

  profilename: {
    color: COLORS.white,
    fontFamily: FONTS.rubik.light,
    fontSize: moderateScale(20),
  },

  viewStyle: {},

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
  viewStar: {
    justifyContent: 'space-between',
    gap: responsiveWidth(1),
  },
  customRating: { justifyContent: 'flex-start', gap: responsiveWidth(2) },
  cont: {
    marginRight: responsiveScreenWidth(1),
  },
  cont1: {
    marginLeft: responsiveScreenWidth(3),
  },
  ratingText: {
    color: COLORS.white,
    fontFamily: FONTS.rubik.medium,
    fontSize: responsiveFontSize(1.5),
  },
  likeImage: {
    width: 20,
    height: 20,
  },
});

export default CustomAppointmentCard;

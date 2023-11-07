import React from 'react';
import {
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import CustomStatusBar from '../../Components/common/CustomStatusBar';
import CustomHeader from '../../Components/common/CustomHeader';
import {gradientPng, imageProfile3} from '../../assets/assets';
import {Navigation} from '../../global/types';
import {handleScroll} from '../../helper/utilities';
import {COLORS, FONTS} from '../../global/theme';
import {
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {moderateScale} from '../../helper/Scale';
import CustomRating from '../../Components/CustomRating';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
interface SelectTimePageProps {
  navigation?: Navigation;
}

interface SelectTimePageState {
  isScrollEnabled: boolean;
}

class SelectTimePage extends React.Component<
  SelectTimePageProps,
  SelectTimePageState
> {
  constructor(props: SelectTimePageProps) {
    super(props);
    this.state = {
      isScrollEnabled: false,
    };
  }
  handleScroll1 = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    this.setState({isScrollEnabled: handleScroll(event)});
  };
  render() {
    return (
      <View style={styles.mainView}>
        <CustomStatusBar
          isScrollEnabled={this.state.isScrollEnabled}
          backgroundColor={
            this.state.isScrollEnabled ? COLORS.white : COLORS.transparent
          }
        />

        <ScrollView
          scrollEnabled={false}
          onScroll={event => this.handleScroll1(event)}
          scrollEventThrottle={16}
          bounces={false}
          style={styles.container}>
          <ImageBackground source={gradientPng} style={styles.imageView}>
            <CustomHeader
              navigation={this.props.navigation}
              heading="Select Time"
              isIcon
            />
            <View style={styles.mainView1}>
              <View style={styles.cardDoctor}>
                <View style={styles.imageView1}>
                  <Image source={imageProfile3} style={styles.imageStyles} />
                  <View style={styles.textView}>
                    <Text numberOfLines={2} style={styles.heading}>
                      Dr. Julie Will Dr. Julie Will Dr. Julie Will
                    </Text>
                    <Text numberOfLines={3} style={[styles.subHeading]}>
                      Upasana Dental Clinic, salt lake
                    </Text>
                    <CustomRating
                      initialValue={3}
                      iconSize={18}
                      isDisable
                      starViewStyle={styles.customRating}
                    />
                  </View>
                </View>
                <TouchableOpacity style={styles.likeButton}>
                  <FontAwesomeIcon
                    name={true ? 'heart' : 'heart-o'}
                    color={true ? COLORS.red1 : COLORS.lightBlack2}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </ScrollView>
      </View>
    );
  }
}

export default SelectTimePage;
const styles = StyleSheet.create({
  mainView: {flex: 1},
  container: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    backgroundColor: COLORS.black,
    flex: 1,
  },
  imageView: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    alignItems: 'center',
    resizeMode: 'cover',
    paddingVertical: responsiveHeight(3),
    position: 'relative',
    paddingHorizontal: responsiveScreenWidth(5),
    flex: 1,
  },
  textInput: {marginTop: responsiveHeight(4)},
  stylesFlatlist: {
    marginVertical: '5%',
  },
  doctorList: {marginVertical: 4},
  contentContainer: {paddingBottom: responsiveHeight(15)},
  cardDoctor: {
    backgroundColor: COLORS.black2gray,
    borderRadius: responsiveHeight(2),
    width: responsiveWidth(90),
    minHeight: responsiveHeight(16),
    padding: responsiveWidth(4),
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    fontFamily: FONTS.rubik.medium,
    fontSize: moderateScale(18),
    color: COLORS.white,
    width: '50%',
  },
  subHeading: {
    fontSize: moderateScale(12),
    color: COLORS.white2gray,
    fontFamily: FONTS.rubik.light,
    width: '50%',
  },
  mainView1: {
    marginTop: responsiveHeight(2),
  },
  imageStyles: {
    width: responsiveHeight(14),
    height: responsiveHeight(14),
    resizeMode: 'cover',
    borderRadius: responsiveWidth(2),
  },
  imageView1: {
    flexDirection: 'row',
    flex: 1,
    gap: responsiveWidth(3),
    alignItems: 'center',
  },
  customRating: {
    marginTop: responsiveHeight(1),
    gap: responsiveWidth(1),
  },
  textView: {},
  likeButton: {
    alignItems: 'flex-start',
  },
});

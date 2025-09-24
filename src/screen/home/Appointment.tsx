import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
} from 'react-native';
import CustomStatusBar from '../../Components/common/CustomStatusBar';
import CustomHeader from '../../Components/common/CustomHeader';
import { gradientPng, imageProfile1, PlusIconImage } from '../../assets/assets';
import { Navigation } from '../../global/types';
import { COLORS, FONTS } from '../../global/theme';
import {
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { moderateScale } from '../../helper/Scale';
import { patientStatistic } from '../../global/data';
import CustomGButton from '../../Components/common/CustomGButton';
import CustomDoctoDetailCard from '../../Components/CustomDoctoDetailCard';
import CustomTextInput from '../../Components/common/CustomTextInput';
interface AppointPageProps {
  navigation?: Navigation;
}

interface AppointPageState {}

class AppointPage extends React.Component<AppointPageProps, AppointPageState> {
  constructor(props: AppointPageProps) {
    super(props);
    this.state = {};
  }

  _renderPatients = ({ item, index }: { item: string; index: number }) => {
    return index === 0 ? (
      <View
        style={[
          {
            backgroundColor: COLORS.greenLightRGBA,
            justifyContent: 'center',
            alignItems: 'center',
            width: responsiveScreenWidth(22),
            height: responsiveScreenHeight(12),
            borderRadius: 6,
          },
        ]}
      >
        <PlusIconImage width={20} height={20} />
        <Text style={styles.textTitle}> Add</Text>
      </View>
    ) : (
      <View style={[styles.backImage]}>
        <Image
          source={imageProfile1}
          style={styles.imageStyles}
          resizeMode="cover"
        />
        <Text style={styles.textTitle}>{item}</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.mainContainerStyles}>
        <CustomStatusBar
          isScrollEnabled={false}
          backgroundColor={COLORS.transparent}
        />

        <ImageBackground source={gradientPng} style={styles.imageViewStyles}>
          <View style={styles.container}>
            <CustomHeader
              navigation={this.props.navigation}
              heading="Doctor Details"
              isIcon
            />
            <ScrollView
              scrollEnabled={true}
              bounces={false}
              contentContainerStyle={styles.contentContainerStyle}
            >
              <View style={styles.mainView1}>
                <CustomDoctoDetailCard />
                <View style={styles.flatMainView}>
                  <Text
                    style={[
                      styles.heading1,
                      { marginBottom: responsiveHeight(2) },
                    ]}
                  >
                    Appointment For
                  </Text>

                  <CustomTextInput placeholder="Patient Name" />
                  <CustomTextInput placeholder="Contact Number" />
                </View>
                <Text
                  style={[
                    styles.heading1,
                    { marginBottom: responsiveHeight(2) },
                  ]}
                >
                  Who is this patient?
                </Text>

                <View style={styles.viewStyle}>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={['', 'My Self', 'My Child', 'My Parent', 'Relative']}
                    renderItem={this._renderPatients}
                    keyExtractor={item => item.toString()}
                    contentContainerStyle={styles.contentContainerStyle}
                  />
                </View>
              </View>
            </ScrollView>
            <CustomGButton
              tittle="Next"
              style={styles.buttonSlots}
              textStyle={styles.text}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default AppointPage;
const styles = StyleSheet.create({
  imageStyles: {
    width: responsiveScreenWidth(22),
    height: responsiveScreenHeight(12),
    borderRadius: moderateScale(12),
    resizeMode: 'cover',
  },
  viewStyle: {},
  textTitle: {
    color: COLORS.white2gray,
    fontFamily: FONTS.rubik.regular,
    fontSize: moderateScale(14),
  },
  backImage: {
    width: responsiveScreenWidth(22),
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 6,
    marginLeft: responsiveScreenWidth(2),
  },
  textStyles: {
    color: COLORS.white2gray,
    marginBottom: 0,
    fontFamily: FONTS.rubik.regular,
    fontSize: moderateScale(15),
  },
  flatMainView: {
    marginTop: responsiveHeight(2),
  },
  textCard: {
    backgroundColor: COLORS.lightBalckishGrey,
    width: 90,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textdate: {
    fontFamily: FONTS.rubik.medium,
    fontSize: moderateScale(18),
    color: COLORS.white,
  },
  text2: {
    fontFamily: FONTS.rubik.light,
    fontSize: moderateScale(15),
  },
  mainContainerStyles: {
    flex: 1,
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    backgroundColor: COLORS.black,
  },
  contentContainerStyle: { paddingBottom: responsiveHeight(10) },
  container: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    flex: 1,
    paddingHorizontal: responsiveScreenWidth(5),
    paddingVertical: responsiveHeight(3),
  },
  imageViewStyles: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    alignItems: 'center',
    resizeMode: 'cover',
    position: 'relative',
    flex: 1,
  },
  mainView1: {
    marginTop: responsiveHeight(2),
  },
  gradient: {
    borderWidth: responsiveWidth(0),
    borderColor: 'transparent',
  },
  heading1: {
    fontFamily: FONTS.rubik.medium,
    fontSize: moderateScale(16),
    color: COLORS.white,
  },
  text: {
    fontFamily: FONTS.rubik.medium,
    fontSize: moderateScale(18),
  },
  text1: {
    color: COLORS.white2gray,
    marginBottom: responsiveHeight(2),
  },
  buttonSlots: {
    alignSelf: 'center',
    width: responsiveWidth(70),
  },
});

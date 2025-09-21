import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
} from 'react-native';
import CustomStatusBar from '../../Components/common/CustomStatusBar';
import CustomHeader from '../../Components/common/CustomHeader';
import { gradientPng } from '../../assets/assets';
import { Navigation } from '../../global/types';
import { COLORS, FONTS } from '../../global/theme';
import {
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { moderateScale } from '../../helper/Scale';
import { patientStatistic } from '../../global/data';
import CustomGButton from '../../Components/common/CustomGButton';
import CustomDoctoDetailCard from '../../Components/CustomDoctoDetailCard';
interface DoctorDetailsPageProps {
  navigation?: Navigation;
}

interface DoctorDetailsPageState {}

class DoctorDetailsPage extends React.Component<
  DoctorDetailsPageProps,
  DoctorDetailsPageState
> {
  constructor(props: DoctorDetailsPageProps) {
    super(props);
    this.state = {};
  }

  _renterServices = ({ item, index }: { item: string; index: number }) => {
    return (
      <View>
        <Text style={styles.text1}>
          {index + 1}.{item}
        </Text>
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
              heading="Select Time"
              isIcon
            />
            <ScrollView
              scrollEnabled={true}
              bounces={false}
              contentContainerStyle={styles.contentContainerStyle}
            >
              <View style={styles.mainView1}>
                <CustomDoctoDetailCard />

                <View style={styles.buttonViewSlot}>
                  {patientStatistic.map(item => (
                    <View key={item.id} style={styles.textCard}>
                      <Text style={styles.textdate}>{item.count}</Text>
                      <Text style={[styles.textdate, styles.text2]}>
                        {item.title}
                      </Text>
                    </View>
                  ))}
                </View>
                <View>
                  <Text style={styles.heading1}>Services</Text>

                  <FlatList
                    data={[
                      'Instant Appointments',
                      'Specialists Available',
                      ' Physical and Virtual Consultations',
                      'Instant Prescriptions',
                    ]}
                    renderItem={item => this._renterServices(item)}
                  />
                </View>
                <CustomGButton
                  tittle="Next"
                  style={styles.buttonSlots}
                  textStyle={styles.text}
                />
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default DoctorDetailsPage;
const styles = StyleSheet.create({
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
  buttonViewSlot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: responsiveHeight(4),
    borderRadius: 10,
    backgroundColor: '#222338',
    gap: 8,
    width: responsiveWidth(80),
    padding: 10,
    alignSelf: 'center',
  },
});

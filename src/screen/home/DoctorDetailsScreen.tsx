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
import {
  Navigation,
  Slots,
  SlotsAvailableChangeData,
  SlotsDateTimes,
} from '../../global/types';
import { COLORS, FONTS } from '../../global/theme';
import {
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { moderateScale } from '../../helper/Scale';
import {
  patientStatistic,
  slotsAvailable,
  slotsDateTimes,
} from '../../global/data';
import CustomGButton from '../../Components/common/CustomGButton';
import CustomDoctoDetailCard from '../../Components/CustomDoctoDetailCard';
interface DoctorDetailsPageProps {
  navigation?: Navigation;
}

interface DoctorDetailsPageState {
  isScrollEnabled: boolean;
}

class DoctorDetailsPage extends React.Component<
  DoctorDetailsPageProps,
  DoctorDetailsPageState
> {
  constructor(props: DoctorDetailsPageProps) {
    super(props);
    this.state = {
      isScrollEnabled: false,
    };
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
      <View style={styles.mainView}>
        <CustomStatusBar
          isScrollEnabled={this.state.isScrollEnabled}
          backgroundColor={
            this.state.isScrollEnabled ? COLORS.white : COLORS.transparent
          }
        />

        <ImageBackground source={gradientPng} style={styles.imageView}>
          <View style={styles.container}>
            <CustomHeader
              navigation={this.props.navigation}
              heading="Select Time"
              isIcon
            />
            <ScrollView
              scrollEnabled={true}
              bounces={false}
              contentContainerStyle={styles.buttonContainerStyle}
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
  mainView: {
    flex: 1,
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    backgroundColor: COLORS.black,
  },
  buttonContainerStyle: { paddingBottom: responsiveHeight(10) },
  container: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    flex: 1,
    paddingHorizontal: responsiveScreenWidth(5),
    paddingVertical: responsiveHeight(3),
  },
  imageView: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    alignItems: 'center',
    resizeMode: 'cover',

    position: 'relative',
    flex: 1,
  },
  textInput: { marginTop: responsiveHeight(4) },
  stylesFlatlist: {
    marginVertical: '5%',
  },
  doctorList: { marginVertical: 4 },
  contentContainer: { paddingBottom: responsiveHeight(15) },
  mainView1: {
    marginTop: responsiveHeight(2),
  },
  slotView: {
    borderColor: 'rgba(103, 114, 148, 0.10);',
    borderWidth: responsiveWidth(0.5),
    width: responsiveWidth(40),
    padding: responsiveWidth(2),
    paddingHorizontal: responsiveWidth(0),
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(8),
    borderRadius: responsiveWidth(2),
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
  subHeading1: {
    fontSize: moderateScale(10),
    color: COLORS.white2gray,
    fontFamily: FONTS.rubik.light,
  },
  contentContainerStyle: {
    gap: responsiveWidth(1),
    paddingBottom: 0,
  },
  subHe: {
    fontSize: moderateScale(14),
    fontFamily: FONTS.rubik.regular,
    marginTop: responsiveHeight(2),
  },
  styleFlat: {},
  fltView: {
    height: responsiveHeight(10),
    marginVertical: responsiveHeight(2),
  },
  text: {
    fontFamily: FONTS.rubik.medium,
    fontSize: moderateScale(18),
  },
  text1: {
    color: COLORS.white2gray,
    marginBottom: responsiveHeight(2),
  },
  headingText: {
    color: COLORS.green,
    fontSize: moderateScale(13),
  },
  headingSelectText: {
    color: COLORS.white,
  },
  buttonSlot: {
    backgroundColor: COLORS.greygreeen,
    width: responsiveWidth(20),
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsiveWidth(1.5),
    paddingVertical: responsiveHeight(2),
  },
  gradient1: {
    padding: responsiveWidth(0),
    paddingVertical: responsiveHeight(0),
    borderRadius: responsiveWidth(2.5),
  },
  flatSlotList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: responsiveWidth(3),
    marginTop: responsiveHeight(2),
  },
  slotAvailableView: {
    marginTop: responsiveHeight(2),
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

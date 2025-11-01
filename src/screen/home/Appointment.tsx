import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
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
import CustomGButton from '../../Components/common/CustomGButton';
import CustomDoctoDetailCard from '../../Components/CustomDoctoDetailCard';
import CustomTextInput from '../../Components/common/CustomTextInput';
import CustomIcons from 'react-native-vector-icons/FontAwesome5';

interface AppointPageProps {
  navigation?: Navigation;
}

const paymentMethods = [
  'Wallet',
  'Credit Card',
  'Pay to doctor directly',
  'UPI',
];

interface AppointPageState {
  selectedPayment: string;
}

class AppointPage extends React.Component<AppointPageProps, AppointPageState> {
  constructor(props: AppointPageProps) {
    super(props);
    this.state = {
      selectedPayment: paymentMethods[0],
    };
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
              heading="Appointment Details"
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
                  {/*  <Text
                    style={[
                      styles.heading1,
                      { marginBottom: responsiveHeight(2) },
                    ]}
                  >
                    Appointment For
                  </Text>

                  <CustomTextInput placeholder="Patient Name" />
                  <CustomTextInput placeholder="Contact Number" />*/}
                </View>
                <Text
                  style={[
                    styles.heading1,
                    { marginBottom: responsiveHeight(2) },
                  ]}
                >
                  Appointment For
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
                <View>
                  <CustomTextInput
                    label="Time"
                    placeholder="Change Time"
                    value="2:00 PM on 17th Feb"
                    editable={false}
                  />

                  <CustomTextInput
                    label="Select Type"
                    placeholder="Change Type"
                    value="Physical Appointment"
                    editable={false}
                  />
                  <CustomTextInput
                    label="Address"
                    placeholder="Change Address"
                    value="123 Main St, City, Country"
                    editable={false}
                  />
                </View>

                <View style={styles.orderSummaryContainer}>
                  <Text style={styles.heading1}>Order Summary</Text>

                  <View style={styles.orderCard}>
                    <View style={styles.orderRow}>
                      <Text style={styles.orderLabel}>Consultation Fee:</Text>
                      <Text style={styles.orderValue}>$50</Text>
                    </View>

                    <View style={styles.orderRow}>
                      <Text style={styles.orderLabel}>Taxes:</Text>
                      <Text style={styles.orderValue}>$5</Text>
                    </View>

                    <View style={styles.orderRowTotal}>
                      <Text style={styles.orderTotalLabel}>Total:</Text>
                      <Text style={styles.orderTotalValue}>$55</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.paymentContainer}>
                <Text style={[styles.heading1, styles.paymentHeading]}>
                  Payment Methods
                </Text>

                <View style={styles.paymentOptions}>
                  {paymentMethods.map(method => (
                    <TouchableOpacity
                      key={method}
                      style={styles.paymentOptionRow}
                      onPress={() => this.setState({ selectedPayment: method })}
                    >
                      <CustomIcons
                        name={
                          this.state.selectedPayment === method
                            ? 'check-circle'
                            : 'circle'
                        }
                        size={20}
                        color={
                          this.state.selectedPayment === method
                            ? COLORS.green
                            : COLORS.greyBlack
                        }
                      />
                      <Text style={styles.paymentText}>{method}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>
            <CustomGButton
              tittle="Confirm Appointment"
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
  orderSummaryContainer: {
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(2),
  },
  orderCard: {
    backgroundColor: COLORS.lightBalckishGrey,
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
    marginTop: moderateScale(8),
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(8),
  },
  orderLabel: {
    fontFamily: FONTS.rubik.regular,
    fontSize: moderateScale(14),
    color: COLORS.white2gray,
  },
  orderValue: {
    fontFamily: FONTS.rubik.regular,
    fontSize: moderateScale(14),
    color: COLORS.white,
  },
  orderRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.white2gray + '40', // light divider
    paddingTop: moderateScale(8),
    marginTop: moderateScale(4),
  },
  orderTotalLabel: {
    fontFamily: FONTS.rubik.medium,
    fontSize: moderateScale(16),
    color: COLORS.white,
  },
  orderTotalValue: {
    fontFamily: FONTS.rubik.medium,
    fontSize: moderateScale(16),
    color: COLORS.green,
  },
  paymentContainer: {
    marginTop: responsiveHeight(2),
  },
  paymentHeading: {
    marginBottom: 10,
  },
  paymentOptions: {
    flexDirection: 'column',
  },
  paymentOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(12),
  },
  paymentText: {
    color: COLORS.white2gray,
    fontSize: moderateScale(14),
    fontFamily: FONTS.rubik.regular,
    marginLeft: moderateScale(10),
  },
  radioOuter: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: 50,
    backgroundColor: COLORS.green,
  },
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
  contentContainerStyle: { paddingBottom: responsiveHeight(2) },
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

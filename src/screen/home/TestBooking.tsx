import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import CustomStatusBar from '../../Components/common/CustomStatusBar';
import CustomHeader from '../../Components/common/CustomHeader';
import { Navigation } from '../../global/types';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { COLORS, FONTS } from '../../global/theme';
import { bgTokenImg, MedicalRecordImage } from '../../assets/assets';
import CustomGButton from '../../Components/common/CustomGButton';
import { HOME } from '../../Constants/Navigator';
import { navigateTo } from '../../helper/utilities';

interface TestBookingProps {
  navigation?: Navigation;
}

function TestBooking({ navigation }: TestBookingProps) {
  const handleGoHome = () => {
    navigateTo(navigation, HOME.BOTTOMTABS);
  };

  return (
    <View style={styles.mainContainer}>
      <CustomStatusBar />
      <ImageBackground
        source={bgTokenImg}
        style={styles.backgroundImage}
        imageStyle={styles.imageStyle}
      >
        <CustomHeader heading="Test Booking" navigation={navigation} isIcon />
        <View style={styles.contentWrapper}>
          <View style={styles.circleWrapper}>
            <MedicalRecordImage
              width={responsiveWidth(32)}
              height={responsiveWidth(32)}
            />
          </View>
          <Text style={styles.title}>No test booked yet</Text>
          <Text style={styles.subtitle}>This feature is coming soon</Text>
          <CustomGButton
            testID="btnGoBack"
            tittle="Go Back Home"
            style={styles.ctaButton}
            onPress={handleGoHome}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

export default TestBooking;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  backgroundImage: {
    flex: 1,
    width: responsiveScreenWidth(100),
    paddingVertical: responsiveHeight(3),
    paddingHorizontal: responsiveScreenWidth(5),
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  contentWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleWrapper: {
    width: responsiveWidth(50),
    height: responsiveWidth(50),
    borderRadius: responsiveWidth(25),
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(4),
  },
  illustrationEmoji: {
    fontSize: responsiveWidth(18),
  },
  title: {
    color: COLORS.white,
    fontFamily: FONTS.poppins.bold,
    fontSize: responsiveFontSize(2.7),
    marginBottom: responsiveHeight(1),
  },
  subtitle: {
    color: COLORS.white2gray,
    fontFamily: FONTS.inter['regular[400]'],
    fontSize: responsiveFontSize(1.8),
    marginBottom: responsiveHeight(4),
  },
  ctaButton: {
    width: responsiveWidth(70),
    borderRadius: responsiveWidth(3),
  },
  alertWrapper: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    marginLeft: responsiveWidth(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

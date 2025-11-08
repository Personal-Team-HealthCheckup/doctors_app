import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomStatusBar from '../../Components/common/CustomStatusBar';
import CustomHeader from '../../Components/common/CustomHeader';
import { Navigation } from '../../global/types';
import { gradientPng, MedicalRecordImage } from '../../assets/assets';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { COLORS, FONTS } from '../../global/theme';
import CustomGButton from '../../Components/common/CustomGButton';

interface MedicalRecordPageProps {
  navigation?: Navigation;
}

class MedicalRecordPage extends React.Component<MedicalRecordPageProps> {
  handleAddRecord = () => {
    // Hook for future navigation / logic
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <CustomStatusBar />
        <ImageBackground
          source={gradientPng}
          style={styles.image}
          imageStyle={styles.imageStyle}
        >
          <CustomHeader
            heading="Medical Record"
            navigation={this.props.navigation}
            isIcon
          />
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View style={styles.contentWrapper}>
              <View style={styles.circleWrapper}>
                <MedicalRecordImage
                  width={responsiveWidth(25)}
                  height={responsiveWidth(25)}
                />
              </View>

              <Text style={styles.title}>Add a medical record.</Text>
              <Text style={styles.description}>
                A detailed health history helps a doctor diagnose you better.
              </Text>

              <CustomGButton
                tittle="Add a record"
                style={styles.ctaButton}
                onPress={this.handleAddRecord}
              />
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

export default MedicalRecordPage;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  image: {
    flex: 1,
    width: responsiveScreenWidth(100),
    paddingVertical: responsiveHeight(3),
    paddingHorizontal: responsiveScreenWidth(5),
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  contentWrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    gap: responsiveHeight(1),
  },
  circleWrapper: {
    width: responsiveWidth(50),
    height: responsiveWidth(50),
    borderRadius: responsiveWidth(25),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(34, 35, 56, 0.8)',
  },

  title: {
    fontFamily: FONTS.poppins.bold,
    fontSize: responsiveFontSize(3),
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: responsiveHeight(1),
  },
  description: {
    fontFamily: FONTS.inter['regular[400]'],
    fontSize: responsiveFontSize(1.9),
    color: COLORS.white2gray,
    textAlign: 'center',
    lineHeight: responsiveHeight(3),
    marginBottom: responsiveHeight(4),
    paddingHorizontal: responsiveWidth(5),
  },
  ctaButton: {
    width: responsiveWidth(70),
    borderRadius: responsiveWidth(3),
  },
  alertButton: {
    marginLeft: responsiveWidth(4),
  },
  alertGradient: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import CustomStatusBar from '../../Components/common/CustomStatusBar';
import { HomeScreenPng, bgTokenImg } from '../../assets/assets';
import CustomHeader from '../../Components/common/CustomHeader';
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import { COLORS, FONTS } from '../../global/theme';
import LinearGradient from 'react-native-linear-gradient';
import GradientText from '../../Components/CommonGradientText';

interface TokenOfferProps { }

interface TokenOfferState { }

class TokenOffer extends React.Component<TokenOfferProps, TokenOfferState> {
  constructor(props: TokenOfferProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <CustomStatusBar />
        <ImageBackground source={bgTokenImg} style={styles.image}>
          <CustomHeader heading='' isIcon />
          <ScrollView
            scrollEventThrottle={16}
            bounces={false}
            contentContainerStyle={{ paddingBottom: "10%" }}
            style={styles.container}>
            <View style={styles.mainView}>
              <Text style={styles.subtitle}>
                Introducing easy payment gateway
              </Text>
              <GradientText colors={['#46AA72', '#2DA0A4']} style={styles.title}>
                VHA Token
              </GradientText>
              <Text style={styles.heading}>Zero fee with VHA Token
              </Text>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

export default TokenOffer;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    backgroundColor: COLORS.black,
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    resizeMode: 'cover',
    paddingVertical: responsiveHeight(3),
    paddingHorizontal: responsiveScreenWidth(5),
  },
  mainView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: responsiveHeight(3),
    flexDirection: 'column',
  },
  title: {
    fontFamily: FONTS.poppins.semiBold,
    fontSize: responsiveFontSize(2.5),
  },
  subtitle: {
    fontFamily: FONTS.poppins.medium,
    fontSize: responsiveFontSize(2),
    color: COLORS.white,
    marginTop: responsiveHeight(1),
  },
  heading:{
    // fontFamily: FONTS.,
  }
});

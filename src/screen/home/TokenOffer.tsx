import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import CustomStatusBar from '../../Components/common/CustomStatusBar';
import { bgTokenImg } from '../../assets/assets';
import CustomHeader from '../../Components/common/CustomHeader';
import { responsiveFontSize, responsiveHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import { COLORS, FONTS } from '../../global/theme';
import GradientText from '../../Components/CommonGradientText';
import CustomGButton from '../../Components/common/CustomGButton';

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
              <GradientText colors={[COLORS.greeen1, COLORS.greeen2]} style={styles.title}>
                VHA Token
              </GradientText>
              <View style={{ marginVertical: responsiveHeight(3) }} >
                <View style={{ flexDirection: 'row', alignItems: "center", columnGap: responsiveWidth(2), rowGap: responsiveWidth(.1), marginBottom: responsiveHeight(1.5), flexWrap: 'wrap' }}>
                  <Text style={styles.heading}>Zero fee with
                  </Text>
                  <GradientText
                    colors={[COLORS.greeen1, COLORS.greeen2]} style={styles.heading}>
                    VHA
                  </GradientText>
                  <GradientText colors={[COLORS.greeen1, COLORS.greeen2]} style={styles.heading}>
                    Token
                  </GradientText>
                </View>

                <Text style={styles.subtitle1}>VHA will charge 10% commission for all the appointments made through VHA, 5% will be distributed to token holders and other 5% will go to the development</Text>
              </View>
            </View>
            <View style={{ alignItems: 'center',flex:1,justifyContent:"flex-end" }}>
              <CustomGButton tittle="Connect Wallet" />
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
    fontSize: responsiveFontSize(3),
  },
  subtitle: {
    fontFamily: FONTS.poppins.medium,
    fontSize: responsiveFontSize(2.35),
    color: COLORS.white,
    marginTop: responsiveHeight(1),
  },
  heading: {
    fontFamily: FONTS.inter['semiBold[600]'],
    color: COLORS.white,
    fontSize: responsiveFontSize(4.2),
  },
  subtitle1: {
    fontFamily: FONTS.inter['regular[400]'],
    color: COLORS.white,
    fontSize: responsiveFontSize(2),
  }
});

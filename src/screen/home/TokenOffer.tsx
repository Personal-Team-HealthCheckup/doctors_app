import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomStatusBar from '../../Components/common/CustomStatusBar';
import {bgTokenImg} from '../../assets/assets';
import CustomHeader from '../../Components/common/CustomHeader';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {COLORS, FONTS} from '../../global/theme';
import GradientText from '../../Components/CommonGradientText';
import CustomGButton from '../../Components/common/CustomGButton';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

interface TokenOfferProps {}

interface TokenOfferState {}

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
          <CustomHeader heading="" isIcon />
          <ScrollView
            scrollEventThrottle={16}
            bounces={false}
            contentContainerStyle={{paddingBottom: '10%'}}
            style={styles.container}>
            <View style={styles.mainView}>
              <Text style={styles.subtitle}>
                Introducing easy payment gateway
              </Text>
              <GradientText
                colors={[COLORS.greeen1, COLORS.greeen2]}
                style={styles.title}>
                VHA Token
              </GradientText>
              <View style={{marginVertical: responsiveHeight(3)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: responsiveWidth(2),
                    rowGap: responsiveWidth(0.1),
                    marginBottom: responsiveHeight(1.5),
                    flexWrap: 'wrap',
                  }}>
                  <Text style={styles.heading}>Zero fee with</Text>
                  <GradientText
                    colors={[COLORS.greeen1, COLORS.greeen2]}
                    style={styles.heading}>
                    VHA
                  </GradientText>
                  <GradientText
                    colors={[COLORS.greeen1, COLORS.greeen2]}
                    style={styles.heading}>
                    Token
                  </GradientText>
                </View>

                <Text style={styles.subtitle1}>
                  VHA will charge 10% commission for all the appointments made
                  through VHA, 5% will be distributed to token holders and other
                  5% will go to the development
                </Text>
              </View>
            </View>

            <View style={styles.wrapper}>
              <LinearGradient
                colors={[
                  COLORS.tokenGreen,
                  COLORS.greeen1,
                  COLORS.blueish,
                  COLORS.tokenGreen2,
                ]}
                start={{x: 0.2, y: 0}}
                end={{x: 1, y: 0.3}}
                style={styles.shadowCard}/>
              <LinearGradient
                colors={[
                  COLORS.tokenGreen,
                  COLORS.greeen1,
                  COLORS.blueish,
                  COLORS.tokenGreen2,
                ]}
                start={{x: 0.2, y: 0}}
                end={{x: 1, y: 0.3}}
                style={styles.card}>
                <View style={styles.topRow}>
                  <Icon
                    name="shield"
                    size={20}
                    color="#fff"
                    style={{marginRight: 6}}
                  />
                  <View>
                    <Text style={styles.securedBy}>Secured by</Text>
                    <Text style={styles.securityName}>
                      Virtual Health Assistant Security
                    </Text>
                  </View>
                </View>

                <View style={styles.middleRow}>
                  <Text style={styles.stars}>****</Text>
                  <Text style={styles.year}>2023</Text>
                </View>

                <View style={styles.vhaCard}>
                  <Text style={styles.tokenText}>VHA Token</Text>
                </View>
              </LinearGradient>
            </View>

            <View
              style={styles.buttonView}>
              <CustomGButton tittle="Connect Wallet" />
              <TouchableOpacity style={{padding:5,margin:5}}>
                <Text  style={styles.walletTxt}>Continue Without Wallet</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

export default TokenOffer;
const styles = StyleSheet.create({
  buttonView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
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
  },
  wrapper: {
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  shadowCard: {
    transform: [{translateX: 25}, {translateY: -10}, {rotate: '6deg'}],
    position: 'absolute',
    top: 10,
    left: 10,
    width: 300,
    height: 160,
    borderRadius: 20,
    borderColor: COLORS.black,
    borderWidth:1
    // zIndex: -1,
  },
  card: {
    width: 300,
    height: 160,
    borderRadius: 20,
    justifyContent: 'space-between',
    borderColor: COLORS.white,
    borderWidth: 0.9,
    paddingTop: responsiveWidth(5),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5),
    zIndex:1
  },
  securedBy: {
    fontSize: 10,
    fontFamily: FONTS.inter['regular[400]'],
    color: COLORS.white,

  },
  securityName: {
    fontSize: 14,
     color: COLORS.white,
    fontFamily: FONTS.inter['bold[700]'],
  },
  middleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(5),
  },
  stars: {
    fontSize: 24,
    color: '#fff',
    letterSpacing: 8,
    fontFamily : FONTS.spaceGrotesk.medium,
  },
  year: {
    fontSize: 20,
    color: '#fff',
    fontFamily : FONTS.spaceGrotesk.medium,
  },
  tokenText: {
    color: '#fff',
    fontSize: 14,
     fontFamily : FONTS.spaceGrotesk.medium,
  },
  vhaCard: {
    backgroundColor: COLORS.black,
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveWidth(2),
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    borderBottomColor: COLORS.white,
    borderBottomWidth: 0.9,
  },
  walletTxt:{
     color: COLORS.white,
     fontFamily: FONTS.inter['regular[400]'],
     fontSize:14
  }
});

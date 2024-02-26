import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import CustomStatusBar from '../../Components/common/CustomStatusBar';
import { HomeScreenPng } from '../../assets/assets';
import Header from '../../Components/common/Header';
import CustomHeader from '../../Components/common/CustomHeader';
import { responsiveHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { COLORS } from '../../global/theme';

interface TokenOfferProps { }

interface TokenOfferState { }

class TokenOffer extends React.Component<TokenOfferProps, TokenOfferState> {
  constructor(props: TokenOfferProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ImageBackground source={HomeScreenPng} style={styles.image}>
        <CustomStatusBar
        />
        <CustomHeader heading='' isIcon />
        
      </ImageBackground>
    );
  }
}

export default TokenOffer;
const styles = StyleSheet.create({
  image: {
    alignItems: 'center',
    resizeMode: 'cover',
    paddingVertical: responsiveHeight(3),
    position: 'relative',
    paddingHorizontal: responsiveScreenWidth(5),
    flex: 1,
    backgroundColor: COLORS.black
  },
})
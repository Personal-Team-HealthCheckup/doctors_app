import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { HomeScreenPng } from '../../assets/assets';
import CustomStatusBar from '../../Components/common/CustomStatusBar';
import CustomHeader from '../../Components/common/CustomHeader';
import {
  responsiveHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import { COLORS } from '../../global/theme';
import { Navigation } from '../../global/types';

interface CartPageProps {
  navigation?: Navigation;
}

interface CartPageState {}

class CartPage extends React.Component<CartPageProps, CartPageState> {
  constructor(props: CartPageProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ImageBackground source={HomeScreenPng} style={styles.image}>
        <CustomStatusBar />
        <CustomHeader
          heading="Cart"
          isIcon
          navigation={this.props.navigation}
        />
      </ImageBackground>
    );
  }
}

export default CartPage;
const styles = StyleSheet.create({
  image: {
    alignItems: 'center',
    resizeMode: 'cover',
    paddingVertical: responsiveHeight(3),
    position: 'relative',
    paddingHorizontal: responsiveScreenWidth(5),
    flex: 1,
    backgroundColor: COLORS.black,
  },
});

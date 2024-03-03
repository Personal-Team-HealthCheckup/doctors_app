import React, {Component} from 'react';
import {View, Animated, Easing, StyleSheet} from 'react-native';
import {LoaderImg} from '../assets/assets';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {COLORS} from '../global/theme';
class CustomLoader extends Component<{}, {}> {
  rotation: any;
  rotate: any;
  constructor(props: {}) {
    super(props);
    this.rotation = new Animated.Value(0);
    this.rotate = Animated.loop(
      Animated.timing(this.rotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
  }

  componentDidMount() {
    this.rotate.start();
  }

  render() {
    const spin = this.rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <View style={styles.loadImg}>
        <Animated.Image
          source={LoaderImg} // Replace with the actual image path
          style={[styles.image, {transform: [{rotate: spin}]}]}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  image: {
    width: responsiveWidth(10),
    height: responsiveHeight(10),
    resizeMode: 'contain',
  },
  loadImg: {
    flex: 1,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CustomLoader;

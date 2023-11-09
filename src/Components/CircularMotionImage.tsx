import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withDelay,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';
import {imageProfile1} from '../assets/assets';
import {responsiveWidth} from 'react-native-responsive-dimensions';
export default function CircularMotionImage() {
  const ring = useSharedValue(0);
  const style = useAnimatedStyle(() => {
    return {
      opacity: 0.8 - ring.value,
      transform: [
        {
          scale: interpolate(ring.value, [0, 1], [1, 4]),
        },
      ],
    };
  });
  useEffect(() => {
    ring.value = withDelay(
      1000,
      withRepeat(
        withTiming(1, {
          duration: 4000,
        }),
        -1,
        false,
      ),
    );
  }, [ring]);
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Animated.View style={[styles.ring, style]}></Animated.View>
      <Image
        source={imageProfile1}
        style={{
          height: responsiveWidth(20),
          width: responsiveWidth(20),
          borderRadius: responsiveWidth(10),
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  ring: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    borderColor: 'yellow',
    borderWidth: 10,
  },
});

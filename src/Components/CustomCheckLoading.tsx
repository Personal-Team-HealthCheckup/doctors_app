import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withDelay,
} from 'react-native-reanimated';
import {COLORS} from '../global/theme';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const RightCheckArrow = () => {
  const offsetX = useSharedValue(0);
  const gestureHandler = Animated.event(
    // @ts-ignore
    [{nativeEvent: {translationX: offsetX}}],
    {useNativeDriver: false},
  );

  const releaseHandler = () => {
    if (offsetX.value > 80) {
      offsetX.value = withDelay(
        200,
        withSpring(100, {
          stiffness: 200,
          damping: 20,
          restSpeedThreshold: 0.01,
        }),
      );
    } else {
      offsetX.value = withSpring(0);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offsetX.value}],
    };
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler
        onGestureEvent={gestureHandler}
        onHandlerStateChange={releaseHandler}>
        <Animated.View style={[styles.arrow, animatedStyle]}>
          <FontAwesomeIcon name="star" color={COLORS.yellow} size={18} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    width: 50,
    height: 50,
    backgroundColor: 'green', // Replace with your own arrow icon or styling
  },
});

export default RightCheckArrow;

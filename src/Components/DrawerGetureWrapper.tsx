import React from 'react';
import { StyleSheet } from 'react-native';
import { useDrawerProgress } from '@react-navigation/drawer';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface DrawerGetureWrapperProps {
  children: React.ReactNode;
}

const DrawerGetureWrapper: React.FC<DrawerGetureWrapperProps> = ({
  children,
}) => {
  const progress = useDrawerProgress();

  const animatedStyles = useAnimatedStyle(() => {
    const value = progress?.value ?? 0;
    return {
      transform: [
        {
          scale: interpolate(value, [0, 1], [1, 0.8], 'clamp'),
        },
      ],
      borderRadius: interpolate(value, [0, 1], [0, 26], 'clamp'),
      overflow: 'hidden',
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      {children}
    </Animated.View>
  );
};

export default DrawerGetureWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {COLORS} from '../../global/theme';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const CustomFooter: React.FC<BottomTabBarProps> = ({
  descriptors,
  navigation,
  state,
}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.button}>
            {/* <Text style={[styles.label, isFocused && styles.activeLabel]}>
              {label}
            </Text> */}
            {options?.tabBarIcon()}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomFooter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.gereyBack,
    height: responsiveHeight(8),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: responsiveWidth(100),
    borderColor: 'red',
    borderWidth: 1,
  },
  label: {
    color: '#222',
  },
  activeLabel: {
    color: '#673ab7',
  },
  button: {flex: 1},
});

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useCallback} from 'react';
import HomeScreen from '../screen/home/HomeScreen';
import {HOME} from '../Constants/Navigator';
import DoctorNearYou from '../screen/home/DoctorNearYou';
import {Image, ImageSourcePropType, StyleSheet} from 'react-native';
import {COLORS} from '../global/colors';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  MapIcon,
  cartIcon,
  homeIcon,
  offerIcon,
  profileIcon,
} from '../assets/assets';
import ProfilePage from '../screen/home/ProfilePage';
import TokenOffer from '../screen/home/TokenOffer';
import CartPage from '../screen/home/Cartpage';
const BottomTab = createBottomTabNavigator();

const BottomTabStackNavigator = () => {
  const callback = ({
    color,
    image = homeIcon,
  }: {
    color?: string;
    size?: number;
    IconType?: any;
    image?: string;
  }) => {
    return (
      <Image
        source={image as ImageSourcePropType}
        tintColor={color}
        style={styles.icon}
      />
    );
  };
  const BottomTabIcon = useCallback(callback, []);

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.container,
        tabBarActiveTintColor: COLORS.blueish,
        tabBarInactiveTintColor: COLORS.grey,
        tabBarIconStyle: styles.tabBarIconStyle,
      }}
      initialRouteName={HOME.DOCTORNEARYOU}>
      <BottomTab.Screen
        name={HOME.HOME}
        component={HomeScreen}
        options={{
          tabBarLabel: HOME.HOME,
          tabBarIcon: BottomTabIcon,
        }}
      />
      <BottomTab.Screen
        name={HOME.OFFERPAGE}
        component={TokenOffer}
        options={{
          tabBarLabel: HOME.OFFERPAGE,
          tabBarIcon: ({color, size}) =>
            BottomTabIcon({
              color,
              size,
              image: offerIcon,
            }),
        }}
      />
      <BottomTab.Screen
        name={HOME.DOCTORNEARYOU}
        component={DoctorNearYou}
        options={{
          tabBarLabel: HOME.DOCTORNEARYOU,
          tabBarIcon: ({color, size}) =>
            BottomTabIcon({
              color,
              size,
              image: MapIcon,
            }),
        }}
      />

      <BottomTab.Screen
        name={HOME.CARTPAGE}
        component={CartPage}
        options={{
          tabBarLabel: HOME.CARTPAGE,
          tabBarIcon: ({color, size}) =>
            BottomTabIcon({
              color,
              size,
              image: cartIcon,
            }),
        }}
      />
      <BottomTab.Screen
        name={HOME.PROFILEPAGE}
        component={ProfilePage}
        options={{
          tabBarLabel: HOME.PROFILEPAGE,
          tabBarIcon: ({color, size}) =>
            BottomTabIcon({
              color,
              size,
              image: profileIcon,
            }),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabStackNavigator;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.gereyBack,
    alignItems: 'center',
    height: responsiveHeight(10),
  },
  tabBarIconStyle: {},
  icon: {
    width: responsiveWidth(7),
    height: responsiveWidth(7),
    resizeMode: 'contain',
  },
});

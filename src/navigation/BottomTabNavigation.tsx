import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useCallback } from 'react';
import HomeScreen from '../screen/home/HomeScreen';
import { DASHBOARD, HOME } from '../Constants/Navigator';
import DoctorNearYou from '../screen/home/DoctorNearYou';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
} from 'react-native';
import { COLORS } from '../global/theme';
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
import LinearGradient from 'react-native-linear-gradient';
import AppointPage from '../screen/home/Appointment';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchPage from '../screen/home/SearchPage';
const BottomTab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name={DASHBOARD.SEARCHPAGE} component={SearchPage} />
    </HomeStack.Navigator>
  );
};
const BottomTabStackNavigator = () => {
  const callback = ({
    color,
    image = homeIcon,
    focused,
  }: {
    color?: string;
    size?: number;
    IconType?: StyleProp<ImageStyle>;
    image?: string;
    focused?: boolean;
  }) => {
    return (
      <>
        {focused && (
          <LinearGradient
            colors={[
              'rgba(0, 133, 133, 0.00)',
              '#0FF',
              'rgba(0, 133, 133, 0.00)',
            ]}
            style={styles.gradient}
            start={{ x: 1, y: 1 }}
            end={{ x: 0.1, y: 1 }}
          />
        )}
        <Image
          source={image as ImageSourcePropType}
          tintColor={color}
          style={styles.icon}
        />
      </>
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
        tabBarHideOnKeyboard: true,
      }}
    >
      <BottomTab.Screen
        name={HOME.HOME}
        component={HomeNavigation}
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
          tabBarIcon: ({ color, size, focused }) =>
            BottomTabIcon({
              color,
              size,
              image: offerIcon,
              focused,
            }),
        }}
      />
      <BottomTab.Screen
        name={HOME.DOCTORNEARYOU}
        component={DoctorNearYou}
        options={{
          tabBarLabel: HOME.DOCTORNEARYOU,
          tabBarIcon: ({ color, size, focused }) =>
            BottomTabIcon({
              color,
              size,
              image: MapIcon,
              focused,
            }),
        }}
      />

      <BottomTab.Screen
        name={HOME.APPOINTMENTPAGE}
        component={AppointPage}
        options={{
          tabBarLabel: HOME.APPOINTMENTPAGE,
          tabBarIcon: ({ color, size, focused }) =>
            BottomTabIcon({
              color,
              size,
              image: cartIcon,
              focused,
            }),
        }}
      />
      <BottomTab.Screen
        name={HOME.PROFILEPAGE}
        component={ProfilePage}
        options={{
          tabBarLabel: HOME.PROFILEPAGE,
          tabBarIcon: ({ color, size, focused }) =>
            BottomTabIcon({
              color,
              size,
              image: profileIcon,
              focused,
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
    marginVertical: responsiveHeight(1),
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: responsiveHeight(0.3),
    position: 'absolute',
    alignSelf: 'center',
    top: responsiveHeight(-0.5),
  },
});

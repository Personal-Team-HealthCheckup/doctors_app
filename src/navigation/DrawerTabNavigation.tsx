import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabStackNavigator from './BottomTabNavigation';
import { HOME } from '../Constants/Navigator';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import AppointPage from '../screen/home/Appointment';
import DrawerComponent from '../Components/DrawerComponent';

const DrawerTab = createDrawerNavigator();

function DrawerTabNavigation() {
  return (
    <DrawerTab.Navigator
      drawerContent={props => <DrawerComponent {...props} />}
      screenOptions={{
        drawerType: 'slide',
        headerShown: false,
        drawerActiveBackgroundColor: '#000000',
        drawerInactiveBackgroundColor: '#000000',
        overlayColor: 'transparent',
        drawerStyle: {
          width: responsiveWidth(72),
          paddingHorizontal: responsiveWidth(2),
          backgroundColor: '#000000',
          // paddingVertical: responsiveWidth(5),
        },
        swipeEdgeWidth: responsiveWidth(16),
        swipeEnabled: true,
        drawerContentStyle: {
          marginTop: responsiveWidth(10),
          paddingHorizontal: responsiveWidth(2),
          backgroundColor: 'red',
        },
        drawerPosition: 'left',
        drawerStatusBarAnimation: 'slide',
        swipeMinDistance: responsiveWidth(10),
        // configureGestureHandler: true,
        drawerAllowFontScaling: true,
        lazy: true,
        drawerHideStatusBarOnOpen: true,
      }}
    >
      <DrawerTab.Screen
        name={HOME.BOTTOMTABS}
        component={BottomTabStackNavigator}
      />
      <DrawerTab.Screen name={HOME.APPOINTMENTPAGE} component={AppointPage} />
    </DrawerTab.Navigator>
  );
}

export default DrawerTabNavigation;

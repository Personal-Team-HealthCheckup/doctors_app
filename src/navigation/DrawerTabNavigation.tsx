import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import BottomTabStackNavigator from './BottomTabNavigation';
import { HOME } from '../Constants/Navigator';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import AppointPage from '../screen/home/Appointment';
import DrawerComponent from '../Components/DrawerComponent';
import { COLORS } from '../global/theme';
import DrawerGestureWrapper from '../Components/DrawerGetureWrapper';
const DrawerTab = createDrawerNavigator();

const DrawerTabScreen = (props: {}) => (
  <DrawerGestureWrapper>
    <BottomTabStackNavigator {...props} />
  </DrawerGestureWrapper>
);

const DrawerContent = (props: DrawerContentComponentProps) => (
  <DrawerComponent {...props} />
);

function DrawerTabNavigation() {
  return (
    <DrawerTab.Navigator
      drawerContent={DrawerContent}
      screenOptions={{
        drawerType: 'slide',
        headerShown: false,
        drawerActiveBackgroundColor: COLORS.black,
        drawerInactiveBackgroundColor: COLORS.black,
        overlayColor: 'transparent',
        drawerStyle: {
          width: responsiveWidth(52),
          backgroundColor: COLORS.black,
        },
        sceneStyle: { backgroundColor: COLORS.black },
      }}
    >
      <DrawerTab.Screen name={HOME.BOTTOMTABS} component={DrawerTabScreen} />
      <DrawerTab.Screen name={HOME.APPOINTMENTPAGE} component={AppointPage} />
    </DrawerTab.Navigator>
  );
}

export default DrawerTabNavigation;

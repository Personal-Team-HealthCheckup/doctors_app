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
import HelpCenter from '../screen/home/HelpCenter';
import MedicalRecordPage from '../screen/home/MedicalRecordPage';
import AllDoctors from '../screen/home/AllDoctors';
import SettingsPage from '../screen/home/SettingsPage';
import TestBooking from '../screen/home/TestBooking';
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
      <DrawerTab.Screen name={HOME.HELPCENTER} component={HelpCenter} />
      <DrawerTab.Screen name={HOME.DOCTORS} component={AllDoctors} />
      <DrawerTab.Screen
        name={HOME.MEDICALRECORDS}
        component={MedicalRecordPage}
      />
      <DrawerTab.Screen name={HOME.SETTINGS} component={SettingsPage} />
      <DrawerTab.Screen name={HOME.TESTBOOKING} component={TestBooking} />
    </DrawerTab.Navigator>
  );
}

export default DrawerTabNavigation;

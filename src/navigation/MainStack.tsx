import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from '../screen/auth/Signup';
import Signin from '../screen/auth/Signin';
import ForgotPassword from '../screen/auth/ForgotPassword';
import SplashScreens from '../screen/Splashscreen';
import { AUTH, DASHBOARD, HOME, MAINSTACK } from '../Constants/Navigator';
import OnBoarding from '../screen/auth/OnBoarding';
import DrawerTabNavigation from './DrawerTabNavigation';
import SearchPage from '../screen/home/SearchPage';
import SelectTimePage from '../screen/home/SelectTimePage';

import AllDoctors from '../screen/home/AllDoctors';
import DoctorDetailsPage from '../screen/home/DoctorDetailsScreen';
import VerificationCode from '../screen/auth/VerificationCode';

const MainStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={AUTH.ONBOARDING}
    >
      <AuthStack.Screen name={AUTH.SIGNUP} component={Signup} />
      <AuthStack.Screen name={AUTH.VERIFICATION} component={VerificationCode} />
      <AuthStack.Screen name={AUTH.SIGNIN} component={Signin} />
      <AuthStack.Screen name={AUTH.FORGOTPASSWORD} component={ForgotPassword} />
      <AuthStack.Screen name={AUTH.ONBOARDING} component={OnBoarding} />
    </AuthStack.Navigator>
  );
};

const HomeNavigation = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name={HOME.DASHBOARD} component={DrawerTabNavigation} />
      <HomeStack.Screen name={DASHBOARD.SEARCHPAGE} component={SearchPage} />
      <HomeStack.Screen name={DASHBOARD.DOCTORS} component={AllDoctors} />
      <HomeStack.Screen
        name={DASHBOARD.DOCTORDETAILS}
        component={DoctorDetailsPage}
      />
      <HomeStack.Screen
        name={DASHBOARD.SELECTTIME}
        component={SelectTimePage}
      />
    </HomeStack.Navigator>
  );
};

const MainNavigation = () => {
  return (
    <MainStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={MAINSTACK.SPLASHSCREEN}
    >
      <MainStack.Screen
        name={MAINSTACK.SPLASHSCREEN}
        component={SplashScreens}
      />
      <MainStack.Screen
        name={MAINSTACK.AUTHNAVIGATION}
        component={AuthNavigation}
      />
      <MainStack.Screen
        name={MAINSTACK.HOMENAVIGATION}
        component={HomeNavigation}
      />
      {/* <MainStack.Screen
        name={MAINSTACK.DUMMYStack}
        component={JoinChannelVideo}
      /> */}
    </MainStack.Navigator>
  );
};
export default MainNavigation;

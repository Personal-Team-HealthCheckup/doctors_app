import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from '../screen/auth/Signup';
import Signin from '../screen/auth/Signin';
import SplashScreens from '../screen/Splashscreen';
import {
  AUTH,
  DASHBOARD,
  HOME,
  LANDING,
  MAINSTACK,
} from '../Constants/Navigator';
import OnBoarding from '../screen/auth/OnBoarding';
import DrawerTabNavigation from './DrawerTabNavigation';
import SearchPage from '../screen/home/SearchPage';
import SelectTimePage from '../screen/home/SelectTimePage';

const MainStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name={AUTH.SIGNUP} component={Signup} />
      <AuthStack.Screen name={AUTH.SIGNIN} component={Signin} />
      <AuthStack.Screen name={AUTH.ONBOARDING} component={OnBoarding} />
    </AuthStack.Navigator>
  );
};

const HomeNavigation = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name={HOME.DASHBOARD} component={DrawerTabNavigation} />
      <HomeStack.Screen name={DASHBOARD.SEARCHPAGE} component={SearchPage} />
      <HomeStack.Screen
        name={DASHBOARD.SELECTTIME}
        component={SelectTimePage}
      />
    </HomeStack.Navigator>
  );
};

const MainNavigation = () => {
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen name={LANDING.SPLASHSCREEN} component={SplashScreens} />
      <MainStack.Screen
        name={MAINSTACK.HOMENAVIGATION}
        component={HomeNavigation}
      />
      <MainStack.Screen
        name={MAINSTACK.AUTHNAVIGATION}
        component={AuthNavigation}
      />
    </MainStack.Navigator>
  );
};
export default MainNavigation;

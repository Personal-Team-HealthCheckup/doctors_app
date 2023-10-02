import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from '../screen/auth/Signup';
import Signin from '../screen/auth/Signin';
import SplashScreens from '../screen/Splashscreen';
import {AUTH, HOME, LANDING} from '../Constants/Navigator';
import OnBoarding from '../screen/auth/OnBoarding';
import DrawerTabNavigation from './DrawerTabNavigation';
// import { RootState } from '../redux/store';

const Stack = createNativeStackNavigator();
// const MainNavigation = () => {
//   return (
//     <Stack.Navigator screenOptions={{headerShown: false}}>
//       <Stack.Screen name={LANDING.SPLASHSCREEN} component={SplashScreens} />
//       <Stack.Screen name={HOME.DASHBOARD} component={DrawerTabNavigation} />
//     </Stack.Navigator>
//   );
// };

const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={LANDING.SPLASHSCREEN} component={SplashScreens} />
      <Stack.Screen name={AUTH.SIGNUP} component={Signup} />
      <Stack.Screen name={AUTH.SIGNIN} component={Signin} />
      <Stack.Screen name={AUTH.ONBOARDING} component={OnBoarding} />
      <Stack.Screen name={HOME.DASHBOARD} component={DrawerTabNavigation} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

// const AppNavigation = () => {
//   const {token, userRole} = useSelector((state: RootState) => state.Auth);
//   return token ? <MainNavigation userRole={userRole} /> : <AuthNavigation />;
// };

// export default AppNavigation;

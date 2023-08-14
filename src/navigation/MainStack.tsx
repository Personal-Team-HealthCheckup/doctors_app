import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from '../screen/auth/Signup';
import Signin from '../screen/auth/Signin';
import SplashScreens from '../screen/Splashscreen';
import {AUTH} from '../Constants/Navigator';

const Stack = createNativeStackNavigator();
const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="SplashScreen">
      <Stack.Screen name="SplashScreen" component={SplashScreens} />
      <Stack.Screen name={AUTH.SIGNUP} component={Signup} />
      <Stack.Screen name={AUTH.SIGNIN} component={Signin} />
    </Stack.Navigator>
  );
};

export default MainStack;

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from '../screen/auth/Signup';

const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeStack;

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeIcon from 'react-native-vector-icons/MaterialIcons';
import FeathgerIcons from 'react-native-vector-icons/Feather';
import HomeScreen from '../screen/home/HomeScreen';
import {HOME} from '../Constants/Navigator';
import DoctorNearYou from '../screen/home/DoctorNearYou';
const BottomTab = createBottomTabNavigator();

const BottomTabStackNavigator = () => {
  return (
    <BottomTab.Navigator screenOptions={{headerShown: false}}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <HomeIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name={HOME.DOCTORNEARYOU}
        component={DoctorNearYou}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size}) => (
            <FeathgerIcons name="settings" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabStackNavigator;

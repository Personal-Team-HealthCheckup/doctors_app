import {
  // BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeIcon from 'react-native-vector-icons/MaterialIcons';
import FeathgerIcons from 'react-native-vector-icons/Feather';
import HomeScreen from '../screen/home/HomeScreen';
import {HOME} from '../Constants/Navigator';
import DoctorNearYou from '../screen/home/DoctorNearYou';
// import CustomFooter from '../Components/CustomFooter';
const BottomTab = createBottomTabNavigator();

const BottomTabStackNavigator = () => {
  // const IconComponent = React.useCallback(
  //   (props: BottomTabBarProps) => <CustomFooter {...props} />,
  //   [],
  // );
  return (
    <BottomTab.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={HOME.DOCTORNEARYOU}>
      <BottomTab.Screen
        name={HOME.HOME}
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

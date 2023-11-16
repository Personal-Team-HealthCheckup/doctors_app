import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import BottomTabStackNavigator from './BottomTabNavigation';
import {HOME} from '../Constants/Navigator';
import CartPage from '../screen/home/Cartpage';
import {View} from 'react-native';
import {Text} from 'react-native-svg';
import React from 'react';

const DrawerTab = createDrawerNavigator();
function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <View>
      <Text>{JSON.stringify(props)}</Text>
    </View>
  );
}
function DrawerTabNavigation() {
  return (
    <DrawerTab.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{drawerType: 'slide', headerShown: false}}>
      <DrawerTab.Screen
        name={HOME.BOTTOMTABS}
        component={BottomTabStackNavigator}
      />
      <DrawerTab.Screen name={HOME.CARTPAGE} component={CartPage} />
    </DrawerTab.Navigator>
  );
}

export default DrawerTabNavigation;

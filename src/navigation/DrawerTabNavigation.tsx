import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTabStackNavigator from './BottomTabNavigation';
import {HOME} from '../Constants/Navigator';
import CartPage from '../screen/home/Cartpage';

const DrawerTab = createDrawerNavigator();

function DrawerTabNavigation() {
  return (
    <DrawerTab.Navigator screenOptions={{drawerType: 'slide', headerShown: false}}>
      <DrawerTab.Screen
        name={HOME.BOTTOMTABS}
        component={BottomTabStackNavigator}
      />
      <DrawerTab.Screen name={HOME.CARTPAGE} component={CartPage} />
    </DrawerTab.Navigator>
  );
}

export default DrawerTabNavigation;

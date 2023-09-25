import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTabStackNavigator from './BottomTabNavigation';
import {HOME} from '../Constants/Navigator';
import CartPage from '../screen/home/Cartpage';

const Drawer = createDrawerNavigator();

function DrawerTabNavigation() {
  return (
    <Drawer.Navigator screenOptions={{drawerType: 'slide', headerShown: false}}>
      <Drawer.Screen
        name={HOME.BOTTOMTABS}
        component={BottomTabStackNavigator}
      />
      <Drawer.Screen name={HOME.CARTPAGE} component={CartPage} />
    </Drawer.Navigator>
  );
}

export default DrawerTabNavigation;

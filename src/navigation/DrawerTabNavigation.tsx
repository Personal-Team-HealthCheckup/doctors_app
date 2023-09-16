import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTabStackNavigator from './BottomTabNavigation';
import {HOME} from '../Constants/Navigator';

const Drawer = createDrawerNavigator();

function DrawerTabNavigation() {
  return (
    <Drawer.Navigator screenOptions={{drawerType: 'slide', headerShown: false}}>
      <Drawer.Screen
        name={HOME.BOTTOMTABS}
        component={BottomTabStackNavigator}
      />
    </Drawer.Navigator>
  );
}

export default DrawerTabNavigation;

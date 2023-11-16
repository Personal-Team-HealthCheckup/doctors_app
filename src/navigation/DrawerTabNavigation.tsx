import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import BottomTabStackNavigator from './BottomTabNavigation';
import {HOME} from '../Constants/Navigator';
import CartPage from '../screen/home/Cartpage';
import {View, SafeAreaView, Text, FlatList} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome6';
interface DrawerData {
  id: number;
  title: string;
  link: string;
  Icon: React.JSX.Element;
}
const drawerData: DrawerData[] = [
  {
    id: 1,
    title: 'My Doctors',
    link: '',
    Icon: <FontAwesome5Icon name="user" size={responsiveWidth(18)} />,
  },
  {
    id: 2,
    title: 'Medical Records',
    link: '',
    Icon: <FontAwesome5Icon name="user" size={responsiveWidth(18)} />,
  },
  {
    id: 3,
    title: 'Payments',
    link: '',
    Icon: <FontAwesome5Icon name="user" size={responsiveWidth(18)} />,
  },
  {
    id: 4,
    title: 'Medicine Orders',
    link: '',
    Icon: <FontAwesome5Icon name="user" size={responsiveWidth(18)} />,
  },
  {
    id: 5,
    title: 'Test Bookings',
    link: '',
    Icon: <FontAwesome5Icon name="user" size={responsiveWidth(18)} />,
  },
  {
    id: 6,
    title: 'Favorite Doctors',
    link: '',
    Icon: <FontAwesome5Icon name="user" size={responsiveWidth(18)} />,
  },
  {
    id: 7,
    title: 'Help Center',
    link: '',
    Icon: <FontAwesome5Icon name="user" size={responsiveWidth(18)} />,
  },
  {
    id: 8,
    title: 'Settings',
    link: '',
    Icon: <FontAwesome5Icon name="user" size={responsiveWidth(18)} />,
  },
];
const DrawerTab = createDrawerNavigator();
function CustomDrawerContent(props: DrawerContentComponentProps) {
  const _renderDrawerContent = ({item}: {item: DrawerData}) => {
    return <Text style={{color: '#fff'}}>{item.title}</Text>;
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{padding: responsiveHeight(2)}}>
        <FlatList
          data={drawerData}
          renderItem={item => _renderDrawerContent(item)}
        />
      </View>
    </SafeAreaView>
  );
}
function DrawerTabNavigation() {
  return (
    <DrawerTab.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: 'slide',
        headerShown: false,
        drawerActiveBackgroundColor: '#000000',
        drawerInactiveBackgroundColor: '#000000',
        overlayColor: 'transparent',
        drawerStyle: {
          width: responsiveWidth(52),
          paddingHorizontal: responsiveWidth(2),
          backgroundColor: '#000000',
        },
      }}>
      <DrawerTab.Screen
        name={HOME.BOTTOMTABS}
        component={BottomTabStackNavigator}
      />
      <DrawerTab.Screen name={HOME.CARTPAGE} component={CartPage} />
    </DrawerTab.Navigator>
  );
}

export default DrawerTabNavigation;

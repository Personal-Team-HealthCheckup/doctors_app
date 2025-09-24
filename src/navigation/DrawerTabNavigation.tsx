import React from 'react';
import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import BottomTabStackNavigator from './BottomTabNavigation';
import { HOME } from '../Constants/Navigator';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import FontAwesome5Icon from 'react-native-vector-icons/AntDesign';
import { Image } from 'react-native';
import AppointPage from '../screen/home/Appointment';
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
    Icon: <FontAwesome5Icon name="user" size={responsiveWidth(10)} />,
  },
  {
    id: 2,
    title: 'Medical Records',
    link: '',
    Icon: <FontAwesome5Icon name="user" size={responsiveWidth(10)} />,
  },
  {
    id: 3,
    title: 'Payments',
    link: '',
    Icon: <FontAwesome5Icon name="user" size={responsiveWidth(10)} />,
  },
  {
    id: 4,
    title: 'Medicine Orders',
    link: '',
    Icon: <FontAwesome5Icon name="user" size={responsiveWidth(10)} />,
  },
  {
    id: 5,
    title: 'Test Bookings',
    link: '',
    Icon: <FontAwesome5Icon name="user" size={responsiveWidth(10)} />,
  },
  {
    id: 6,
    title: 'Favorite Doctors',
    link: '',
    Icon: <FontAwesome5Icon name="user" size={responsiveWidth(10)} />,
  },
  {
    id: 7,
    title: 'Help Center',
    link: '',
    Icon: <FontAwesome5Icon name="user" size={responsiveWidth(10)} />,
  },
  {
    id: 8,
    title: 'Settings',
    link: '',
    Icon: <FontAwesome5Icon name="user" size={responsiveWidth(10)} />,
  },
];
const DrawerTab = createDrawerNavigator();
const CustomDrawerContent: React.FC<{}> = () => {
  const _renderDrawerContent = ({ item }: { item: any }) => {
    const { Icon } = item;
    return (
      <TouchableOpacity style={styles.drawerItem} activeOpacity={0.7}>
        <View style={styles.row}>
          {Icon}
          <Text style={styles.drawerLabel}>{item.title}</Text>
        </View>
        <FontAwesome5Icon name="chevron-right" size={22} color="#fff" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150' }} // Replace with actual image
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>Olivia Doe</Text>
          <Text style={styles.phone}>📞 01303-527300</Text>
        </View>
        <TouchableOpacity style={styles.closeButton}>
          <FontAwesome5Icon name="close" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Drawer List */}
      <FlatList
        data={drawerData}
        keyExtractor={item => item.id.toString()}
        renderItem={_renderDrawerContent}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />

      {/* Separator */}
      <View style={styles.separator} />

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7}>
        <FontAwesome5Icon
          name="logout"
          size={responsiveWidth(6)}
          color="#FF6B6B"
        />
        <Text
          style={[styles.drawerLabel, { marginLeft: 10, color: '#FF6B6B' }]}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

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
      }}
    >
      <DrawerTab.Screen
        name={HOME.BOTTOMTABS}
        component={BottomTabStackNavigator}
      />
      <DrawerTab.Screen name={HOME.APPOINTMENTPAGE} component={AppointPage} />
    </DrawerTab.Navigator>
  );
}

export default DrawerTabNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001524', // dark gradient base
    paddingTop: responsiveHeight(4),
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#003f5c', // gradient-like color
    paddingVertical: 15,
    borderRadius: 10,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  name: {
    color: '#fff',
    fontSize: responsiveFontSize(2.4),
    fontWeight: 'bold',
  },
  phone: {
    color: '#ccc',
    fontSize: responsiveFontSize(1.8),
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    padding: 5,
  },
  drawerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerLabel: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    marginLeft: 15,
  },
  separator: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  logoutButton: {
    marginTop: 'auto',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#002a3b',
    borderRadius: 10,
  },
});

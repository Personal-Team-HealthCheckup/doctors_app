import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import { DrawerNavigationState, ParamListBase } from '@react-navigation/native';
import { imageProfile2 } from '../assets/assets';
import { Navigation } from '../global/types';

interface DrawerComponentProps {
  state: DrawerNavigationState<ParamListBase>;
  navigation?: Navigation;
}

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
    Icon: <AntDesign name="user" size={22} color="#fff" />,
  },
  {
    id: 2,
    title: 'Medical Records',
    link: '',
    Icon: <AntDesign name="folder1" size={22} color="#fff" />,
  },
  {
    id: 3,
    title: 'Payments',
    link: '',
    Icon: <AntDesign name="creditcard" size={22} color="#fff" />,
  },
  {
    id: 4,
    title: 'Medicine Orders',
    link: '',
    Icon: <AntDesign name="medicinebox" size={22} color="#fff" />,
  },
  {
    id: 5,
    title: 'Test Bookings',
    link: '',
    Icon: <AntDesign name="calendar" size={22} color="#fff" />,
  },
  {
    id: 6,
    title: 'Favorite Doctors',
    link: '',
    Icon: <AntDesign name="hearto" size={22} color="#fff" />,
  },
  {
    id: 7,
    title: 'Help Center',
    link: '',
    Icon: <AntDesign name="questioncircleo" size={22} color="#fff" />,
  },
  {
    id: 8,
    title: 'Settings',
    link: '',
    Icon: <AntDesign name="setting" size={22} color="#fff" />,
  },
];

const DrawerComponent: React.FC<DrawerComponentProps> = () => {
  const _renderDrawerContent = ({ item }: { item: any }) => {
    const { Icon } = item;
    return (
      <TouchableOpacity style={styles.drawerItem} activeOpacity={0.7}>
        <View style={styles.row}>
          {Icon}
          <Text style={styles.drawerLabel}>{item.title}</Text>
        </View>
        <FontAwesomeIcon name="chevron-right" size={18} color="#fff" />
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient colors={['#001524', '#0A192F']} style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={imageProfile2} style={styles.avatar} />
        <View>
          <Text style={styles.name}>Olivia Doe</Text>
          <Text style={styles.phone}>01303-527300</Text>
        </View>

        <TouchableOpacity style={styles.closeButton}>
          <AntDesign name="close" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Drawer List */}
      <FlatList
        data={drawerData}
        keyExtractor={item => item.id.toString()}
        renderItem={_renderDrawerContent}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7}>
        <AntDesign name="logout" size={22} color="#FF6B6B" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default DrawerComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: responsiveHeight(6),
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
    position: 'relative',
  },
  avatar: {
    height: 55,
    width: 55,
    borderRadius: 30,
    marginRight: 15,
  },
  name: {
    color: '#fff',
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
  },
  phone: {
    color: '#ccc',
    fontSize: responsiveFontSize(1.8),
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 5,
    backgroundColor: '#FF4D4D',
    borderRadius: 20,
    padding: 6,
  },
  drawerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
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
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginTop: 'auto',
  },
  logoutText: {
    marginLeft: 10,
    color: '#FF6B6B',
    fontSize: responsiveFontSize(2),
  },
});

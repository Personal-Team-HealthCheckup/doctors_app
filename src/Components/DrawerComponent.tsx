import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import {
  CommonActions,
  DrawerNavigationState,
  ParamListBase,
} from '@react-navigation/native';
import { imageProfile2 } from '../assets/assets';
import { Navigation } from '../global/types';
import { useDispatch, useSelector } from 'react-redux';
import { clearStoredAuthToken } from '../helper/authKeychain';
import { actionLogout } from '../redux/reducers/auth';
import { AUTH, MAINSTACK } from '../Constants/Navigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { closeDrawer } from '../helper/utilities';
import { COLORS, FONTS } from '../global/theme';
import { moderateScale } from '../helper/Scale';
import { useDrawerStatus } from '@react-navigation/drawer';
import { RootState } from '../redux/store';

interface DrawerComponentProps {
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
    Icon: <AntDesign name="user" size={20} color="#fff" />,
  },
  {
    id: 2,
    title: 'Medical Records',
    link: '',
    Icon: <AntDesign name="folder1" size={20} color="#fff" />,
  },
  {
    id: 3,
    title: 'Payments',
    link: '',
    Icon: <AntDesign name="creditcard" size={20} color="#fff" />,
  },
  {
    id: 4,
    title: 'Medicine Orders',
    link: '',
    Icon: <AntDesign name="medicinebox" size={20} color="#fff" />,
  },
  {
    id: 5,
    title: 'Test Bookings',
    link: '',
    Icon: <AntDesign name="calendar" size={20} color="#fff" />,
  },
  {
    id: 6,
    title: 'Favorite Doctors',
    link: '',
    Icon: <AntDesign name="hearto" size={20} color="#fff" />,
  },
  {
    id: 7,
    title: 'Help Center',
    link: '',
    Icon: <AntDesign name="questioncircleo" size={20} color="#fff" />,
  },
  {
    id: 8,
    title: 'Settings',
    link: '',
    Icon: <AntDesign name="setting" size={20} color="#fff" />,
  },
];

const DrawerComponent: React.FC<DrawerComponentProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const isOpen = useDrawerStatus() === 'open';
  const { user } = useSelector((state: RootState) => state.Auth);

  const performLogout = React.useCallback(async () => {
    try {
      await clearStoredAuthToken();
    } catch (error) {
      console.warn('Failed to clear auth token on logout', error);
    }

    dispatch(actionLogout());

    const drawerNav = navigation as any;
    drawerNav?.closeDrawer?.();

    const mainNav =
      drawerNav?.getParent?.()?.getParent?.() ?? drawerNav?.getParent?.();

    const resetAction = CommonActions.reset({
      index: 0,
      routes: [
        {
          name: MAINSTACK.AUTHNAVIGATION as never,
          state: {
            routes: [{ name: AUTH.SIGNIN as never }],
          },
        },
      ],
    });

    if (mainNav?.dispatch) {
      mainNav.dispatch(resetAction);
    } else if (drawerNav?.dispatch) {
      drawerNav.dispatch(resetAction);
    } else {
      navigation?.navigate?.(MAINSTACK.AUTHNAVIGATION, {
        screen: AUTH.SIGNIN,
      });
    }
  }, [dispatch, navigation]);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          performLogout();
        },
      },
    ]);
  };

  const _renderDrawerContent = ({ item }: { item: any }) => {
    const { Icon } = item;
    return (
      <TouchableOpacity style={styles.drawerItem} activeOpacity={0.7}>
        <View style={styles.row}>
          {Icon}
          <Text style={styles.drawerLabel}>{item.title}</Text>
        </View>
        <FontAwesomeIcon name="chevron-right" size={20} color="#fff" />
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={[COLORS.black, COLORS.black]}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image source={imageProfile2} style={styles.avatar} />
          <View>
            <Text style={styles.name}>{user?.fullName}</Text>
            <Text style={styles.phone}>{user?.phoneNumber ?? user?.email}</Text>
          </View>

          {isOpen && (
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => closeDrawer(navigation)}
              activeOpacity={0.9}
            >
              <AntDesign name="close" size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        {/* Drawer List */}
        <FlatList
          data={drawerData}
          keyExtractor={item => item.id.toString()}
          renderItem={_renderDrawerContent}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        />
        {/* Logout */}
        <TouchableOpacity
          style={[styles.drawerItem, styles.logoutButton]}
          activeOpacity={0.7}
          onPress={handleLogout}
        >
          <View style={styles.row}>
            <AntDesign name="logout" size={20} color="#fff" />
            <Text style={styles.drawerLabel}>Logout</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default DrawerComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: responsiveHeight(4),
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
    right: -(Dimensions.get('screen').width - 40 - responsiveWidth(52)),
    top: responsiveHeight(2),
    backgroundColor: '#FF4D4D',
    borderRadius: 20,
    padding: 6,
  },
  drawerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  drawerLabel: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontFamily: FONTS.rubik.regular,
    marginLeft: 8,
  },
  logoutButton: {
    marginLeft: 20,
    paddingBottom: responsiveHeight(4),
  },
});

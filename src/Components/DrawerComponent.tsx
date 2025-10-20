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
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerNavigationState, ParamListBase } from '@react-navigation/native';
import { HomeScreenPng2, imageProfile2 } from '../assets/assets';
import { Navigation } from '../global/types';
import CommonGradientText from './CommonGradientText';
import { COLORS } from '../global/theme';

interface DrawerComponentProps {
  state: DrawerNavigationState<ParamListBase>;
  navigation?: Navigation;
}

interface DrawerItem {
  id: number;
  title: string;
  link: string;
  iconName: string;
}

const drawerData: DrawerItem[] = [
  {
    id: 1,
    title: 'My Doctors',
    link: '',
    iconName: 'account-group-outline',
  },
  {
    id: 2,
    title: 'Medical Records',
    link: '',
    iconName: 'file-document-outline',
  },
  {
    id: 3,
    title: 'Payments',
    link: '',
    iconName: 'wallet-outline',
  },
  {
    id: 4,
    title: 'Medicine Orders',
    link: '',
    iconName: 'clipboard-check-outline',
  },
  {
    id: 5,
    title: 'Test Bookings',
    link: '',
    iconName: 'calendar-outline',
  },
  {
    id: 6,
    title: 'Favorite Doctors',
    link: '',
    iconName: 'heart-outline',
  },
  {
    id: 7,
    title: 'Help Center',
    link: '',
    iconName: 'help-circle-outline',
  },
  {
    id: 8,
    title: 'Settings',
    link: '',
    iconName: 'cog-outline',
  },
];

const DrawerComponent: React.FC<DrawerComponentProps> = ({
  navigation,
  state,
}) => {
  const renderDrawerContent = ({
    item,
    index,
  }: {
    item: DrawerItem;
    index: number;
  }) => {
    const isActive = state.index === index;

    return (
      <TouchableOpacity
        style={styles.drawerItem}
        activeOpacity={0.75}
        onPress={() => {
          if (item.link) {
            navigation?.navigate(item.link);
          }
        }}
      >
        <LinearGradient
          colors={
            isActive
              ? ['rgba(27, 46, 72, 0.95)', 'rgba(16, 29, 48, 0.92)']
              : ['rgba(255, 255, 255, 0.06)', 'rgba(255, 255, 255, 0.02)']
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.drawerItemGradient,
            isActive && styles.drawerItemGradientActive,
          ]}
        >
          <View style={styles.row}>
            <View
              style={[
                styles.iconContainer,
                isActive && styles.iconContainerActive,
              ]}
            >
              <MaterialIcon
                name={item.iconName}
                size={22}
                color={COLORS.white}
                style={styles.icon}
              />
            </View>
            <Text
              style={[styles.drawerLabel, isActive && styles.drawerLabelActive]}
            >
              {item.title}
            </Text>
          </View>
          <FontAwesomeIcon
            name="chevron-right"
            size={16}
            color={COLORS.white}
            style={{ opacity: isActive ? 1 : 0.5 }}
          />
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={['#040C1C', '#071B33', '#0A2947']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Image
        source={HomeScreenPng2}
        resizeMode="contain"
        style={styles.previewImage}
        pointerEvents="none"
      />
      <View style={styles.content}>
        <View style={styles.profileSection}>
          <LinearGradient
            colors={[COLORS.blueish, COLORS.lightCyan, COLORS.greeen2]}
            style={styles.avatarBorder}
          >
            <View style={styles.avatarInner}>
              <Image source={imageProfile2} style={styles.avatar} />
            </View>
          </LinearGradient>

          <View style={styles.profileInfo}>
            <CommonGradientText
              colors={[COLORS.white, COLORS.lightCyan]}
              locations={[0, 1]}
              style={styles.name}
            >
              Olivia Doe
            </CommonGradientText>
            <View style={styles.phoneRow}>
              <AntDesign name="phone" size={14} color={COLORS.lightCyan} />
              <Text style={styles.phone}>01303-527300</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation?.closeDrawer()}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#FF5A5A', '#D50000']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.closeButtonGradient}
            >
              <AntDesign name="close" size={18} color={COLORS.white} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionSpacer}>
          <LinearGradient
            colors={[
              'rgba(255,255,255,0.14)',
              'transparent',
              'rgba(255,255,255,0.14)',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.divider}
          />
        </View>

        <FlatList
          data={drawerData}
          keyExtractor={item => item.id.toString()}
          renderItem={renderDrawerContent}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.logoutContainer}>
          <LinearGradient
            colors={[
              'rgba(255,255,255,0.14)',
              'transparent',
              'rgba(255,255,255,0.14)',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.divider, styles.logoutDivider]}
          />
          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.75}
            onPress={() => {
              // TODO: add logout behaviour
              console.log('Logout pressed');
            }}
          >
            <LinearGradient
              colors={['rgba(255,255,255,0.14)', 'rgba(255,255,255,0.05)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoutGradient}
            >
              <View style={styles.logoutIconContainer}>
                <MaterialIcon
                  name="logout-variant"
                  size={22}
                  color={COLORS.white}
                />
              </View>
              <Text style={styles.logoutText}>Logout</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default DrawerComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: responsiveHeight(6),
    paddingHorizontal: responsiveWidth(5),
    paddingBottom: responsiveHeight(3),
  },
  previewImage: {
    position: 'absolute',
    right: -responsiveWidth(12),
    bottom: -responsiveHeight(4),
    width: responsiveWidth(62),
    height: responsiveHeight(62),
    opacity: 0.22,
    transform: [{ rotate: '-10deg' }],
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(2.5),
    paddingRight: responsiveWidth(10),
    position: 'relative',
  },
  avatarBorder: {
    width: 66,
    height: 66,
    borderRadius: 33,
    padding: 2.5,
    marginRight: responsiveWidth(3),
  },
  avatarInner: {
    flex: 1,
    backgroundColor: COLORS.gereyBack,
    borderRadius: 30,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: '700',
    marginBottom: 6,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phone: {
    color: COLORS.gradientWhite,
    fontSize: responsiveFontSize(1.65),
    opacity: 0.85,
    marginLeft: 6,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: responsiveHeight(0.2),
  },
  closeButtonGradient: {
    borderRadius: 24,
    padding: 9,
    shadowColor: '#FF4D4D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  divider: {
    height: 1,
    width: '100%',
    marginBottom: responsiveHeight(2),
    opacity: 0.4,
  },
  listContainer: {
    paddingBottom: responsiveHeight(2),
  },
  drawerItem: {
    marginBottom: responsiveHeight(1.2),
    borderRadius: 16,
    overflow: 'hidden',
  },
  drawerItemGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsiveHeight(1.9),
    paddingHorizontal: responsiveWidth(3.5),
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.06)',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  drawerItemGradientActive: {
    backgroundColor: 'rgba(27, 46, 72, 0.95)',
    borderColor: 'rgba(94, 239, 255, 0.28)',
    shadowColor: 'rgba(17, 114, 199, 0.6)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveWidth(3),
  },
  iconContainerActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.24)',
  },
  icon: {
    opacity: 0.92,
  },
  drawerLabel: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
  },
  drawerLabelActive: {
    color: COLORS.white,
    fontWeight: '700',
  },
  logoutContainer: {
    marginTop: 'auto',
  },
  logoutDivider: {
    marginBottom: responsiveHeight(1.5),
    opacity: 0.25,
  },
  logoutButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsiveHeight(1.8),
    paddingHorizontal: responsiveWidth(3.5),
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    shadowColor: 'rgba(13, 37, 66, 0.8)',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  logoutIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: responsiveWidth(3),
  },
  logoutText: {
    color: COLORS.white,
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
  },
  sectionSpacer: {
    marginBottom: responsiveHeight(2.2),
  },
});

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {
  OnBoarding1Svg,
  LightSvg,
  SearchSvg,
  NotificationBellSvg,
} from '../../assets/assets';
import { COLORS, FONTS } from '../../global/theme';
import { moderateScale } from '../../helper/Scale';
import { DASHBOARD } from '../../Constants/Navigator';
interface Iprops {
  navigateTo: (text: string) => void;
  toggleDrawer?: () => void;
}
const Header: React.FC<Iprops> = props => {
  return (
    <SafeAreaView>
      <View style={styles.mainView}>
        <TouchableOpacity
          onPress={() => props.toggleDrawer && props.toggleDrawer()}
          testID="header-drawer-button"
          style={styles.icon}
        >
          <OnBoarding1Svg
            width={responsiveScreenWidth(18)}
            height={responsiveScreenWidth(18)}
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={styles.iconView}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {}}
            testID="header-light-button"
          >
            <LightSvg width={'25'} height={'25'} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => props.navigateTo(DASHBOARD.SEARCHPAGE)}
            testID="header-search-button"
          >
            <SearchSvg width={'25'} height={'20'} style={styles.image} />
          </TouchableOpacity>
          <View style={styles.icon}>
            <NotificationBellSvg
              width={'25'}
              height={'25'}
              resizeMode={'cover'}
              style={styles.image}
            />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>1</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveScreenWidth(4),
    width: responsiveScreenWidth(100),
    paddingVertical: responsiveScreenHeight(1),
  },
  leftView: {
    flex: 1,
  },
  iconView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    marginLeft: responsiveScreenWidth(4),
    position: 'relative',
  },
  badge: {
    width: responsiveScreenWidth(5),
    height: responsiveScreenWidth(5),
    position: 'absolute',
    backgroundColor: 'red',
    right: responsiveScreenWidth(-2),
    top: responsiveScreenHeight(-2),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveScreenWidth(2.5),
  },
  badgeText: {
    fontFamily: FONTS.rubik.medium,
    fontSize: moderateScale(10),
    color: COLORS.white,
  },
  image: {
    borderRadius: responsiveScreenWidth(10),
  },
});

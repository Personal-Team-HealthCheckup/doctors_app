import {View, Text, StyleSheet} from 'react-native';
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
  FONTS,
} from '../../assets/assets';
import {COLORS} from '../../global/colors';
import {moderateScale} from '../../helper/Scale';

const Header = () => {
  return (
    <View style={styles.mainView}>
      <View style={styles.leftView}>
        <OnBoarding1Svg
          width={responsiveScreenWidth(18)}
          height={responsiveScreenWidth(18)}
          style={styles.image}
        />
      </View>
      <View style={styles.iconView}>
        <View style={styles.icon}>
          <LightSvg width={'100%'} height={'100%'} style={styles.image} />
        </View>
        <View style={styles.icon}>
          <SearchSvg width={'100%'} height={'70%'} style={styles.image} />
        </View>
        <View style={styles.icon}>
          <NotificationBellSvg
            width={'100%'}
            height={'100%'}
            style={styles.image}
          />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>1</Text>
          </View>
        </View>
      </View>
    </View>
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
    height: responsiveScreenHeight(16),
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
    width: responsiveScreenWidth(10),
    height: responsiveScreenWidth(10),
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

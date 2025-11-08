import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../global/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import VectorIcon from 'react-native-vector-icons/Entypo';
import { LightSvg, NotificationBellSvg, SearchSvg } from '../../assets/assets';
import { Navigation } from '../../global/types';
import { DASHBOARD } from '../../Constants/Navigator';
import { moderateScale } from '../../helper/Scale';
import { goBack, navigateTo } from '../../helper/utilities';
interface CustomHeaderProps {
  heading?: string;
  isIcon?: boolean;
  isShowSearchIcon?: boolean;
  isShowNotificationIcon?: boolean;
  navigation?: Navigation;
  RigthView?: any;
}

interface CustomHeaderState {}

class CustomHeader extends React.Component<
  CustomHeaderProps,
  CustomHeaderState
> {
  constructor(props: CustomHeaderProps) {
    super(props);
    this.state = {};
  }

  handleGoBack = () => {
    goBack(this.props.navigation);
  };

  handleNavigateTo = (text: string) => {
    navigateTo(this.props.navigation, text);
  };

  render() {
    const { heading, RigthView } = this.props;
    return (
      <SafeAreaView>
        <View style={styles.main}>
          <View style={styles.headingView}>
            <TouchableOpacity
              testID="back-button"
              onPress={() => this.handleGoBack()}
              style={styles.iconView}
            >
              <VectorIcon
                name="chevron-left"
                size={20}
                color={COLORS.white2gray}
              />
            </TouchableOpacity>
            <Text style={styles.headingText}>{heading ?? 'profile'}</Text>
          </View>

          {this.props.isIcon && (
            <TouchableOpacity style={styles.icon}>
              <LightSvg width={'25'} height={'25'} style={styles.image} />
            </TouchableOpacity>
          )}
          {this.props.isShowSearchIcon && (
            <TouchableOpacity
              style={styles.icon}
              testID="search-button"
              onPress={() => this.handleNavigateTo(DASHBOARD.SEARCHPAGE)}
            >
              <SearchSvg width={'25'} height={'20'} style={styles.image} />
            </TouchableOpacity>
          )}
          {this.props.isShowNotificationIcon && (
            <TouchableOpacity style={styles.icon} testID="notification-button">
              <NotificationBellSvg
                width={'25'}
                height={'25'}
                resizeMode={'cover'}
                style={styles.image}
              />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>1</Text>
              </View>
            </TouchableOpacity>
          )}

          {RigthView}
        </View>
      </SafeAreaView>
    );
  }
}

export default CustomHeader;
const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headingView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: responsiveScreenWidth(5),
    flex: 1,
  },
  badge: {
    height: responsiveScreenWidth(5),
    width: responsiveScreenWidth(5),
    backgroundColor: 'red',
    position: 'absolute',
    top: responsiveScreenHeight(-2),
    right: responsiveScreenWidth(-2),
    alignItems: 'center',
    borderRadius: responsiveScreenWidth(2.5),
    justifyContent: 'center',
  },
  iconView: {
    width: responsiveScreenHeight(5),
    height: responsiveScreenHeight(5),
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveScreenHeight(5) / 3,
  },
  headingText: {
    fontFamily: FONTS.rubik.regular,
    fontSize: responsiveFontSize(2.4),
    color: COLORS.white,
    textTransform: 'capitalize',
  },
  icon: {
    position: 'relative',
    marginLeft: responsiveScreenWidth(4),
  },
  badgeText: {
    fontSize: moderateScale(10),
    fontFamily: FONTS.rubik.medium,
    color: COLORS.white,
  },
  image: {
    borderRadius: responsiveScreenWidth(10),
  },
});

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../../global/theme';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import VectorIcon from 'react-native-vector-icons/Entypo';
import { LightSvg, NotificationBellSvg, SearchSvg } from '../../assets/assets';
import { Navigation } from '../../global/types';
import { DASHBOARD } from '../../Constants/Navigator';
import { moderateScale } from '../../helper/Scale';
interface CustomHeaderProps {
  heading?: string;
  isIcon?: boolean;
  isShowSearchIcon?: boolean;
  isShowNotificationIcon?: boolean;
  navigation?: Navigation;
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
    this.props.navigation?.goBack && this.props.navigation.goBack();
  };
  handleNavigateTo = (text: string) => {
    this.props.navigation?.navigate && this.props.navigation.navigate(text);
  };

  render() {
    const { heading } = this.props;
    return (
      <View style={styles.main}>
        <View style={styles.headingView}>
          <TouchableOpacity
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
            onPress={() => this.handleNavigateTo(DASHBOARD.SEARCHPAGE)}
          >
            <SearchSvg width={'25'} height={'20'} style={styles.image} />
          </TouchableOpacity>
        )}
        {this.props.isShowNotificationIcon && (
          <TouchableOpacity style={styles.icon}>
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
      </View>
    );
  }
}

export default CustomHeader;
const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsiveHeight(3.5),
  },
  headingView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: responsiveScreenWidth(5),
    flex: 1,
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

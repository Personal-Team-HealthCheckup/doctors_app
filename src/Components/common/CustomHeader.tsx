import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../global/theme';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import VectorIcon from 'react-native-vector-icons/Entypo';
interface CustomHeaderProps {
  heading?: string;
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
  render() {
    const {heading} = this.props;
    return (
      <View style={styles.main}>
        <View style={styles.headingView}>
          <View style={styles.iconView}>
            <VectorIcon
              name="chevron-left"
              size={20}
              color={COLORS.white2gray}
            />
          </View>
          <Text style={styles.headingText}>{heading ?? 'profile'}</Text>
        </View>
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
});

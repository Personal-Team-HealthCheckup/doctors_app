import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, FONTS} from '../../global/theme';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import VectorIcon from 'react-native-vector-icons/Entypo';
import {LightSvg} from '../../assets/assets';
interface CustomHeaderProps {
  heading?: string;
  isIcon?: boolean;
  navigation?: {
    goBack: () => void;
  };
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
    this.props.navigation?.goBack();
  };

  render() {
    const {heading} = this.props;
    return (
      <View style={styles.main}>
        <View style={styles.headingView}>
          <TouchableOpacity
            onPress={() => this.handleGoBack()}
            style={styles.iconView}>
            <VectorIcon
              name="chevron-left"
              size={20}
              color={COLORS.white2gray}
            />
          </TouchableOpacity>
          <Text style={styles.headingText}>{heading ?? 'profile'}</Text>
        </View>
        {this.props.isIcon && (
          <View style={styles.icon}>
            <LightSvg width={'100%'} height={'100%'} style={styles.image} />
          </View>
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
    width: responsiveScreenWidth(10),
    height: responsiveScreenWidth(10),
  },
  image: {},
});

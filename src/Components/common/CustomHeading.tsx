import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import {
  responsiveScreenWidth,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import { SvgRightArrowSvg } from '../../assets/assets';
import { COLORS, FONTS } from '../../global/theme';
import { moderateScale } from '../../helper/Scale';
import VectorIcon from 'react-native-vector-icons/MaterialCommunityIcons';
interface CustomHeadingProps {
  title: string;
  isIcon?: boolean;
  onPressSeeAll?: () => void;
}
const CustomHeading: React.FC<CustomHeadingProps> = ({
  title,
  isIcon = false,
  onPressSeeAll,
}) => {
  return (
    <View style={styles.mainTextView}>
      <View style={styles.iconView}>
        {isIcon && (
          <VectorIcon
            name="shield-check"
            size={20}
            color={COLORS.green}
            selectionColor={'red'}
          />
        )}
        <Text style={styles.mainText}>{title}</Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={onPressSeeAll}>
        <Text style={styles.buttonSeeText}>See all</Text>
        <SvgRightArrowSvg width={10} height={10} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeading;
const styles = StyleSheet.create({
  mainTextView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveScreenWidth(4),
    paddingVertical: responsiveScreenHeight(2),
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    flex: 1,
    fontFamily: FONTS.rubik.medium,
    fontSize: moderateScale(18),
    color: COLORS.white,
  },
  buttonSeeText: {
    color: COLORS.white2gray,
    fontFamily: FONTS.rubik.light,
    fontSize: moderateScale(12),
    marginRight: responsiveScreenWidth(1),
  },
  iconView: {
    flex: 1,
    flexDirection: 'row',
    gap: responsiveScreenWidth(1),
    alignItems: 'center',
  },
});

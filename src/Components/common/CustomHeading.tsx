import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  responsiveScreenWidth,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import {SvgRightArrowSvg, FONTS} from '../assets/assets';
import {COLORS} from '../global/colors';
import {moderateScale} from '../helper/Scale';
interface CustomHeadingProps {
  title: string;
}
const CustomHeading: React.FC<CustomHeadingProps> = ({title}) => {
  return (
    <View style={styles.mainTextView}>
      <Text style={styles.mainText}>{title}</Text>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.buttonSeeText}>See all</Text>
        <SvgRightArrowSvg />
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
  },
});

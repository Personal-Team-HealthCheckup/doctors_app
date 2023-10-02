import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  responsiveScreenWidth,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import {SvgRightArrowSvg} from '../../assets/assets';
import {COLORS, FONTS} from '../../global/theme';
import {moderateScale} from '../../helper/Scale';
import VectorIcon from "react-native-vector-icons/MaterialCommunityIcons"
interface CustomHeadingProps {
  title: string;
  isIcon?: boolean;
}
const CustomHeading: React.FC<CustomHeadingProps> = ({title,isIcon= false}) => {
  return (
    <View style={styles.mainTextView}>
      <View style={{flex :1, flexDirection:"row",gap:responsiveScreenWidth(1),}}>
{isIcon && <VectorIcon name='shield-check' size={20} color={COLORS.green}  selectionColor={"red"} />
      }<Text style={styles.mainText}>{title}</Text>
      </View>
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

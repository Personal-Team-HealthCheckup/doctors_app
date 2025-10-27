import { StyleSheet } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { COLORS, FONTS } from '../../global/theme';
import { moderateScale, verticalScale } from '../../helper/Scale';

export const commonStyles = StyleSheet.create({
  decorationTwo: {
    position: 'absolute',
    top: responsiveHeight(18),
    right: responsiveWidth(10),
    opacity: 0.45,
  },
  logo: {
    alignSelf: 'center',
    marginTop: responsiveHeight(3),
    marginBottom: responsiveHeight(4),
  },
  card: {
    backgroundColor: 'rgba(7, 20, 40, 0.78)',
    borderRadius: 22,
    paddingVertical: responsiveHeight(4),
    paddingHorizontal: responsiveWidth(5),
    borderWidth: 1,
    borderColor: 'rgba(94, 239, 255, 0.22)',
    shadowColor: '#0F5C8F',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.32,
    shadowRadius: 28,
    elevation: 12,
  },
  titleText: {
    fontFamily: FONTS.rubik.medium,
    fontSize: moderateScale(24),
    color: COLORS.white,
    marginBottom: responsiveHeight(1.5),
    textAlign: 'center',
  },
  subtitleText: {
    fontFamily: FONTS.rubik.regular,
    fontSize: moderateScale(14),
    color: COLORS.white2gray,
    textAlign: 'center',
    marginBottom: responsiveHeight(3),
    lineHeight: moderateScale(20),
  },
  inputWrapper: {
    marginBottom: responsiveHeight(2.5),
  },
  resetButton: {
    height: verticalScale(54),
  },
});

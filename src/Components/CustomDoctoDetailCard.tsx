import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { COLORS, FONTS } from '../global/theme';
import { moderateScale } from '../helper/Scale';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import CustomRating from './CustomRating';
import { imageProfile3 } from '../assets/assets';

function CustomDoctoDetailCard() {
  return (
    <View style={styles.cardDoctor}>
      <View style={styles.imageView1}>
        <Image source={imageProfile3} style={styles.imageStyles} />
        <View style={styles.textView}>
          <Text numberOfLines={2} style={styles.heading}>
            Dr. Julie Will Dr. Julie Will Dr. Julie Will
          </Text>
          <Text numberOfLines={3} style={[styles.subHeading]}>
            Upasana Dental Clinic, salt lake
          </Text>
          <CustomRating
            initialValue={3}
            iconSize={18}
            isDisable
            starViewStyle={styles.customRating}
          />
          <Text>
            $ <Text> 28/hr</Text>
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.likeButton}>
        <FontAwesomeIcon
          name={true ? 'heart' : 'heart-o'}
          color={true ? COLORS.red1 : COLORS.lightBlack2}
          size={20}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardDoctor: {
    backgroundColor: COLORS.black2gray,
    borderRadius: responsiveHeight(2),
    width: responsiveWidth(90),
    minHeight: responsiveHeight(16),
    padding: responsiveWidth(4),
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageView1: {
    flexDirection: 'row',
    flex: 1,
    gap: responsiveWidth(3),
    alignItems: 'center',
  },
  customRating: {
    marginTop: responsiveHeight(1),
    gap: responsiveWidth(1),
  },
  imageStyles: {
    width: responsiveHeight(14),
    height: responsiveHeight(14),
    resizeMode: 'cover',
    borderRadius: responsiveWidth(2),
  },
  heading: {
    fontFamily: FONTS.rubik.medium,
    fontSize: moderateScale(18),
    color: COLORS.white,
    width: '50%',
  },
  subHeading: {
    fontSize: moderateScale(12),
    color: COLORS.white2gray,
    fontFamily: FONTS.rubik.light,
    width: '50%',
  },
  mainView1: {
    marginTop: responsiveHeight(2),
  },

  likeButton: {
    alignItems: 'flex-start',
  },
  textView: {},
});

export default CustomDoctoDetailCard;

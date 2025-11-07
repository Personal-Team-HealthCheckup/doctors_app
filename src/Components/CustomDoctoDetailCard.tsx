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
interface CustomDoctoDetailCardProps {
  isLiked?: boolean;
}
function CustomDoctoDetailCard({ isLiked = true }: CustomDoctoDetailCardProps) {
  return (
    <View style={styles.cardDoctor}>
      <View style={styles.imageView1}>
        <Image source={imageProfile3} style={styles.imageStyles} />
      </View>
      <View style={styles.textView}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text numberOfLines={2} style={styles.heading}>
              Dr. Julie Will Dr. Julie Will Dr. Julie Will
            </Text>
            <Text numberOfLines={3} style={[styles.subHeading]}>
              Upasana Dental Clinic, salt lake
            </Text>
          </View>
          <TouchableOpacity style={styles.likeButton}>
            <FontAwesomeIcon
              name={isLiked ? 'heart' : 'heart-o'}
              color={isLiked ? COLORS.red1 : COLORS.lightBlack2}
              size={20}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.viewTextMainRating}>
          <CustomRating
            initialValue={3}
            iconSize={18}
            isDisable
            starViewStyle={styles.customRating}
          />
          <Text style={styles.textPrice}>
            $ <Text style={styles.text2}>28.00/hr</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewTextMainRating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  textPrice: {
    fontFamily: FONTS.rubik.medium,
    fontSize: moderateScale(12),
    color: COLORS.green,
  },
  text2: {
    fontFamily: FONTS.rubik.light,
    color: COLORS.white,
  },
  cardDoctor: {
    backgroundColor: COLORS.black2gray,
    borderRadius: responsiveHeight(2),
    width: responsiveWidth(90),
    minHeight: responsiveHeight(16),
    padding: responsiveWidth(4),
    flexDirection: 'row',
    gap: responsiveWidth(3),
  },
  imageView1: {},
  customRating: {
    gap: responsiveWidth(1),
    justifyContent: 'flex-start',
  },
  imageStyles: {
    width: responsiveHeight(14),
    height: responsiveHeight(14),
    resizeMode: 'cover',
    borderRadius: responsiveWidth(2),
  },
  subHeading: {
    fontSize: moderateScale(12),
    color: COLORS.white2gray,
    fontFamily: FONTS.rubik.light,
    // width: '50%',
  },
  heading: {
    fontFamily: FONTS.rubik.medium,
    fontSize: moderateScale(18),
    color: COLORS.white,
    // width: '50%',
  },
  mainView1: {
    marginTop: responsiveHeight(2),
  },

  likeButton: {
    // alignItems: 'flex-start',
  },
  textView: {
    flex: 1,
  },
});

export default CustomDoctoDetailCard;

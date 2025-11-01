import { StyleSheet } from 'react-native';
import {
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { COLORS } from '../../global/theme';

export const CommonStyles = StyleSheet.create({
  mainView: { flex: 1 },
  container: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    backgroundColor: COLORS.black,
    flex: 1,
  },
  imageView: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    resizeMode: 'cover',
    paddingVertical: responsiveHeight(3),
    position: 'relative',
    paddingHorizontal: responsiveScreenWidth(5),
    flex: 1,
  },
  textInput: {},
  stylesFlatlist: {
    marginVertical: '5%',
  },
  doctorList: { marginVertical: 4 },
  contentContainer: { paddingBottom: responsiveHeight(15) },
});

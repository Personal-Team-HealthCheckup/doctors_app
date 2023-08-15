import React from 'react';
import {StyleSheet, View, Text, ImageBackground, FlatList} from 'react-native';
import CustomStatusBar from '../../Components/CustomStatusBar';
import CustomMainView from '../../Components/CustomMainView';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {COLORS} from '../../global/colors';
import {moderateScale} from '../../helper/Scale';
import {FONTS, GradientnearBy, MapSvg} from '../../assets/assets';
import CustomGButton from '../../Components/CustomGButton';
import {doctorData} from '../../global/data';
import {DoctorData} from '../../global/types';
interface DoctorNearYouProps {}

interface DoctorNearYouState {}

class DoctorNearYou extends React.Component<
  DoctorNearYouProps,
  DoctorNearYouState
> {
  constructor(props: DoctorNearYouProps) {
    super(props);
    this.state = {};
  }
  _renderItem = ({item}: {item: DoctorData}) => {
    const Svg = item.imageUrl as any;
    const {isAvailable, name} = item;
    return (
      <View style={styles.card}>
        {/* need to implement exact blur effect */}
        <View style={styles.imageCard}>
          <Svg
            width={responsiveScreenWidth(15)}
            height={responsiveScreenWidth(15)}
            style={styles.image}
          />
          <View style={styles.cardText}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subText}>
              {isAvailable ? 'Available' : 'Unavailable'}
            </Text>
          </View>
        </View>
        <CustomGButton
          tittle="Book"
          style={styles.button}
          textStyle={styles.textStyle}
        />
      </View>
    );
  };

  _keyExtractor = (item: DoctorData) => item.id.toString();

  render() {
    return (
      <>
        <CustomStatusBar />
        <CustomMainView style={styles.main}>
          <View style={styles.view1}>
            {/*  need  to implement google map*/}
            <MapSvg
              width={responsiveScreenWidth(100)}
              height={responsiveScreenHeight(50)}
              resizeMode="cover"
            />
          </View>
          <View style={styles.view2}>
            <ImageBackground
              source={GradientnearBy}
              style={styles.imageBackground}>
              <Text style={styles.text}>Doctors Near You</Text>
              <FlatList
                data={doctorData}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                contentContainerStyle={styles.listDoctorView}
                showsVerticalScrollIndicator={false}
              />
            </ImageBackground>
          </View>
        </CustomMainView>
      </>
    );
  }
}

export default DoctorNearYou;
const styles = StyleSheet.create({
  view1: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(50),
  },
  main: {
    backgroundColor: COLORS.white,
  },
  view2: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(50),
    borderTopLeftRadius: moderateScale(12.685),
    borderTopRightRadius: moderateScale(12.685),
    backgroundColor: COLORS.black,
  },
  imageBackground: {
    flex: 1,
    paddingTop: responsiveScreenHeight(4),
    alignItems: 'center',
    resizeMode: 'cover',
  },
  text: {
    color: COLORS.white,
    fontFamily: FONTS.poppins.semiBold,
    fontSize: moderateScale(22),
  },
  listDoctorView: {
    marginTop: responsiveScreenHeight(2.4),
    paddingBottom: responsiveScreenHeight(5),
  },
  card: {
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(11),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255,0.04)',
    paddingHorizontal: responsiveScreenWidth(3),
    resizeMode: 'cover',
    marginVertical: responsiveScreenHeight(0.6),
  },
  cardBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  imageCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: COLORS.white,
    fontFamily: FONTS.poppins.semiBold,
    fontSize: moderateScale(12),
  },
  subText: {
    color: COLORS.lightGreen,
    fontFamily: FONTS.poppins.medium,
    fontSize: moderateScale(10),
  },
  cardText: {
    flex: 1,
    marginLeft: responsiveScreenWidth(3),
  },
  image: {
    borderRadius: responsiveScreenWidth(20) / 2,
  },
  button: {
    width: responsiveScreenWidth(25),
    height: responsiveScreenWidth(10),
    borderRadius: moderateScale(9.1),
  },
  textStyle: {
    fontFamily: FONTS.poppins.medium,
    fontSize: moderateScale(16.02),
  },
});

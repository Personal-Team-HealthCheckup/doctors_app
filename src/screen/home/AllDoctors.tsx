import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
} from 'react-native';
import CustomStatusBar from '../../Components/common/CustomStatusBar';
import { COLORS } from '../../global/theme';
import { HomeScreenPng } from '../../assets/assets';
import {
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CustomHeader from '../../Components/common/CustomHeader';
import { Navigation, YourAppointmentsData } from '../../global/types';
import { AllDoctorsData } from '../../global/data';
import CustomAppointmentCard from '../../Components/common/CustomAppointmentCard';
import { DASHBOARD } from '../../Constants/Navigator';

interface AllDoctorsProps {
  navigation?: Navigation;
}

interface AllDoctorsState {
  isScrollEnabled: boolean;
  doctorDetailsData: YourAppointmentsData[];
}

class AllDoctors extends React.Component<AllDoctorsProps, AllDoctorsState> {
  constructor(props: AllDoctorsProps) {
    super(props);
    this.state = {
      isScrollEnabled: false,
      doctorDetailsData: AllDoctorsData,
    };
  }
  navigateTo = (text: string) => {
    this.props.navigation?.navigate && this.props.navigation?.navigate(text);
  };

  _renderDoctors = ({
    item,
    index,
  }: {
    item: YourAppointmentsData;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        style={styles.doctorList}
        onPress={() => this.navigateTo(DASHBOARD.DOCTORDETAILS)}
      >
        <CustomAppointmentCard
          item={item}
          index={index}
          yourAppointmentsData={this.state.doctorDetailsData}
          navigateTo={undefined}
        />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.mainView}>
        <CustomStatusBar
          isScrollEnabled={this.state.isScrollEnabled}
          backgroundColor={
            this.state.isScrollEnabled ? COLORS.white : COLORS.transparent
          }
        />

        <View style={styles.container}>
          <ImageBackground source={HomeScreenPng} style={styles.imageView}>
            <CustomHeader
              navigation={this.props.navigation}
              heading="Qualified Doctors"
              isIcon
              isShowSearchIcon
            />
            <View>
              <FlatList
                bounces={false}
                showsVerticalScrollIndicator={false}
                style={styles.stylesFlatlist}
                contentContainerStyle={styles.contentContainer}
                data={this.state.doctorDetailsData}
                renderItem={this._renderDoctors}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

export default AllDoctors;
const styles = StyleSheet.create({
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
    alignItems: 'center',
    resizeMode: 'cover',
    paddingVertical: responsiveHeight(3),
    position: 'relative',
    paddingHorizontal: responsiveScreenWidth(5),
    flex: 1,
  },
  textInput: { marginTop: responsiveHeight(4) },
  stylesFlatlist: {
    marginVertical: '5%',
  },
  doctorList: { marginVertical: 4 },
  contentContainer: { paddingBottom: responsiveHeight(15) },
});

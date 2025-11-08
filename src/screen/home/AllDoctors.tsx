import React from 'react';
import {
  ImageBackground,
  FlatList,
  View,
  TouchableOpacity,
} from 'react-native';
import CustomStatusBar from '../../Components/common/CustomStatusBar';
import { COLORS } from '../../global/theme';
import { HomeScreenPng } from '../../assets/assets';
import CustomHeader from '../../Components/common/CustomHeader';
import { Navigation, YourAppointmentsData } from '../../global/types';
import { AllDoctorsData } from '../../global/data';
import CustomAppointmentCard from '../../Components/common/CustomAppointmentCard';
import { DASHBOARD } from '../../Constants/Navigator';
import { CommonStyles as styles } from './CommonStyles';
interface AllDoctorsProps {
  navigation?: Navigation;
}

interface AllDoctorsState {
  doctorDetailsData: YourAppointmentsData[];
}

class AllDoctors extends React.Component<AllDoctorsProps, AllDoctorsState> {
  constructor(props: AllDoctorsProps) {
    super(props);
    this.state = {
      doctorDetailsData: AllDoctorsData,
    };
  }
  navigateTo = (text: string) => {
    this.props.navigation?.navigate && this.props.navigation?.navigate(text);
  };

  _renderDoctors = ({
    item,
  }: {
    item: YourAppointmentsData;
    index: number;
  }) => {
    return (
      <TouchableOpacity
        testID="doctor-detail-card"
        style={styles.doctorList}
        onPress={() => this.navigateTo(DASHBOARD.DOCTORDETAILS)}
      >
        <CustomAppointmentCard
          item={item}
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
          isScrollEnabled={false}
          backgroundColor={COLORS.transparent}
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
                testID="flat-list-doctor-details"
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

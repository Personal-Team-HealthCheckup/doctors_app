import React from 'react';
import { ImageBackground, FlatList, View } from 'react-native';
import CustomStatusBar from '../../Components/common/CustomStatusBar';
import { HomeScreenPng } from '../../assets/assets';
import CustomHeader from '../../Components/common/CustomHeader';
import CustomTextInput from '../../Components/common/CustomTextInput';
import { YourAppointmentsData } from '../../global/types';
import { yourAppointmentsData } from '../../global/data';
import CustomAppointmentCard from '../../Components/common/CustomAppointmentCard';
import { CommonStyles as styles } from './CommonStyles';

interface SearchPageProps {
  navigation?: {
    goBack: () => void;
  };
}

interface SearchPageState {
  doctorDetailsData: YourAppointmentsData[];
}

class SearchPage extends React.Component<SearchPageProps, SearchPageState> {
  constructor(props: SearchPageProps) {
    super(props);
    this.state = {
      doctorDetailsData: yourAppointmentsData,
    };
  }
  _renderDoctors = ({
    item,
    index,
  }: {
    item: YourAppointmentsData;
    index: number;
  }) => {
    return (
      <View style={styles.doctorList}>
        <CustomAppointmentCard
          item={item}
          yourAppointmentsData={this.state.doctorDetailsData}
          navigateTo={undefined}
        />
      </View>
    );
  };
  render() {
    return (
      <View style={styles.mainView}>
        <CustomStatusBar />

        <View style={styles.container}>
          <ImageBackground source={HomeScreenPng} style={styles.imageView}>
            <CustomHeader
              navigation={this.props.navigation}
              heading="Find Doctors"
              isIcon
            />
            <CustomTextInput style={styles.textInput} placeholder="Search" />
            <View>
              <FlatList
                bounces={false}
                showsVerticalScrollIndicator={false}
                style={styles.stylesFlatlist}
                contentContainerStyle={styles.contentContainer}
                data={this.state.doctorDetailsData}
                renderItem={this._renderDoctors}
              />
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

export default SearchPage;

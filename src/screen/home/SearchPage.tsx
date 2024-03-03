import React from 'react';
import {
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  FlatList,
  View,
} from 'react-native';
import CustomStatusBar from '../../Components/common/CustomStatusBar';
import {COLORS} from '../../global/theme';
import {handleScroll} from '../../helper/utilities';
import {HomeScreenPng} from '../../assets/assets';
import {
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CustomHeader from '../../Components/common/CustomHeader';
import CustomTextInput from '../../Components/common/CustomTextInput';
import {YourAppointmentsData} from '../../global/types';
import {yourAppointmentsData} from '../../global/data';
import CustomAppointmentCard from '../../Components/common/CustomAppointmentCard';

interface SearchPageProps {
  navigation?: {
    goBack: () => void;
  };
}

interface SearchPageState {
  isScrollEnabled: boolean;
  doctorDetailsData: YourAppointmentsData[];
}

class SearchPage extends React.Component<SearchPageProps, SearchPageState> {
  constructor(props: SearchPageProps) {
    super(props);
    this.state = {
      isScrollEnabled: false,
      doctorDetailsData: yourAppointmentsData,
    };
  }
  handleScroll1 = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    this.setState({isScrollEnabled: handleScroll(event)});
  };
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
          index={index}
          yourAppointmentsData={this.state.doctorDetailsData}
        />
      </View>
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

        <ScrollView
          scrollEnabled={false}
          onScroll={event => this.handleScroll1(event)}
          scrollEventThrottle={16}
          bounces={false}
          style={styles.container}>
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
        </ScrollView>
      </View>
    );
  }
}

export default SearchPage;
const styles = StyleSheet.create({
  mainView: {flex: 1},
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
  textInput: {marginTop: responsiveHeight(4)},
  stylesFlatlist: {
    marginVertical: '5%',
  },
  doctorList: {marginVertical: 4},
  contentContainer: {paddingBottom: responsiveHeight(15)},
});

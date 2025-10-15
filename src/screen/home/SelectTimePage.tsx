import React from 'react';
import {
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import CustomStatusBar from '../../Components/common/CustomStatusBar';
import CustomHeader from '../../Components/common/CustomHeader';
import { gradientPng, imageProfile3 } from '../../assets/assets';
import {
  Navigation,
  Slots,
  SlotsAvailableChangeData,
  SlotsDateTimes,
} from '../../global/types';
import { handleScroll } from '../../helper/utilities';
import { COLORS, FONTS } from '../../global/theme';
import {
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { moderateScale } from '../../helper/Scale';
import CustomRating from '../../Components/CustomRating';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { slotsAvailable, slotsDateTimes } from '../../global/data';
import LinearGradient from 'react-native-linear-gradient';
import CustomGButton from '../../Components/common/CustomGButton';
import CustomButton from '../../Components/common/CustomButton';
interface SelectTimePageProps {
  navigation?: Navigation;
}

interface SelectTimePageState {
  slotItem?: SlotsDateTimes;
  slotsDateTimes: SlotsDateTimes[];
  isNextAvailabilityClicked: boolean;
  slotsAvailable: SlotsAvailableChangeData[];
}

class SelectTimePage extends React.Component<
  SelectTimePageProps,
  SelectTimePageState
> {
  constructor(props: SelectTimePageProps) {
    super(props);
    this.state = {
      slotsDateTimes: slotsDateTimes,
      isNextAvailabilityClicked: false,
      slotsAvailable: slotsAvailable,
    };
  }

  Card = (item: SlotsDateTimes) => (
    <TouchableOpacity
      onPress={() => this.selectTheSlot(item)}
      style={styles.slotView}
    >
      <Text style={styles.heading1}>{item.date}</Text>
      <Text style={styles.subHeading1}>
        {item.slotsAvailable > 0 ? item.slotsAvailable : 'No'} slots available
      </Text>
    </TouchableOpacity>
  );

  _renderSlots = ({ item }: { item: SlotsDateTimes }) => {
    const { Card } = this;

    return (
      <>
        {item.isSelected ? (
          <LinearGradient
            colors={[COLORS.greeen2, COLORS.greeen1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.slotView, styles.gradient]}
          >
            <Card {...item} />
          </LinearGradient>
        ) : (
          <Card {...item} />
        )}
      </>
    );
  };

  isNextAvailabilityClicked = () => {
    this.setState(prev => ({
      isNextAvailabilityClicked: !prev.isNextAvailabilityClicked,
    }));
  };
  componentDidMount(): void {
    const slotItem = this.state.slotsDateTimes.find(slot => slot.isSelected);
    const slotsAvailable1 = this.state.slotsAvailable.map(slot => {
      const x = slot.slots.map(item => {
        return {
          slots: item,
          isSelected: false,
        };
      }) as unknown as string[];

      return { ...slot, slots: x };
    });
    this.setState({ slotsAvailable: slotsAvailable1 });
    this.setState({ slotItem: slotItem });
  }
  selectTheSlot = (item: SlotsDateTimes) => {
    this.setState(
      {
        slotsDateTimes: this.state.slotsDateTimes.map(slot => {
          if (item.id === slot.id) {
            slot.isSelected = true;
          } else {
            slot.isSelected = false;
          }
          return slot;
        }),
      },
      () => {
        const slotItem = this.state.slotsDateTimes.find(
          slot => slot.isSelected,
        );
        this.setState({ slotItem: slotItem });
      },
    );
  };

  toggleSlotTimeAvail = (slots: string) => {
    const slotsAvailable1 = this.state.slotsAvailable.map(slot => {
      const x = slot.slots.map(item => {
        const items = item as Slots;
        if (items.slots === slots) {
          items.isSelected = true;
        } else {
          items.isSelected = false;
        }
        return items;
      }) as unknown as string[];

      return { ...slot, slots: x };
    });
    this.setState({ slotsAvailable: slotsAvailable1 });
  };

  _renderTime = ({ item }: { item: Slots | string }) => {
    const { isSelected, slots } = item as Slots;
    return (
      <>
        {isSelected ? (
          <LinearGradient
            colors={[COLORS.greeen2, COLORS.greeen1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.buttonSlot, styles.gradient1]}
          >
            <TouchableOpacity
              onPress={() => this.toggleSlotTimeAvail(slots)}
              style={styles.buttonSlot}
            >
              <Text
                style={[
                  styles.heading1,
                  styles.headingText,
                  isSelected && styles.headingSelectText,
                ]}
              >
                {slots}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <TouchableOpacity
            onPress={() => this.toggleSlotTimeAvail(slots)}
            style={styles.buttonSlot}
          >
            <Text style={[styles.heading1, styles.headingText]}>{slots}</Text>
          </TouchableOpacity>
        )}
      </>
    );
  };
  _renderSlotsTime = ({ item }: { item: SlotsAvailableChangeData }) => {
    return (
      <View style={styles.slotAvailableView}>
        <Text style={styles.heading1}>{item.date}</Text>
        <View>
          <FlatList
            bounces={false}
            style={styles.flatSlotList}
            data={item.slots}
            renderItem={this._renderTime}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.mainView}>
        <CustomStatusBar
          isScrollEnabled={false}
          backgroundColor={COLORS.transparent}
        />

        <ImageBackground source={gradientPng} style={styles.imageView}>
          <View style={styles.mainViewContainer}>
            <CustomHeader
              navigation={this.props.navigation}
              heading="Select Time"
              isIcon
            />
            <ScrollView
              bounces={false}
              contentContainerStyle={styles.buttonContainerStyle}
              style={styles.container}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.mainView1}>
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
                <View style={styles.fltView}>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={this.state.slotsDateTimes}
                    contentContainerStyle={styles.contentContainerStyle}
                    style={styles.styleFlat}
                    renderItem={this._renderSlots}
                    keyExtractor={item => item.id.toString()}
                  />
                </View>
                <View style={styles.noSlotView}>
                  {this.state.slotItem && (
                    <TouchableOpacity activeOpacity={1} style={styles.slotView}>
                      <Text style={styles.heading1}>
                        {this.state.slotItem.date}
                      </Text>
                      <Text style={[styles.subHeading1, styles.subHe]}>
                        {this.state.slotItem.slotsAvailable > 0
                          ? this.state.slotItem.slotsAvailable
                          : 'No'}{' '}
                        slots available
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                {this.state.isNextAvailabilityClicked ? (
                  <View style={{}}>
                    <FlatList
                      bounces={false}
                      data={this.state.slotsAvailable}
                      renderItem={this._renderSlotsTime}
                      keyExtractor={item => item.date}
                    />
                    <View style={styles.buttonViewSlot}>
                      <CustomGButton
                        tittle="Edit"
                        isGray={true}
                        style={styles.buttonSlots}
                        textStyle={styles.text}
                      />
                      <CustomGButton
                        tittle="Book Now"
                        style={styles.buttonSlots}
                        textStyle={styles.text}
                      />
                    </View>
                  </View>
                ) : (
                  <View style={styles.buttonView}>
                    <CustomGButton
                      tittle={`Next availability on ${this.state.slotItem?.date}`}
                      style={styles.button}
                      textStyle={styles.text}
                      onPress={this.isNextAvailabilityClicked}
                    />
                    <Text style={[styles.subHe, styles.text1]}>OR</Text>
                    <CustomButton
                      title="Contact Clinic"
                      style={[styles.button, styles.button1]}
                      textStyle={[styles.text, styles.textGreen]}
                    />
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default SelectTimePage;
const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    paddingHorizontal: responsiveScreenWidth(5),
    paddingVertical: responsiveHeight(3),
    width: responsiveWidth(100),
    height: responsiveHeight(100),
  },
  mainView: {
    flex: 1,
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    backgroundColor: COLORS.black,
  },
  buttonContainerStyle: { paddingBottom: responsiveHeight(10) },
  container: {
    flex: 1,
  },
  imageView: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    alignItems: 'center',
    resizeMode: 'cover',
    position: 'relative',
    flex: 1,
  },
  textInput: { marginTop: responsiveHeight(4) },
  stylesFlatlist: {
    marginVertical: '5%',
  },
  doctorList: { marginVertical: 4 },
  contentContainer: { paddingBottom: responsiveHeight(15) },
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
  imageStyles: {
    width: responsiveHeight(14),
    height: responsiveHeight(14),
    resizeMode: 'cover',
    borderRadius: responsiveWidth(2),
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
  textView: {},
  likeButton: {
    alignItems: 'flex-start',
  },
  slotView: {
    borderColor: 'rgba(103, 114, 148, 0.10);',
    borderWidth: responsiveWidth(0.5),
    width: responsiveWidth(40),
    padding: responsiveWidth(2),
    paddingHorizontal: responsiveWidth(0),
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(8),
    borderRadius: responsiveWidth(2),
  },
  gradient: {
    borderWidth: responsiveWidth(0),
    borderColor: 'transparent',
  },
  heading1: {
    fontFamily: FONTS.rubik.medium,
    fontSize: moderateScale(16),
    color: COLORS.white,
  },
  subHeading1: {
    fontSize: moderateScale(10),
    color: COLORS.white2gray,
    fontFamily: FONTS.rubik.light,
  },
  contentContainerStyle: {
    gap: responsiveWidth(1),
    paddingBottom: 0,
  },
  subHe: {
    fontSize: moderateScale(14),
    fontFamily: FONTS.rubik.regular,
    marginTop: responsiveHeight(2),
  },
  styleFlat: {},
  fltView: {
    height: responsiveHeight(10),
    marginVertical: responsiveHeight(2),
  },
  noSlotView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView: {
    alignItems: 'center',
    marginVertical: responsiveHeight(2),
  },
  button: {
    paddingHorizontal: 'auto',
    width: responsiveWidth(90),
  },
  button1: {
    borderRadius: responsiveWidth(2),
    borderColor: 'rgba(14, 190, 127, 0.50)',
    borderWidth: responsiveWidth(0.5),
    backgroundColor: COLORS.black,
  },
  text: {
    fontFamily: FONTS.rubik.medium,
    fontSize: moderateScale(18),
  },
  textGreen: {
    color: COLORS.green,
  },
  text1: {
    color: COLORS.white2gray,
    marginBottom: responsiveHeight(2),
  },
  headingText: {
    color: COLORS.green,
    fontSize: moderateScale(13),
  },
  headingSelectText: {
    color: COLORS.white,
  },
  buttonSlot: {
    backgroundColor: COLORS.greygreeen,
    width: responsiveWidth(20),
    borderRadius: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsiveWidth(1.5),
    paddingVertical: responsiveHeight(2),
  },
  gradient1: {
    padding: responsiveWidth(0),
    paddingVertical: responsiveHeight(0),
    borderRadius: responsiveWidth(2.5),
  },
  flatSlotList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: responsiveWidth(3),
    marginTop: responsiveHeight(2),
  },
  slotAvailableView: {
    marginTop: responsiveHeight(2),
  },
  buttonSlots: {
    width: responsiveWidth(40),
  },
  buttonViewSlot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: responsiveHeight(4),
  },
});

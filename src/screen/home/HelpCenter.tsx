import React, { useState } from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomStatusBar from '../../Components/common/CustomStatusBar';
import CustomHeader from '../../Components/common/CustomHeader';
import { Navigation } from '../../global/types';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { COLORS, FONTS } from '../../global/theme';
import { bgTokenImg, SvgRightArrowSvg } from '../../assets/assets';

interface HelpCenterProps {
  navigation?: Navigation;
}
interface HelpTopicsType {
  title: string;
  id: number;
  description: string;
  isSelected: boolean;
}

const helpTopics: HelpTopicsType[] = [
  {
    title: 'Booking a new Appointment',
    id: 1,
    description:
      'Stuck while trying to schedule a consultation? Tell us where you got held up and we will guide you through confirming the slot.',
    isSelected: true,
  },
  {
    title: 'Existing Appointment',
    id: 2,
    description:
      'Need to reschedule, cancel, or update patient details for an upcoming visit? Share the appointment ID and the change you require.',
    isSelected: false,
  },
  {
    title: 'Online consultations',
    id: 3,
    description:
      'Facing audio/video issues with a virtual visit or haven’t received the doctor’s summary yet? Our support team can troubleshoot instantly.',
    isSelected: false,
  },
  {
    title: 'Feedbacks',
    id: 4,
    description:
      'We read every review. Describe your experience in a couple of sentences so we can pass it to the right team and close the loop with you.',
    isSelected: false,
  },
  {
    title: 'Medicine orders',
    id: 5,
    description:
      'Delayed deliveries, missing medicines, payment deductions, or dosage clarifications—tell us what went wrong with your pharmacy order.',
    isSelected: false,
  },
  {
    title: 'Diagnostic Tests',
    id: 6,
    description:
      'Share your sample booking details if you have not received reports, need to change the collection window, or want to update the test address.',
    isSelected: false,
  },
  {
    title: 'Health plans',
    id: 7,
    description:
      'Need help understanding plan benefits, renewal timelines, or adding family members? Mention your plan ID and the exact clarification required.',
    isSelected: false,
  },
  {
    title: 'My account and Practo Drive',
    id: 8,
    description:
      'Password resets, profile edits, privacy controls, and data export requests are handled here. Please include the email or phone linked to your account.',
    isSelected: false,
  },
  {
    title: 'Have a feature in mind',
    id: 9,
    description:
      'We love hearing what could make VHA better. Describe your idea in as much detail as you like—even sketches or bullet points help.',
    isSelected: false,
  },
  {
    title: 'Other issues',
    id: 10,
    description:
      'Can’t find your concern above? Drop a short summary so we can route it to the right specialist and get back with a solution.',
    isSelected: false,
  },
];

function HelpCenter({ navigation }: HelpCenterProps) {
  const [helpCenterData, setHelpCenterData] = useState(helpTopics);
  const handleClick = (item: HelpTopicsType) => {
    const tempData = helpCenterData.map(helperData => {
      if (helperData.id === item.id) {
        helperData.isSelected = true;
      } else {
        helperData.isSelected = false;
      }
      return helperData;
    });
    setHelpCenterData(tempData);
  };

  const renderItem = ({ item }: { item: HelpTopicsType }) => (
    <TouchableOpacity
      testID="btnClickItem"
      activeOpacity={0.8}
      onPress={() => handleClick(item)}
    >
      <View style={styles.listRow}>
        <Text style={styles.rowText}>{item.title}</Text>
        <SvgRightArrowSvg
          width={responsiveWidth(4)}
          height={responsiveWidth(4)}
          style={item.isSelected && styles.rotateIconStyle}
        />
      </View>
      {item.isSelected && (
        <View style={styles.descriptionWrapper} testID="viewDesc">
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <CustomStatusBar />
      <ImageBackground source={bgTokenImg} style={styles.backgroundImage}>
        <CustomHeader heading="Help Center" navigation={navigation} />
        <View style={styles.card}>
          <Text style={styles.cardText}>I have an issue with</Text>
        </View>
        <FlatList
          data={helpCenterData}
          testID="listHelpCenter"
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
          bounces={false}
          showsVerticalScrollIndicator={false}
        />
      </ImageBackground>
    </View>
  );
}

export default HelpCenter;

const styles = StyleSheet.create({
  rotateIconStyle: {
    transform: [{ rotate: '90deg' }],
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  backgroundImage: {
    flex: 1,
    width: responsiveScreenWidth(100),
    paddingVertical: responsiveHeight(3),
    paddingHorizontal: responsiveScreenWidth(5),
  },
  card: {
    backgroundColor: '#1C1C28',
    borderRadius: responsiveWidth(4),
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
    marginTop: responsiveHeight(4),
    marginBottom: responsiveHeight(3),
  },
  cardText: {
    color: COLORS.white,
    fontFamily: FONTS.inter['semiBold[600]'],
    fontSize: responsiveFontSize(2.1),
  },
  listContent: {
    paddingBottom: responsiveHeight(6),
  },
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsiveHeight(2),
  },
  rowText: {
    color: COLORS.white,
    fontFamily: FONTS.inter['regular[400]'],
    fontSize: responsiveFontSize(2),
  },
  descriptionWrapper: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(3),
    borderRadius: responsiveWidth(2),
    marginBottom: responsiveHeight(1),
  },
  descriptionText: {
    color: COLORS.white2gray,
    fontFamily: FONTS.inter['regular[400]'],
    fontSize: responsiveFontSize(1.8),
    lineHeight: responsiveHeight(2.8),
  },
});

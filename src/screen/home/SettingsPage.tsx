import React, { useState } from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Switch,
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

interface SettingsPageProps {
  navigation?: Navigation;
}

const accountSettings = [
  { id: 1, title: 'Change Password', iconColor: '#FF6666', description: 'Update your password and secure the account.' },
  { id: 2, title: 'Notifications', iconColor: '#48CFAF', description: 'Manage push, email, and SMS alerts.' },
  { id: 3, title: 'Statistics', iconColor: '#64B5F6', description: 'Review visit and prescription summaries.' },
  { id: 4, title: 'About us', iconColor: '#FFB347', description: 'Learn more about the team behind VHA.' },
];

const moreOptions = [
  { id: 5, title: 'Languages', value: 'English' },
  { id: 6, title: 'Currency', value: '$-USD' },
  { id: 7, title: 'Linked accounts', value: 'Facebook, Google' },
];

function SettingsPage({ navigation }: SettingsPageProps) {
  const [textMessages, setTextMessages] = useState(true);
  const [phoneCalls, setPhoneCalls] = useState(true);

  const renderAccountItem = ({ item }: { item: typeof accountSettings[0] }) => (
    <TouchableOpacity activeOpacity={0.9} style={styles.accountRow}>
      <View style={[styles.iconCircle, { backgroundColor: item.iconColor }]}>
        <Text style={styles.iconInitials}>{item.title.charAt(0)}</Text>
      </View>
      <View style={styles.accountTextWrapper}>
        <Text style={styles.accountTitle}>{item.title}</Text>
        <Text style={styles.accountDescription}>{item.description}</Text>
      </View>
      <SvgRightArrowSvg width={responsiveWidth(4)} height={responsiveWidth(4)} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <CustomStatusBar />
      <ImageBackground source={bgTokenImg} style={styles.backgroundImage}>
        <CustomHeader heading="Settings" navigation={navigation} />

        <Text style={styles.sectionHeading}>Account settings</Text>
        <FlatList
          data={accountSettings}
          renderItem={renderAccountItem}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />

        <Text style={[styles.sectionHeading, styles.moreOptionsHeading]}>
          More options
        </Text>

        <View style={styles.optionRow}>
          <Text style={styles.optionTitle}>Text messages</Text>
          <Switch
            trackColor={{ false: COLORS.lightBlack3, true: COLORS.greeen2 }}
            thumbColor={COLORS.white}
            value={textMessages}
            onValueChange={setTextMessages}
          />
        </View>

        <View style={styles.optionRow}>
          <Text style={styles.optionTitle}>Phone calls</Text>
          <Switch
            trackColor={{ false: COLORS.lightBlack3, true: COLORS.greeen2 }}
            thumbColor={COLORS.white}
            value={phoneCalls}
            onValueChange={setPhoneCalls}
          />
        </View>

        {moreOptions.map(item => (
          <TouchableOpacity key={item.id} activeOpacity={0.8} style={styles.moreOptionRow}>
            <Text style={styles.optionTitle}>{item.title}</Text>
            <View style={styles.valueWrapper}>
              <Text style={styles.optionValue}>{item.value}</Text>
              <SvgRightArrowSvg
                width={responsiveWidth(3.5)}
                height={responsiveWidth(3.5)}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ImageBackground>
    </View>
  );
}

export default SettingsPage;

const styles = StyleSheet.create({
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
  sectionHeading: {
    color: COLORS.white,
    fontFamily: FONTS.poppins.semiBold,
    fontSize: responsiveFontSize(2.2),
    marginTop: responsiveHeight(3),
    marginBottom: responsiveHeight(2),
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsiveHeight(1.8),
  },
  iconCircle: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsiveWidth(4),
  },
  iconInitials: {
    color: COLORS.white,
    fontFamily: FONTS.inter['semiBold[600]'],
  },
  accountTextWrapper: {
    flex: 1,
  },
  accountTitle: {
    color: COLORS.white,
    fontFamily: FONTS.inter['semiBold[600]'],
    fontSize: responsiveFontSize(2),
  },
  accountDescription: {
    color: COLORS.white2gray,
    fontFamily: FONTS.inter['regular[400]'],
    fontSize: responsiveFontSize(1.7),
    marginTop: responsiveHeight(0.2),
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  moreOptionsHeading: {
    marginTop: responsiveHeight(4),
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: responsiveHeight(1.5),
  },
  optionTitle: {
    color: COLORS.white,
    fontFamily: FONTS.inter['regular[400]'],
    fontSize: responsiveFontSize(1.9),
  },
  moreOptionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: responsiveHeight(1.5),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  valueWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(2),
  },
  optionValue: {
    color: COLORS.white2gray,
    fontFamily: FONTS.inter['regular[400]'],
    fontSize: responsiveFontSize(1.8),
  },
});

import React from 'react';
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomStatusBar from '../../Components/common/CustomStatusBar';
import CustomHeader from '../../Components/common/CustomHeader';
import { Navigation } from '../../global/types';
import { gradientPng, MedicalRecordImage } from '../../assets/assets';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { COLORS, FONTS } from '../../global/theme';
import CustomGButton from '../../Components/common/CustomGButton';

interface MedicalRecordPageProps {
  navigation?: Navigation;
}

interface MedicalRecord {
  id: number;
  dateLabel: string;
  monthLabel: string;
  title: string;
  subtitle: string;
  prescriptions: string;
  tag?: string;
}

const mockRecords: MedicalRecord[] = [
  {
    id: 1,
    dateLabel: '27',
    monthLabel: 'FEB',
    title: 'Records added by you',
    subtitle: 'Record for Luke',
    prescriptions: '1 Prescription',
    tag: 'NEW',
  },
  {
    id: 2,
    dateLabel: '28',
    monthLabel: 'FEB',
    title: 'Records added by you',
    subtitle: 'Record for Sara Doe',
    prescriptions: '1 Prescription',
  },
  {
    id: 3,
    dateLabel: '01',
    monthLabel: 'MAR',
    title: 'Records added by your doctor',
    subtitle: 'Record for Robert',
    prescriptions: '1 Prescription',
  },
];

interface MedicalRecordState {
  records: MedicalRecord[];
}

class MedicalRecordPage extends React.Component<
  MedicalRecordPageProps,
  MedicalRecordState
> {
  constructor(props: MedicalRecordPageProps) {
    super(props);
    this.state = {
      records: mockRecords,
    };
  }

  handleAddRecord = () => {
    // Hook for future navigation / logic
  };

  renderEmptyState = () => (
    <View style={styles.contentWrapper}>
      <View style={styles.circleWrapper}>
        <MedicalRecordImage
          width={responsiveWidth(25)}
          height={responsiveWidth(25)}
        />
      </View>

      <Text style={styles.title}>Add a medical record.</Text>
      <Text style={styles.description}>
        A detailed health history helps a doctor diagnose you better.
      </Text>

      <CustomGButton
        tittle="Add a record"
        style={styles.ctaButton}
        onPress={this.handleAddRecord}
      />
    </View>
  );

  renderRecordCard = (record: MedicalRecord, isActive: boolean) => (
    <View
      key={record.id}
      style={[styles.recordCard, isActive && styles.recordCardActive]}
    >
      <View style={[styles.dateBadge, isActive && styles.dateBadgeActive]}>
        <Text style={styles.dateText}>{record.dateLabel}</Text>
        <Text style={styles.monthText}>{record.monthLabel}</Text>
      </View>

      <View style={styles.recordContent}>
        <Text style={styles.recordTitle}>{record.title}</Text>
        <Text style={styles.recordSubtitle}>{record.subtitle}</Text>
        <Text style={styles.recordPrescription}>{record.prescriptions}</Text>
      </View>

      <Text style={styles.menuDots}>⋮</Text>
      {record.tag && (
        <View style={styles.tagBadge}>
          <Text style={styles.tagText}>{record.tag}</Text>
        </View>
      )}
    </View>
  );

  renderRecordList = () => {
    const { records } = this.state;
    return (
      <View style={styles.recordsWrapper}>
        <View>
          <FlatList
            data={records}
            renderItem={({ item, index }) =>
              this.renderRecordCard(item, index === 1)
            }
          />
        </View>
        <View style={styles.recordActions}>
          <CustomGButton
            isGray
            tittle="View all records"
            style={styles.actionButton}
            onPress={this.handleAddRecord}
          />
          <CustomGButton
            tittle="Add a new record"
            style={styles.actionButton}
            onPress={this.handleAddRecord}
          />
        </View>
      </View>
    );
  };

  render() {
    const hasRecords = this.state.records.length > 0;
    return (
      <View style={styles.mainContainer}>
        <CustomStatusBar />
        <ImageBackground
          source={gradientPng}
          style={styles.image}
          imageStyle={styles.imageStyle}
        >
          <CustomHeader
            heading="Medical Record"
            navigation={this.props.navigation}
            isIcon
          />
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {hasRecords ? this.renderRecordList() : this.renderEmptyState()}
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

export default MedicalRecordPage;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  image: {
    flex: 1,
    width: responsiveScreenWidth(100),
    paddingVertical: responsiveHeight(3),
    paddingHorizontal: responsiveScreenWidth(5),
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: responsiveHeight(6),
  },
  container: {
    flex: 1,
  },
  contentWrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    gap: responsiveHeight(1),
  },
  recordsWrapper: {
    width: '100%',
    gap: responsiveHeight(2),
    flex: 1,
    justifyContent: 'space-between',
  },
  circleWrapper: {
    width: responsiveWidth(50),
    height: responsiveWidth(50),
    borderRadius: responsiveWidth(25),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(34, 35, 56, 0.8)',
  },

  title: {
    fontFamily: FONTS.poppins.bold,
    fontSize: responsiveFontSize(3),
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: responsiveHeight(1),
  },
  description: {
    fontFamily: FONTS.inter['regular[400]'],
    fontSize: responsiveFontSize(1.9),
    color: COLORS.white2gray,
    textAlign: 'center',
    lineHeight: responsiveHeight(3),
    marginBottom: responsiveHeight(4),
    paddingHorizontal: responsiveWidth(5),
  },
  ctaButton: {
    width: responsiveWidth(70),
    borderRadius: responsiveWidth(3),
  },
  alertButton: {
    marginLeft: responsiveWidth(4),
  },
  alertGradient: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordCard: {
    backgroundColor: '#1F1F2E',
    borderRadius: responsiveWidth(3.5),
    padding: responsiveWidth(4),
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: responsiveWidth(3),
    position: 'relative',
    marginTop: responsiveHeight(1.5),
  },
  recordCardActive: {
    borderWidth: 1,
    borderColor: COLORS.greeen1,
  },
  dateBadge: {
    width: responsiveWidth(14),
    backgroundColor: COLORS.greeen1,
    borderRadius: responsiveWidth(3),
    alignItems: 'center',
    paddingVertical: responsiveHeight(1),
  },
  dateBadgeActive: {
    borderColor: COLORS.white,
    borderWidth: 1,
  },
  dateText: {
    color: COLORS.white,
    fontFamily: FONTS.poppins.bold,
    fontSize: responsiveFontSize(2.1),
  },
  monthText: {
    color: COLORS.white,
    fontFamily: FONTS.inter['regular[400]'],
    fontSize: responsiveFontSize(1.5),
  },
  recordContent: {
    flex: 1,
  },
  recordTitle: {
    color: COLORS.white,
    fontFamily: FONTS.poppins.semiBold,
    fontSize: responsiveFontSize(2),
  },
  recordSubtitle: {
    color: COLORS.greeen1,
    fontFamily: FONTS.inter['regular[400]'],
    fontSize: responsiveFontSize(1.8),
    marginTop: responsiveHeight(0.5),
  },
  recordPrescription: {
    color: COLORS.white2gray,
    fontFamily: FONTS.inter['regular[400]'],
    fontSize: responsiveFontSize(1.6),
    marginTop: responsiveHeight(0.8),
  },
  menuDots: {
    color: COLORS.white2gray,
    fontSize: responsiveFontSize(3),
  },
  tagBadge: {
    position: 'absolute',
    bottom: responsiveHeight(-2),
    left: responsiveWidth(3),
    backgroundColor: '#0D1F23',
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(0.7),
    borderRadius: responsiveWidth(2),
  },
  tagText: {
    color: COLORS.white,
    fontFamily: FONTS.inter['medium[500]'],
    fontSize: responsiveFontSize(1.4),
  },
  recordActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: responsiveWidth(4),
    marginTop: responsiveHeight(2),
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#5E6287',
    paddingVertical: responsiveHeight(1.5),
    borderRadius: responsiveWidth(3),
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: COLORS.white,
    fontFamily: FONTS.inter['medium[500]'],
  },
  actionButton: {
    flex: 1,
    borderRadius: responsiveWidth(3),
  },
});

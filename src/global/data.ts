import {
  BodySvg,
  DentalSvg,
  Doctor1Svg,
  DrStrainSvg,
  EyeSvg,
  HeartSvg,
  OnBoarding1Svg,
  OnBoarding2Svg,
  OnBoarding3Svg,
  gradient1Png,
  gradient2Png,
  gradient3Png,
  gradient4Png,
  imageProfile1,
  imageProfile2,
  imageProfile3,
  imageProfile4,
  imageProfile5,
  imageProfile6,
  pharmcy1,
  pharmcy2,
} from '../assets/assets';
import {
  CommonDeseaseData,
  DoctorData,
  YourAppointmentsData,
  MedicalStoreData,
  QualifiedDoctorData,
  SlotsDateTimes,
  SlotsAvailable,
} from './types';

// onBoarding data source
export const OnboardingData = [
  {
    id: 1,
    isBgOn1Png: true,
    title: 'Find Qualified Doctors',
    description:
      'VHA conducts third party background checks for the doctors and chemist stores before getting them on-board. VHA has its own compliance team to monitor and ensure everything is complying with the regulations',
    Svg: OnBoarding1Svg,
  },
  {
    id: 2,
    isBgOn1Png: false,
    title: 'Choose Best Chemist',
    description:
      'VHA’s partnered Chemists have the Biggest Range & Best Discount Prices on all Supplements, Prescription Medicines & Health Products',
    Svg: OnBoarding2Svg,
  },
  {
    id: 3,
    isBgOn1Png: true,
    title: 'Easy Appointments',
    description:
      'Find an Online Doctor and book a Virtual or Physical appointment instantly. 1000s of appointments with trusted practitioners available every day',
    Svg: OnBoarding3Svg,
  },
];

// doctor near your location
export const doctorData: DoctorData[] = [
  {
    id: 1,
    name: 'Dr Whisker',
    isAvailable: true,
    imageUrl: Doctor1Svg,
  },
  {
    id: 2,
    name: 'Dr Lilly Doe',
    isAvailable: false,
    imageUrl: OnBoarding1Svg,
  },
  {
    id: 3,
    name: 'Dr Emma Smith',
    isAvailable: true,
    imageUrl: OnBoarding3Svg,
  },
  {
    id: 4,
    name: 'Dr. Crick',
    isAvailable: true,
    imageUrl: DrStrainSvg,
  },
  {
    id: 5,
    name: 'Dr. Pediatrician',
    isAvailable: false,
    imageUrl: OnBoarding2Svg,
  },
];

// common desease data
export const commonDeseaseData: CommonDeseaseData[] = [
  {
    id: 1,
    backgroudImage: gradient1Png,
    image: DentalSvg,
    title: 'Dental',
  },
  {
    id: 2,
    backgroudImage: gradient2Png,
    image: HeartSvg,
    title: 'Heart',
  },
  {
    id: 3,
    backgroudImage: gradient3Png,
    image: EyeSvg,
    title: 'Eye',
  },
  {
    id: 4,
    backgroudImage: gradient4Png,
    image: BodySvg,
    title: 'Body',
  },
];

// appointment static data
export const yourAppointmentsData: YourAppointmentsData[] = [
  {
    id: 1,
    rating: 4.8,
    degree: 'B.D.S|M.B.B.S',
    name: 'Dr. John Smith',
    experience: 7,
    views: 275,
    available: '10AM tomorrow',
    image: imageProfile1,
    isFaveritiated: false,
  },
  {
    id: 2,
    available: '12AM tomorrow',
    degree: 'B.D.S|M.B.S',
    experience: 9,
    image: imageProfile2,
    name: 'Dr. Watamaniuk',
    rating: 3.5,
    views: 3475,
    isFaveritiated: true,
  },
  {
    id: 3,
    available: '11AM tomorrow',
    degree: 'B.D.S|M.B.S',
    experience: 10,
    image: imageProfile3,
    name: 'Dr. Julie Will',
    rating: 4.5,
    views: 4475,
    isFaveritiated: true,
  },
  {
    id: 4,
    available: '1PM tomorrow',
    degree: 'B.D.S|M.B.S',
    experience: 2,
    image: imageProfile4,
    name: 'Dr. Crownover',
    rating: 4.1,
    views: 1475,
    isFaveritiated: false,
  },
  {
    id: 5,
    available: '4PM tomorrow',
    degree: 'B.D.S|M.B.S',
    experience: 5,
    image: imageProfile5,
    name: 'Dr. Balestra',
    rating: 4.3,
    views: 475,
    isFaveritiated: false,
  },
];

// medical store data

export const medicalStoreData: MedicalStoreData[] = [
  {
    id: 1,
    rating: 4.8,
    name: 'Chemist Warehouse',
    image: pharmcy1,
    subTitle: 'Medical Store',
  },
  {
    id: 2,
    rating: 3.8,
    name: 'CVS Pharmacy',
    image: pharmcy2,
    subTitle: 'Medical Store',
  },
];

// qualified doctor data static data
export const qualifiedDoctorData: QualifiedDoctorData[] = [
  {
    id: 1,
    rating: 3.7,
    degree: 'B.D.S|M.B.B.S',
    name: 'Dr. Crick',
    experience: 7,
    views: 275,
    available: '10AM tomorrow',
    image: imageProfile4,
    isFaveritiated: false,
    fees: 25.0,
  },
  {
    id: 2,
    available: '12AM tomorrow',
    degree: 'B.D.S|M.B.S',
    experience: 9,
    image: imageProfile6,
    name: 'Dr. Strain',
    rating: 3.0,
    views: 3475,
    isFaveritiated: true,
    fees: 22.0,
  },
  {
    id: 3,
    available: '11AM tomorrow',
    degree: 'B.D.S|M.B.S',
    experience: 10,
    image: imageProfile5,
    name: 'Dr. Lachinet',
    rating: 2.9,
    views: 4475,
    isFaveritiated: false,
    fees: 29.0,
  },
  {
    id: 4,
    available: '1PM tomorrow',
    degree: 'B.D.S|M.B.S',
    experience: 10,
    image: imageProfile1,
    name: 'Dr. Crownover',
    rating: 4.3,
    views: 1475,
    isFaveritiated: true,
    fees: 20.0,
  },
  {
    id: 5,
    available: '4PM tomorrow',
    degree: 'B.D.S|M.B.S',
    experience: 5,
    image: imageProfile2,
    name: 'Dr. Balestra',
    rating: 3.3,
    views: 475,
    isFaveritiated: false,
    fees: 27.0,
  },
];

export const slotsDateTimes: SlotsDateTimes[] = [
  {
    id: 1,
    date: 'Today, 23 Feb',
    slotsAvailable: 0,
    isSelected: false,
  },
  {
    id: 2,
    date: 'Tomorrow, 24 Feb',
    slotsAvailable: 9,
    isSelected: true,
  },
  {
    id: 3,
    date: 'Thu, 25 Feb',
    slotsAvailable: 8,
    isSelected: false,
  },
];

export const slotsAvailable: SlotsAvailable[] = [
  {
    date: 'Afternoon 7 slots',
    slots: [
      '1:00 PM',
      '1:30 PM',
      '2:00 PM',
      '2:30 PM',
      '3:00 PM',
      '3:30 PM',
      '4:00 PM',
    ],
  },
  {
    date: 'Evening 5 slots',
    slots: ['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM'],
  },
];

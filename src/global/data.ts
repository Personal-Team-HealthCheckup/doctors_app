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
} from '../assets/assets';
import {CommonDeseaseData, DoctorData} from './types';

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

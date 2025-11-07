import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import OnBoardingConnected from '../../../../src/screen/auth/OnBoarding';
import { OnboardingData } from '../../../../src/global/data';
import { AUTH } from '../../../../src/Constants/Navigator';

jest.mock('../../../../src/assets/assets', () => ({
  bgOn1Png: { uri: 'bg1' },
  bgOn2Png: { uri: 'bg2' },
  OnBoarding1Svg: 'OnBoarding1Svg',
  OnBoarding2Svg: 'OnBoarding2Svg',
  OnBoarding3Svg: 'OnBoarding3Svg',
}));

jest.mock('../../../../src/Components/common/CustomStatusBar', () => 'CustomStatusBar');
jest.mock('../../../../src/Components/common/CustomMainView', () => 'CustomMainView');
jest.mock('../../../../src/Components/common/CustomGButton', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return ({ tittle, onPress }: { tittle: string; onPress: () => void }) => (
    <Text onPress={onPress} accessibilityRole="button">
      {tittle}
    </Text>
  );
});

jest.mock('react-native-responsive-dimensions', () => ({
  responsiveHeight: (val: number) => val,
  responsiveScreenWidth: (val: number) => val,
}));

jest.mock('../../../../src/helper/Scale', () => ({
  moderateScale: (val: number) => val,
}));

const OnBoarding = (OnBoardingConnected as any).WrappedComponent || OnBoardingConnected;

const createNavigation = () => ({
  navigate: jest.fn(),
  replace: jest.fn(),
});

describe('OnBoarding screen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the initial slide data and next button label', () => {
    const navigation = createNavigation();
    const { getByText } = render(<OnBoarding navigation={navigation} />);

    expect(getByText(OnboardingData[0].title)).toBeTruthy();
    expect(getByText(OnboardingData[0].description)).toBeTruthy();
    expect(getByText('Next')).toBeTruthy();
  });

  it('advances through slides and triggers replace when finished', () => {
    const navigation = createNavigation();
    const { getByText } = render(<OnBoarding navigation={navigation} />);

    fireEvent.press(getByText('Next'));
    expect(getByText(OnboardingData[1].title)).toBeTruthy();

    fireEvent.press(getByText('Next'));
    expect(getByText(OnboardingData[2].title)).toBeTruthy();
    const getStartedButton = getByText('Get Started');
    expect(getStartedButton).toBeTruthy();

    fireEvent.press(getStartedButton);
    expect(navigation.replace).toHaveBeenCalledWith(AUTH.SIGNIN);
  });

  it('skips onboarding when Skip is pressed', () => {
    const navigation = createNavigation();
    const { getByText } = render(<OnBoarding navigation={navigation} />);

    fireEvent.press(getByText('Skip'));
    expect(navigation.replace).toHaveBeenCalledWith(AUTH.SIGNIN);
  });
});

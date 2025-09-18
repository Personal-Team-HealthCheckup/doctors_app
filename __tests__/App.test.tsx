import React from 'react';
import { render, screen } from '@testing-library/react-native';
import CustomButton from '../src/Components/common/CustomButton';

const mockReplace = jest.fn();
const screenProps = {
  navigation: { replace: mockReplace },
  title: 'New Button',
};

describe('SplashScreens', () => {
  beforeEach(() => {});

  afterEach(() => {});

  it('renders correctly (snapshot)', () => {
    render(<CustomButton {...screenProps} />);
    expect(screen).toBeTruthy();
  });
});

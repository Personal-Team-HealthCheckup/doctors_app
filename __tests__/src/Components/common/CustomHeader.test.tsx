import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import CustomHeader from '../../../../src/Components/common/CustomHeader';
import { mockNavigation } from '../../../../__mocks__/mock';
const screenProps = {
  heading: 'New Button',
  isIcon: false,
  isShowSearchIcon: false,
  isShowNotificationIcon: false,
  navigation: mockNavigation,
};

const screenProps1 = {
  heading: undefined,
  isIcon: true,
  isShowSearchIcon: true,
  isShowNotificationIcon: true,
  navigation: mockNavigation,
};

describe('CustomHeader', () => {
  it('renders correctly (snapshot)', () => {
    render(<CustomHeader {...screenProps} />);
    expect(screen).toBeTruthy();
  });

  it('renders correctly and press on back button', () => {
    render(<CustomHeader {...screenProps} />);
    const backButton = screen.getByTestId('back-button');
    fireEvent.press(backButton);
    expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);
  });

  it('renders correctly and press on search button', () => {
    render(<CustomHeader {...screenProps1} />);
    const searchButton = screen.getByTestId('search-button');
    fireEvent.press(searchButton);
    expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
  });
});

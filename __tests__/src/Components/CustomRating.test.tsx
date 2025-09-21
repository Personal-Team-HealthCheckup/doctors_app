import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import CustomRating from '../../../src/Components/CustomRating';
const screenProps = {
  isDisable: true,
  initialValue: 12,
  onChange: jest.fn(),
  iconSize: 12,
  testID: 'custom-rating',
};
const screenProps2 = {
  initialValue: 12,
};

describe('CustomRating', () => {
  it('renders correctly (snapshot)', () => {
    render(<CustomRating {...screenProps} />);
    expect(screen).toBeTruthy();
  });
  it('renders correctly change the rating it will not change as it is disabled', () => {
    render(<CustomRating {...screenProps} />);
    expect(screen).toBeTruthy();
    const ratingButton = screen.getByTestId('custom-rating-1');
    fireEvent.press(ratingButton);
    expect(screenProps.onChange).toHaveBeenCalledTimes(0);
  });
  it('renders correctly change the rating it will not change as it is disabled', () => {
    const props = { ...screenProps, isDisable: false };
    render(<CustomRating {...props} />);
    expect(screen).toBeTruthy();
    const ratingButton = screen.getByTestId('custom-rating-1');
    fireEvent.press(ratingButton);
    expect(screenProps.onChange).toHaveBeenCalledTimes(1);
  });
  it('renders correctly (snapshot) with default props', () => {
    render(<CustomRating {...screenProps2} />);
    expect(screen).toBeTruthy();
  });
});

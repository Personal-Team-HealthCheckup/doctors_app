import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { mockNavigation } from '../../../../__mocks__/mock';
import DoctorDetailsPage from '../../../../src/screen/home/DoctorDetailsScreen';

const screenProps = {
  navigation: mockNavigation,
};

describe('DoctorDetailsPage', () => {
  it('renders correctly (snapshot)', () => {
    render(<DoctorDetailsPage {...screenProps} />);
    expect(screen).toBeTruthy();
  });
  it('renders Next button', () => {
    render(<DoctorDetailsPage {...screenProps} />);
    const nextButton = screen.getByTestId('button-slots');
    fireEvent.press(nextButton);
    expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
  });
});

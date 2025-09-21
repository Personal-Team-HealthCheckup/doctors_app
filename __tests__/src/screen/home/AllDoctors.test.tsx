import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import AllDoctors from '../../../../src/screen/home/AllDoctors';
import { mockNavigation } from '../../../../__mocks__/mock';
import { AllDoctorsData } from '../../../../src/global/data';

const screenProps = {
  navigation: mockNavigation,
};

describe('AllDoctors', () => {
  it('renders correctly (snapshot)', () => {
    render(<AllDoctors {...screenProps} />);
    expect(screen).toBeTruthy();
  });
  it('renders correctly with flatlist and click on any of the doctors', () => {
    render(<AllDoctors {...screenProps} />);
    const flatList = screen.getByTestId('flat-list-doctor-details');
    render(flatList.props.renderItem({ item: AllDoctorsData[0], index: 1 }));
    const doctorDetailCard = screen.getByTestId('doctor-detail-card');
    fireEvent.press(doctorDetailCard);
    expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
  });
});

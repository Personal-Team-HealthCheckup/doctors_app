import React from 'react';
import { render, screen } from '@testing-library/react-native';
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
});

import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { mockNavigation } from '../../../../__mocks__/mock';
import MedicalRecordPage from '../../../../src/screen/home/MedicalRecordPage';

const screenProps = {
  navigation: mockNavigation,
};

describe('MedicalRecordPage', () => {
  it('renders correctly (snapshot)', () => {
    render(<MedicalRecordPage {...screenProps} />);
    expect(screen).toBeTruthy();
  });
});

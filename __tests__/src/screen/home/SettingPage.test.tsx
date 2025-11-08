import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { mockNavigation } from '../../../../__mocks__/mock';
import SettingsPage from '../../../../src/screen/home/SettingsPage';

const screenProps = {
  navigation: mockNavigation,
};

describe('SettingsPage', () => {
  it('renders correctly (snapshot)', () => {
    render(<SettingsPage {...screenProps} />);
    expect(screen).toBeTruthy();
  });
});

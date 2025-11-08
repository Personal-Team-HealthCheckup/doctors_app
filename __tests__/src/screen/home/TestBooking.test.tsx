import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { mockNavigation } from '../../../../__mocks__/mock';
import TestBooking from '../../../../src/screen/home/TestBooking';
import * as Utilities from '../../../../src/helper/utilities';

const screenProps = {
  navigation: mockNavigation,
};

describe('TestBooking', () => {
  it('renders correctly (snapshot)', () => {
    render(<TestBooking {...screenProps} />);
    expect(screen).toBeTruthy();
  });
  it('click on go home button', () => {
    const { getByTestId } = render(<TestBooking {...screenProps} />);
    const btnGoBack = getByTestId('btnGoBack');
    fireEvent.press(btnGoBack);
    const navigateTo = jest.spyOn(Utilities, 'navigateTo');
    expect(navigateTo).toHaveBeenCalledTimes(0);
  });
});

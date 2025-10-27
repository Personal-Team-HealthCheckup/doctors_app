import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Header from '../../../../src/Components/common/Header';
import { DASHBOARD } from '../../../../src/Constants/Navigator';

jest.mock('../../../../src/assets/assets', () => ({
  OnBoarding1Svg: jest.fn(() => null),
  LightSvg: jest.fn(() => null),
  SearchSvg: jest.fn(() => null),
  NotificationBellSvg: jest.fn(() => null),
}));

describe('Header component', () => {
  const navigateTo = jest.fn();
  const toggleDrawer = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders icons and responds to interactions', () => {
    const { getByTestId } = render(
      <Header navigateTo={navigateTo} toggleDrawer={toggleDrawer} />,
    );

    fireEvent.press(getByTestId('header-drawer-button'));
    expect(toggleDrawer).toHaveBeenCalledTimes(1);

    fireEvent.press(getByTestId('header-light-button'));
    expect(navigateTo).not.toHaveBeenCalled();

    fireEvent.press(getByTestId('header-search-button'));
    expect(navigateTo).toHaveBeenCalledWith(DASHBOARD.SEARCHPAGE);
  });
});

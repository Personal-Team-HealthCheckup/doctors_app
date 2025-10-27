import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import CustomHeading from '../../../../src/Components/common/CustomHeading';
import { SvgRightArrowSvg } from '../../../../src/assets/assets';

jest.mock('../../../../src/assets/assets', () => ({
  ...jest.requireActual('../../../../src/assets/assets'),
  SvgRightArrowSvg: jest.fn(() => null),
}));

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');

describe('CustomHeading', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders title and see all button', () => {
    const { getByText } = render(
      <CustomHeading title="Featured Doctors" isIcon />,
    );

    expect(getByText('Featured Doctors')).toBeTruthy();
    expect(getByText('See all')).toBeTruthy();
    expect(SvgRightArrowSvg).toHaveBeenCalled();
  });

  it('invokes onPressSeeAll callback', () => {
    const onPressSeeAll = jest.fn();
    const { getByText } = render(
      <CustomHeading title="Nearby Clinics" onPressSeeAll={onPressSeeAll} />,
    );

    fireEvent.press(getByText('See all'));
    expect(onPressSeeAll).toHaveBeenCalledTimes(1);
  });
});

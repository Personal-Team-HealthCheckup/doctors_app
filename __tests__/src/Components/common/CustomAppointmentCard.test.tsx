import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import CustomAppointmentCard from '../../../../src/Components/common/CustomAppointmentCard';
import { View as MockView } from 'react-native';
import { AllDoctorsData } from '../../../../src/global/data';
import { HeartImg, HeartRedImg } from '../../../../src/assets/assets';
const screenProps = {
  item: AllDoctorsData[0],
  yourAppointmentsData: [],
  navigateTo: jest.fn(),
};

jest.mock('../../../../src/assets/assets', () => ({
  LightSvg: (props: {}) => <MockView {...props} />,
  NotificationBellSvg: (props: {}) => <MockView {...props} />,
  SearchSvg: (props: {}) => <MockView {...props} />,
}));

describe('CustomHeader', () => {
  it('renders correctly (snapshot)', () => {
    render(<CustomAppointmentCard {...screenProps} />);
    expect(screen).toBeTruthy();
  });

  it('renders correctly  and click on rechedule button', () => {
    render(<CustomAppointmentCard {...screenProps} />);
    expect(screen).toBeTruthy();
    const rescheduleButton = screen.getByTestId(
      'custom-appointment-card-button',
    );
    fireEvent.press(rescheduleButton);
    expect(screenProps.navigateTo).toHaveBeenCalledTimes(1);
  });
  it('renders correctly  and try to change the rating', () => {
    render(<CustomAppointmentCard {...screenProps} />);
    expect(screen).toBeTruthy();
    const ratingButton = screen.getByTestId('custom-rating-1');
    fireEvent.press(ratingButton);
  });
  it('renders correctly and click on like button', () => {
    const screenPorps2 = {
      ...screenProps,
      yourAppointmentsData: AllDoctorsData,
    };
    render(<CustomAppointmentCard {...screenPorps2} />);
    expect(screen).toBeTruthy();
    const likeButton = screen.getByTestId('like-button');
    const likeImage = screen.getByTestId('like-image');
    expect(likeImage.props.source).toEqual(HeartRedImg);
    fireEvent.press(likeButton);
    expect(likeImage.props.source).toEqual(HeartImg);
  });
});

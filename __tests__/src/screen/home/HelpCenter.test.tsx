import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { mockNavigation } from '../../../../__mocks__/mock';
import HelpCenterPage from '../../../../src/screen/home/HelpCenter';

const screenProps = {
  navigation: mockNavigation,
};

describe('HelpCenterPage', () => {
  it('renders correctly (snapshot)', () => {
    render(<HelpCenterPage {...screenProps} />);
    expect(screen).toBeTruthy();
  });
  it('renders Next button', () => {
    const mainContainer = render(<HelpCenterPage {...screenProps} />);
    const helpTopics = [
      {
        title: 'Booking a new Appointment',
        id: 1,
        description:
          'Stuck while trying to schedule a consultation? Tell us where you got held up and we will guide you through confirming the slot.',
        isSelected: true,
      },
    ];
    const listHelpCenter = mainContainer.getByTestId('listHelpCenter');
    const container = render(
      listHelpCenter.props.renderItem({ item: helpTopics[0] }),
    );
    const btnClickItem = container.getByTestId('btnClickItem');
    fireEvent.press(btnClickItem);
    const questAnwer = container.getByTestId('viewDesc');
    expect(questAnwer).toBeEnabled();
  });
});

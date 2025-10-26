import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import DrawerComponent from '../../../src/Components/DrawerComponent';

jest.mock('@react-navigation/drawer', () => ({
  useDrawerStatus: jest.fn(() => 'open'),
}));

jest.mock('../../../src/helper/authKeychain', () => ({
  clearStoredAuthToken: jest.fn().mockResolvedValue(undefined),
}));

const navigationMock = {
  dispatch: jest.fn(),
  navigate: jest.fn(),
  closeDrawer: jest.fn(),
  getParent: jest.fn(),
};

const drawerState = {
  type: 'drawer',
  key: 'drawer-key',
  routeNames: ['Home'],
  index: 0,
  stale: false,
  routes: [{ key: 'home', name: 'Home' }],
  history: [],
};

const { clearStoredAuthToken } = require('../../../src/helper/authKeychain');

const setMockReduxState = (state: unknown) =>
  (global as any).__setMockReduxState(state);
const getMockReduxDispatch = () => (global as any).__getMockReduxDispatch();

describe('DrawerComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setMockReduxState({
      Auth: {
        user: {
          fullName: 'Olivia Doe',
          phoneNumber: '01303-527300',
          email: 'olivia@example.com',
        },
      },
    });
  });

  afterEach(() => {
    setMockReduxState({ Auth: {} });
  });

  it('renders persisted user profile info', () => {
    const { getByText } = render(
      <DrawerComponent state={drawerState as any} navigation={navigationMock as any} />,
    );

    expect(getByText('Olivia Doe')).toBeTruthy();
    expect(getByText('01303-527300')).toBeTruthy();
  });

  it('invokes logout flow when confirmed', async () => {
    const alertSpy = jest
      .spyOn(Alert, 'alert')
      .mockImplementation(
        (
          _title,
          _message,
          buttons?: Array<{ text: string; onPress?: () => void }>,
        ) => {
          buttons?.find(button => button.text === 'Logout')?.onPress?.();
          return 1;
        },
      );

    const { getByText } = render(
      <DrawerComponent state={drawerState as any} navigation={navigationMock as any} />,
    );

    fireEvent.press(getByText('Logout'));

    await waitFor(() => {
      expect(clearStoredAuthToken).toHaveBeenCalled();
    });

    const dispatch = getMockReduxDispatch();
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: expect.stringContaining('actionLogout') }),
    );
    expect(navigationMock.dispatch).toHaveBeenCalled();
    alertSpy.mockRestore();
  });
});

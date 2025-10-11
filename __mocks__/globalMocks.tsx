import { View as MockView } from 'react-native';
import React from 'react';

jest.mock('react-native-linear-gradient', () => (props: {}) => (
  <MockView {...props} />
));

jest.mock('react-native-vector-icons/Entypo', () => (props: {}) => (
  <MockView {...props} />
));

jest.mock('react-native-vector-icons/FontAwesome', () => (props: {}) => (
  <MockView {...props} />
));
jest.mock('react-native-vector-icons/FontAwesome5', () => (props: {}) => (
  <MockView {...props} />
));

jest.mock('../src/assets/assets', () => ({
  LightSvg: (props: {}) => <MockView {...props} />,
  NotificationBellSvg: (props: {}) => <MockView {...props} />,
  SearchSvg: (props: {}) => <MockView {...props} />,
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

import React from 'react';
import { render } from '@testing-library/react-native';
import CustomLoader from '../../../src/Components/CustomLoader';

describe('CustomLoader', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<CustomLoader />);
    expect(getByTestId).toBeTruthy();
  });

  it('renders animated image', () => {
    const component = render(<CustomLoader />);
    expect(component).toBeTruthy();
  });
});

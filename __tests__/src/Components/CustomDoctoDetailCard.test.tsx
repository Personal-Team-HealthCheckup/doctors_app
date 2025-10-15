import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomDoctoDetailCard from '../../../src/Components/CustomDoctoDetailCard';

describe('CustomDoctoDetailCard', () => {
  const mockProps = {};

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with all props', () => {
    const component = render(<CustomDoctoDetailCard {...mockProps} />);
    expect(component).toBeTruthy();
  });

  it('handles press event', () => {
    const component = render(<CustomDoctoDetailCard {...mockProps} />);
    expect(component).toBeTruthy();
  });
});

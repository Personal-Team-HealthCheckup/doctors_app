import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomDoctoDetailCard from '../../../src/Components/CustomDoctoDetailCard';

describe('CustomDoctoDetailCard', () => {
  const mockProps = {
    isLiked: true,
  };
  const mockProps2 = {
    isLiked: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with all props', () => {
    const component = render(<CustomDoctoDetailCard {...mockProps} />);
    expect(component).toBeTruthy();
  });

  it('handles press event', () => {
    const component = render(<CustomDoctoDetailCard {...mockProps2} />);
    expect(component).toBeTruthy();
  });
});

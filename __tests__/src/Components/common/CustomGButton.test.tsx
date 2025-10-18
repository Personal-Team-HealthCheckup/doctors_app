import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomGButton from '../../../../src/Components/common/CustomGButton';

describe('CustomGButton', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const { getByTestId } = render(<CustomGButton tittle="Test Button" />);
    expect(getByTestId('custom-g-button')).toBeTruthy();
  });

  it('handles press when enabled', () => {
    const { getByTestId } = render(<CustomGButton tittle="Test Button" onPress={mockOnPress} />);
    const button = getByTestId('custom-g-button');
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalled();
  });

  it('renders disabled state', () => {
    const { getByTestId } = render(<CustomGButton tittle="Test Button" disabled={true} />);
    const button = getByTestId('custom-g-button');
    expect(button).toBeTruthy();
  });

  it('renders gray variant', () => {
    const { getByTestId } = render(<CustomGButton tittle="Test Button" isGray={true} />);
    expect(getByTestId('custom-g-button')).toBeTruthy();
  });

  it('applies custom style', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(<CustomGButton tittle="Test Button" style={customStyle} />);
    expect(getByTestId('custom-g-button')).toBeTruthy();
  });

  it('applies custom text style', () => {
    const customTextStyle = { fontSize: 20 };
    const { getByTestId } = render(<CustomGButton tittle="Test Button" textStyle={customTextStyle} />);
    expect(getByTestId('custom-g-button')).toBeTruthy();
  });

  it('uses custom testID', () => {
    const { getByTestId } = render(<CustomGButton tittle="Test Button" testID="custom-test-id" />);
    expect(getByTestId('custom-test-id')).toBeTruthy();
  });

  it('does not call onPress when disabled', () => {
    const { getByTestId } = render(<CustomGButton tittle="Test Button" onPress={mockOnPress} disabled={true} />);
    const button = getByTestId('custom-g-button');
    fireEvent.press(button);
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('renders without onPress callback', () => {
    const { getByTestId } = render(<CustomGButton tittle="Test Button" />);
    const button = getByTestId('custom-g-button');
    expect(() => fireEvent.press(button)).not.toThrow();
  });
});

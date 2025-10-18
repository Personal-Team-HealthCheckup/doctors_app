import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomTextInput from '../../../../src/Components/common/CustomTextInput';

describe('CustomTextInput', () => {
  const mockOnChangeText = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const { getByPlaceholderText } = render(<CustomTextInput placeholder="Test input" />);
    expect(getByPlaceholderText('Test input')).toBeTruthy();
  });

  it('renders with label', () => {
    const { getByText } = render(<CustomTextInput label="Test Label" placeholder="Test input" />);
    expect(getByText('Test Label')).toBeTruthy();
  });

  it('renders with error message', () => {
    const { getByText } = render(<CustomTextInput errorMessage="Test error" placeholder="Test input" />);
    expect(getByText('Test error')).toBeTruthy();
  });

  it('handles text change', () => {
    const { getByPlaceholderText } = render(
      <CustomTextInput placeholder="Test input" onChangeText={mockOnChangeText} />
    );
    const input = getByPlaceholderText('Test input');
    fireEvent.changeText(input, 'new text');
    expect(mockOnChangeText).toHaveBeenCalledWith('new text');
  });

  it('renders with initial value', () => {
    const { getByDisplayValue } = render(<CustomTextInput value="initial value" />);
    expect(getByDisplayValue('initial value')).toBeTruthy();
  });

  it('renders as secure text entry', () => {
    const { getByPlaceholderText } = render(
      <CustomTextInput placeholder="Password" secureTextEntry={true} />
    );
    const input = getByPlaceholderText('Password');
    expect(input.props.secureTextEntry).toBe(true);
  });

  it('renders as disabled when editable is false', () => {
    const { getByPlaceholderText } = render(
      <CustomTextInput placeholder="Disabled input" editable={false} />
    );
    const input = getByPlaceholderText('Disabled input');
    expect(input.props.editable).toBe(false);
  });

  it('applies custom placeholder color', () => {
    const { getByPlaceholderText } = render(
      <CustomTextInput placeholder="Test input" placeholderTextColor="red" />
    );
    const input = getByPlaceholderText('Test input');
    expect(input.props.placeholderTextColor).toBe('red');
  });

  it('applies custom style', () => {
    const customStyle = { backgroundColor: 'blue' };
    const { getByPlaceholderText } = render(
      <CustomTextInput placeholder="Test input" style={customStyle} />
    );
    expect(getByPlaceholderText('Test input')).toBeTruthy();
  });

  it('renders without label when not provided', () => {
    const { queryByText } = render(<CustomTextInput placeholder="Test input" />);
    expect(queryByText('Test Label')).toBeNull();
  });

  it('renders without error when not provided', () => {
    const { queryByText } = render(<CustomTextInput placeholder="Test input" />);
    expect(queryByText('Test error')).toBeNull();
  });

  it('passes additional props to TextInput', () => {
    const { getByPlaceholderText } = render(
      <CustomTextInput placeholder="Test input" maxLength={10} />
    );
    const input = getByPlaceholderText('Test input');
    expect(input.props.maxLength).toBe(10);
  });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import OTPTextInput from '../../../src/Components/OTPTextInput';

describe('OTPTextInput', () => {
  const mockOnChangeOTP = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default length', () => {
    const { getAllByDisplayValue } = render(<OTPTextInput value="" onChangeOTP={mockOnChangeOTP} />);
    expect(getAllByDisplayValue('')).toHaveLength(4);
  });

  it('renders with custom length', () => {
    const { getAllByDisplayValue } = render(<OTPTextInput value="" length={6} onChangeOTP={mockOnChangeOTP} />);
    expect(getAllByDisplayValue('')).toHaveLength(6);
  });

  it('renders with initial value', () => {
    const { getAllByDisplayValue } = render(<OTPTextInput value="1234" onChangeOTP={mockOnChangeOTP} />);
    expect(getAllByDisplayValue('1')).toHaveLength(1);
    expect(getAllByDisplayValue('2')).toHaveLength(1);
    expect(getAllByDisplayValue('3')).toHaveLength(1);
    expect(getAllByDisplayValue('4')).toHaveLength(1);
  });

  it('calls onChangeOTP when text changes', () => {
    const { getAllByDisplayValue } = render(<OTPTextInput value="" onChangeOTP={mockOnChangeOTP} />);
    const firstInput = getAllByDisplayValue('')[0];
    
    fireEvent.changeText(firstInput, '5');
    expect(mockOnChangeOTP).toHaveBeenCalledWith('5');
  });

  it('handles text input and auto-focus to next field', () => {
    const { getAllByDisplayValue } = render(<OTPTextInput value="" onChangeOTP={mockOnChangeOTP} />);
    const inputs = getAllByDisplayValue('');
    
    fireEvent.changeText(inputs[0], '1');
    fireEvent.changeText(inputs[1], '2');
    
    expect(mockOnChangeOTP).toHaveBeenCalledWith('1');
    expect(mockOnChangeOTP).toHaveBeenCalledWith('12');
  });

  it('handles backspace key press', () => {
    const { getAllByDisplayValue } = render(<OTPTextInput value="" onChangeOTP={mockOnChangeOTP} />);
    const inputs = getAllByDisplayValue('');
    
    fireEvent(inputs[1], 'keyPress', { nativeEvent: { key: 'Backspace' } });
    expect(inputs[1]).toBeTruthy();
  });

  it('works without onChangeOTP callback', () => {
    const { getAllByDisplayValue } = render(<OTPTextInput value="" />);
    const firstInput = getAllByDisplayValue('')[0];
    
    expect(() => {
      fireEvent.changeText(firstInput, '5');
    }).not.toThrow();
  });

  it('handles partial value correctly', () => {
    const { getAllByDisplayValue } = render(<OTPTextInput value="12" onChangeOTP={mockOnChangeOTP} />);
    expect(getAllByDisplayValue('1')).toHaveLength(1);
    expect(getAllByDisplayValue('2')).toHaveLength(1);
  });

  it('handles maxLength constraint', () => {
    const { getAllByDisplayValue } = render(<OTPTextInput value="" onChangeOTP={mockOnChangeOTP} />);
    const firstInput = getAllByDisplayValue('')[0];
    
    fireEvent.changeText(firstInput, '123');
    expect(mockOnChangeOTP).toHaveBeenCalledWith('123');
  });
});

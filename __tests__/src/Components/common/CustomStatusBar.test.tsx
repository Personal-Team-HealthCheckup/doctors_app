import React from 'react';
import { render } from '@testing-library/react-native';
import CustomStatusBar from '../../../../src/Components/common/CustomStatusBar';

describe('CustomStatusBar', () => {
  it('renders correctly with default props', () => {
    const component = render(<CustomStatusBar />);
    expect(component).toBeTruthy();
  });

  it('renders with custom background color', () => {
    const component = render(<CustomStatusBar backgroundColor="red" />);
    expect(component).toBeTruthy();
  });

  it('renders with scroll enabled', () => {
    const component = render(<CustomStatusBar isScrollEnabled={true} />);
    expect(component).toBeTruthy();
  });

  it('renders with scroll disabled', () => {
    const component = render(<CustomStatusBar isScrollEnabled={false} />);
    expect(component).toBeTruthy();
  });

  it('renders with both props', () => {
    const component = render(<CustomStatusBar backgroundColor="blue" isScrollEnabled={true} />);
    expect(component).toBeTruthy();
  });
});

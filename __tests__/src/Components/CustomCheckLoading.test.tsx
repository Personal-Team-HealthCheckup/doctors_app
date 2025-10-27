import React from 'react';
import { render } from '@testing-library/react-native';
import RightCheckArrow from '../../../src/Components/CustomCheckLoading';

const mockSharedValue = { value: 0 };

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  return {
    ...Reanimated,
    useSharedValue: jest.fn(() => mockSharedValue),
    useAnimatedStyle: jest.fn(callback => callback()),
    withSpring: jest.fn(value => value),
    withDelay: jest.fn((_delay, animation) => animation),
  };
});

const mockPanHandlers: {
  onUpdate?: (event: { translationX: number }) => void;
  onEnd?: () => void;
} = {};

jest.mock('react-native-gesture-handler', () => ({
  Gesture: {
    Pan: jest.fn(() => ({
      onUpdate(cb: (event: { translationX: number }) => void) {
        mockPanHandlers.onUpdate = cb;
        return this;
      },
      onEnd(cb: () => void) {
        mockPanHandlers.onEnd = cb;
        return this;
      },
    })),
  },
  GestureDetector: (props: { children: React.ReactElement }) => {
    const React = require('react');
    return React.cloneElement(props.children, { gesture: mockPanHandlers });
  },
}));

describe('RightCheckArrow component', () => {
  afterEach(() => {
    jest.clearAllMocks();
    mockSharedValue.value = 0;
    mockPanHandlers.onUpdate = undefined;
    mockPanHandlers.onEnd = undefined;
  });

  it('renders the arrow container', () => {
    const { getByTestId } = render(<RightCheckArrow />);
    expect(getByTestId('check-arrow')).toBeTruthy();
  });

  it('invokes completion callback when dragged beyond threshold', () => {
    const onCompleted = jest.fn();
    render(<RightCheckArrow onCompleted={onCompleted} />);

    mockPanHandlers.onUpdate?.({ translationX: 120 });
    mockPanHandlers.onEnd?.();

    expect(onCompleted).toHaveBeenCalledTimes(1);
  });

  it('resets when drag is below threshold', () => {
    const onCompleted = jest.fn();
    render(<RightCheckArrow onCompleted={onCompleted} />);

    mockPanHandlers.onUpdate?.({ translationX: 40 });
    mockPanHandlers.onEnd?.();

    expect(onCompleted).not.toHaveBeenCalled();
    expect(mockSharedValue.value).toBeLessThanOrEqual(40);
  });
});

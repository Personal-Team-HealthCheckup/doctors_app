import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('@react-navigation/drawer', () => ({
  useDrawerProgress: jest.fn(() => ({ value: 0.5 })),
}));

// jest.mock('react-native-reanimated', () => {
//   const React = require('react');
//   const { View } = require('react-native');
//   const interpolate = jest.fn(
//     (
//       value: number,
//       [inputStart, inputEnd]: number[],
//       outputRange: number[],
//     ) => {
//       const ratio =
//         (value - inputStart) /
//         (inputEnd - inputStart <= 0 ? 1 : inputEnd - inputStart);
//       const clamped = Math.max(0, Math.min(1, ratio));
//       const [outputStart, outputEnd] = outputRange;
//       return outputStart + (outputEnd - outputStart) * clamped;
//     },
//   );
//   return {
//     __esModule: true,
//     default: ({ children, style }: any) =>
//       React.createElement(View, { testID: 'animated-view', style }, children),
//     useAnimatedStyle: jest.fn(callback => callback()),
//     interpolate,
//   };
// });

import DrawerGetureWrapper from '../../../src/Components/DrawerGetureWrapper';

describe('DrawerGetureWrapper', () => {
  it('interpolates styles based on drawer progress', () => {
    const { getByTestId } = render(
      <DrawerGetureWrapper>
        <React.Fragment />
      </DrawerGetureWrapper>,
    );

    const view = getByTestId('animated-view');

    expect(view.props.style).toMatchObject([
      { flex: 1 },
      {
        borderBottomStartRadius: 13,
        borderRadius: 13,
        borderTopStartRadius: 13,
        marginTop: 10.5,
        overflow: 'hidden',
        transform: [{ scale: 0.9 }],
      },
    ]);
  });
});

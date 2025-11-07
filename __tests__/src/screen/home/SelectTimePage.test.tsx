import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SelectTimePageConnected from '../../../../src/screen/home/SelectTimePage';
import {
  slotsAvailable as slotsAvailableData,
  slotsDateTimes,
} from '../../../../src/global/data';

jest.mock('../../../../src/assets/assets', () => ({
  gradientPng: { uri: 'gradient' },
  imageProfile3: { uri: 'profile' },
}));

jest.mock(
  '../../../../src/Components/common/CustomStatusBar',
  () => 'CustomStatusBar',
);

jest.mock('../../../../src/Components/common/CustomHeader', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return ({ heading }: { heading: string }) => <Text>{heading}</Text>;
});

jest.mock('../../../../src/Components/CustomRating', () => 'CustomRating');

jest.mock('../../../../src/Components/common/CustomGButton', () => {
  const React = require('react');
  const { Text, TouchableOpacity } = require('react-native');
  return ({ tittle, onPress }: { tittle: string; onPress?: () => void }) => (
    <TouchableOpacity onPress={onPress} accessibilityRole="button">
      <Text>{tittle}</Text>
    </TouchableOpacity>
  );
});

jest.mock('../../../../src/Components/common/CustomButton', () => {
  const React = require('react');
  const { Text, TouchableOpacity } = require('react-native');
  return ({ title, onPress }: { title: string; onPress?: () => void }) => (
    <TouchableOpacity onPress={onPress} accessibilityRole="button">
      <Text>{title}</Text>
    </TouchableOpacity>
  );
});

jest.mock('react-native-linear-gradient', () => {
  const React = require('react');
  return ({ children }: { children: React.ReactNode }) => <>{children}</>;
});

jest.mock('react-native-vector-icons/FontAwesome', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return ({ name }: { name: string }) => <Text>{name}</Text>;
});

jest.mock('react-native-responsive-dimensions', () => ({
  responsiveHeight: (value: number) => value,
  responsiveScreenWidth: (value: number) => value,
  responsiveWidth: (value: number) => value,
}));

jest.mock('../../../../src/helper/Scale', () => ({
  moderateScale: (value: number) => value,
}));

const SelectTimePage =
  (SelectTimePageConnected as any).WrappedComponent || SelectTimePageConnected;

const createNavigation = () => ({
  navigate: jest.fn(),
  goBack: jest.fn(),
});

const buildInstance = () => {
  const instance = new SelectTimePage({
    navigation: createNavigation(),
  } as any);
  instance.setState = updater => {
    const change =
      typeof updater === 'function'
        ? updater(instance.state, instance.props)
        : updater;
    if (change) {
      instance.state = { ...instance.state, ...change };
    }
  };
  return instance;
};

describe('SelectTimePage logic', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('initializes selected slot and normalizes slot availability on mount', () => {
    const instance = buildInstance();
    instance.componentDidMount();

    expect(instance.state.slotItem?.id).toBe(
      slotsDateTimes.find(slot => slot.isSelected)?.id,
    );

    const everySlotNormalized = instance.state.slotsAvailable.every(section =>
      section.slots.every(
        slot => typeof slot !== 'string' && slot.isSelected === false,
      ),
    );
    expect(everySlotNormalized).toBe(true);
  });

  it('selects a slot and updates slotItem', () => {
    const instance = buildInstance();
    instance.componentDidMount();
    const target = slotsDateTimes[2];

    instance.selectTheSlot(target);

    const selected = instance.state.slotsDateTimes.find(
      slot => slot.id === target.id,
    );
    expect(selected?.isSelected).toBe(true);
    expect(instance.state.slotItem?.id).toBe(target.id);
  });

  it('marks only the tapped time slot as selected', () => {
    const instance = buildInstance();
    instance.componentDidMount();
    const slotToSelect = (slotsAvailableData[0].slots as string[])[2];

    instance.toggleSlotTimeAvail(slotToSelect);

    const flattened = instance.state.slotsAvailable.flatMap(
      section => section.slots,
    );
    expect(flattened.filter(slot => slot.isSelected).length).toBe(1);
    expect(
      flattened.find(slot => slot.slots === slotToSelect)?.isSelected,
    ).toBe(true);
  });

  it('toggles the next availability flag', () => {
    const instance = buildInstance();

    expect(instance.state.isNextAvailabilityClicked).toBe(false);
    instance.isNextAvailabilityClicked();
    expect(instance.state.isNextAvailabilityClicked).toBe(true);
    instance.isNextAvailabilityClicked();
    expect(instance.state.isNextAvailabilityClicked).toBe(false);
  });
});

describe('SelectTimePage rendering', () => {
  it('shows the next availability button and expands the slot list on press', async () => {
    const { getByText, queryByText } = render(
      <SelectTimePage navigation={createNavigation()} />,
    );

    const nextAvailabilityLabel = await waitFor(() =>
      getByText('Next availability on Tomorrow, 24 Feb'),
    );
    expect(getByText('Contact Clinic')).toBeTruthy();

    fireEvent.press(nextAvailabilityLabel);

    await waitFor(() => {
      expect(getByText('Book Now')).toBeTruthy();
    });
    expect(queryByText('Contact Clinic')).toBeNull();
  });
});

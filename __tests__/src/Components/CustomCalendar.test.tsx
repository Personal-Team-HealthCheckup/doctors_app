import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomCalendar from '../../../src/Components/CustomCalendar';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const createCalendarInstance = () => {
  const instance = new CustomCalendar({} as any);

  instance.state = {
    activeDate: new Date(2024, 0, 15),
  };

  instance.setState = update => {
    const partial =
      typeof update === 'function'
        ? update(instance.state, instance.props)
        : update;

    if (partial) {
      instance.state = {
        ...instance.state,
        ...partial,
      };
    }
  };

  return instance;
};

describe('CustomCalendar', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the current month header and weekday labels', () => {
    const today = new Date();
    const headerMatcher = new RegExp(
      `${MONTHS[today.getMonth()]}\\s+${today.getFullYear()}`,
    );

    const { getByText } = render(<CustomCalendar />);

    expect(getByText(headerMatcher)).toBeTruthy();
    WEEK_DAYS.forEach(label => {
      expect(getByText(label)).toBeTruthy();
    });
  });

  it('navigates between months when the buttons are pressed', () => {
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    const prevMonth = new Date(today);
    prevMonth.setMonth(prevMonth.getMonth() - 1);

    const { getByText } = render(<CustomCalendar />);

    fireEvent.press(getByText('Next'));
    expect(
      getByText(
        new RegExp(
          `${MONTHS[nextMonth.getMonth()]}\\s+${nextMonth.getFullYear()}`,
        ),
      ),
    ).toBeTruthy();

    fireEvent.press(getByText('Previous'));
    expect(
      getByText(
        new RegExp(`${MONTHS[today.getMonth()]}\\s+${today.getFullYear()}`),
      ),
    ).toBeTruthy();

    fireEvent.press(getByText('Previous'));
    expect(
      getByText(
        new RegExp(
          `${MONTHS[prevMonth.getMonth()]}\\s+${prevMonth.getFullYear()}`,
        ),
      ),
    ).toBeTruthy();
  });

  it('updates the active date when a valid day is pressed', () => {
    const instance = createCalendarInstance();
    instance._onPress(21);

    expect(instance.state.activeDate.getDate()).toBe(21);
  });

  it('ignores invalid selections such as empty cells or NaN', () => {
    const instance = createCalendarInstance();
    const initialTime = instance.state.activeDate.getTime();

    instance._onPress(-1);
    instance._onPress(Number.NaN);

    expect(instance.state.activeDate.getTime()).toBe(initialTime);
  });

  it('handles month changes across year boundaries', () => {
    const instance = createCalendarInstance();

    instance.setState({ activeDate: new Date(2023, 11, 10) });
    instance.changeMonth(1);
    expect(instance.state.activeDate.getMonth()).toBe(0);
    expect(instance.state.activeDate.getFullYear()).toBe(2024);

    instance.changeMonth(-2);
    expect(instance.state.activeDate.getMonth()).toBe(10);
    expect(instance.state.activeDate.getFullYear()).toBe(2023);
  });

  it('generates a calendar matrix with weekday headers and leap-year days', () => {
    const instance = createCalendarInstance();
    const matrix = instance.generateMatrix();

    expect(matrix[0]).toEqual(WEEK_DAYS);

    instance.setState({ activeDate: new Date(2024, 1, 1) });
    const februaryMatrix = instance.generateMatrix().flat();

    expect(februaryMatrix).toContain(29);
  });
});

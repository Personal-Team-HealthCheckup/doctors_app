/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

interface CustomCalendarProps {}

interface CustomCalendarState {
  activeDate: Date;
}

class CustomCalendar extends React.Component<
  CustomCalendarProps,
  CustomCalendarState
> {
  months = [
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

  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  constructor(props: CustomCalendarProps) {
    super(props);
    this.state = {
      activeDate: new Date(),
    };
  }

  _onPress = (item: number) => {
    this.setState(prevState => {
      if (!isNaN(item) && item !== -1) {
        const newDate = new Date(prevState.activeDate);
        newDate.setDate(item);
        return {activeDate: newDate};
      }
      return null;
    });
  };

  changeMonth = (n: number) => {
    this.setState(() => {
      this.state.activeDate.setMonth(this.state.activeDate.getMonth() + n);
      return this.state;
    });
  };

  generateMatrix(): number[][] {
    const matrix: number[][] = [];
    // Create header
    matrix[0] = [...(this.weekDays as unknown as number[])];

    const year = this.state.activeDate.getFullYear();
    const month = this.state.activeDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();

    let maxDays = this.nDays[month];
    if (month === 1) {
      // February
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        maxDays += 1;
      }
    }

    let counter = 1;
    for (let row = 1; row < 7; row++) {
      matrix[row] = [];
      for (let col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if (row === 1 && col >= firstDay) {
          // Fill in rows only after the first day of the month
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          // Fill in rows only if the counter's not greater than
          // the number of days in the month
          matrix[row][col] = counter++;
        }
      }
    }

    return matrix;
  }

  render(): React.ReactNode {
    const matrix = this.generateMatrix();
    const rows: React.ReactNode[] = matrix.map((row, rowIndex) => {
      const rowItems = row.map((item, colIndex) => (
        <Text
          key={`${rowIndex}-${colIndex}`}
          style={[
            styles.text,
            {
              backgroundColor: rowIndex === 0 ? '#ddd' : '#fff',
              // Highlight Sundays
              color: colIndex === 0 ? '#a00' : '#000',
              // Highlight current date
              fontWeight:
                item === this.state.activeDate.getDate() ? 'bold' : '400',
            },
          ]}
          onPress={() => this._onPress(item)}>
          {item !== -1 ? item : ''}
        </Text>
      ));

      return (
        <View key={`row-${rowIndex}`} style={styles.view}>
          {rowItems}
        </View>
      );
    });

    return (
      <View>
        <Text style={styles.container}>
          {this.months[this.state.activeDate.getMonth()]} &nbsp;
          {this.state.activeDate.getFullYear()}
        </Text>
        {rows}

        <Button title="Previous" onPress={() => this.changeMonth(-1)} />

        <Button title="Next" onPress={() => this.changeMonth(+1)} />
      </View>
    );
  }
}

export default CustomCalendar;
const styles = StyleSheet.create({
  container: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  text: {
    flex: 1,
    height: 18,
    textAlign: 'center',
  },
  view: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

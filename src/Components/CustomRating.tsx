import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
  StyleProp,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
interface CustomRatingProps {
  isDisable?: boolean;
  initialValue: number;
  onChange?: (text: number) => void;
  iconSize?: number;
  starViewStyle?: StyleProp<ViewStyle>;
  testID?: string;
}
const CustomRating: React.FC<CustomRatingProps> = ({
  isDisable = false,
  iconSize = 30,
  initialValue,
  onChange,
  testID = 'custom-rating',
  starViewStyle,
}) => {
  const [rating, setRating] = useState(initialValue);
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    onChange?.(newRating);
  };

  const stars = [];
  for (let index = 1; index <= 5; index++) {
    stars.push(
      <TouchableOpacity
        key={index}
        onPress={() => !isDisable && handleRatingChange(index)}
        style={!isDisable && styles.button}
        activeOpacity={1}
        testID={`${testID}-${index}`}
        disabled={isDisable}
      >
        <Icon
          name={index <= rating ? 'star' : 'star-o'}
          size={iconSize}
          color={index <= rating ? 'gold' : 'gray'}
        />
      </TouchableOpacity>,
    );
  }

  return (
    <View>
      <View style={[styles.container, starViewStyle]}>{stars}</View>
    </View>
  );
};

export default CustomRating;
const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
  button: {
    opacity: 1,
  },
});

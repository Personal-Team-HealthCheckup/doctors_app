import React, { useState } from 'react';
import { ViewStyle } from 'react-native';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
interface CustomRatingProps{
    isDisable?:boolean ; 
    initialValue: number,
    onChange?: (text:number) => void,
    iconSize?: number,
    starViewStyle?:StyleProp<ViewStyle>
}
const CustomRating:React.FC<CustomRatingProps> = ({ 
    isDisable = false, 
    iconSize=30 ,initialValue, 
    onChange ,
    starViewStyle
}) => {
  const [rating, setRating] = useState(initialValue);
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    onChange && onChange(newRating);
  };

  const stars = [];
  for (let index = 1; index <= 5; index++) {
    stars.push(
      <TouchableOpacity
        key={index}
        onPress={() => !isDisable && handleRatingChange(index)}
        style={!isDisable && styles.button}
      >
        <Icon
          name={index <= rating ? 'star' : 'star-o'}
          size={iconSize}
          color={index <= rating ? 'gold' : 'gray'}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <View style={[styles.container,starViewStyle]}>{stars}</View>
    </View>
  );
};

export default CustomRating;
const styles = StyleSheet.create({
    container: { flexDirection: 'row' },
    button:{
        opacity:1,
        activeOpacity: 1,

    }
})
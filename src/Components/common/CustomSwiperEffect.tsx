import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder } from 'react-native';

const SwipeToDelete = ({ item, onDelete }) => {
  const pan = useState(new Animated.ValueXY())[0];
  const [isDeleted, setIsDeleted] = useState(false);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) =>
      Math.abs(gestureState.dx) > 20,
    
    onPanResponderMove: Animated.event(
      [null, { dx: pan.x }],
      { useNativeDriver: false }
    ),
    
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 120) {
        // Swiped to the right
        Animated.timing(pan.x, {
          toValue: 500,
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          setIsDeleted(true);
          onDelete(item.id);
        });
      } else {
        // Return to initial position
        Animated.spring(pan.x, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    }
  });

  if (isDeleted) return null;

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX: pan.x }] }]}
      {...panResponder.panHandlers}
    >
      <Text style={styles.text}>{item.text}</Text>
    </Animated.View>
  );
};

const App = () => {
  const [data, setData] = useState([
    { id: 1, text: 'Swipe to delete item 1' },
    { id: 2, text: 'Swipe to delete item 2' }
  ]);

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  return (
    <View style={styles.appContainer}>
      {data.map(item => (
        <SwipeToDelete key={item.id} item={item} onDelete={handleDelete} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
  },
  container: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  text: {
    fontSize: 16,
  },
});

export default App;

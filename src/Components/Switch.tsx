import React from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

interface SwitchProps {}

interface SwitchState {
  isDisable: boolean;
}

class Switch extends React.Component<SwitchProps, SwitchState> {
  moveAnimation;
  constructor(props: SwitchProps) {
    super(props);
    this.state = {isDisable: false};
    this.moveAnimation = new Animated.ValueXY({x: 0, y: 0});
  }
  toggleSwitch = () => {
    if (this.state.isDisable) {
      Animated.spring(this.moveAnimation, {
        toValue: {x: 0, y: 0},
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(this.moveAnimation, {
        toValue: {x: 48, y: 0},
        useNativeDriver: true,
      }).start();
    }
    this.setState(prev => ({isDisable: !prev.isDisable}));
  };
  render() {
    return (
      <View style={styles.main}>
        <TouchableOpacity
          onPress={() => this.toggleSwitch()}
          style={styles.mainContainer}>
          <Animated.View
            style={[
              styles.view,
              styles.activeView,

              {
                transform: [
                  {
                    translateX: this.moveAnimation.x,
                  },
                  {
                    translateY: this.moveAnimation.y,
                  },
                ],
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default Switch;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'grey',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 30,
    width: 80,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
    paddingRight: 1,
    paddingLeft: 1,
  },
  view: {
    width: 30,
    height: '100%',
    borderRadius: 15,
    // zIndex: 0,
  },
  activeView: {
    backgroundColor: 'blue',
  },
});

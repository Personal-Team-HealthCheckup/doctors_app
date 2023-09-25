import React from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  StyleSheet,
  StyleProp,
  ViewStyle,
  PanResponderInstance,
  PanResponder,
  Alert,
  Button,
  Text,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

interface BottomSheetProps {
  height: number;
  closeFunction?: () => void;
  hasDraggableIcon?: boolean;
  backgroundColor?: string;
  sheetBackgroundColor?: string;
  dragIconColor?: string;
  dragIconStyle?: StyleProp<ViewStyle>;
  draggable?: boolean;
  onRequestClose?: () => void;
  onClose?: () => void;
  radius?: number;
  testID?: string;
  children?: React.ReactNode;
}

interface BottomSheetState {
  modalVisible: boolean;
  animatedHeight: Animated.Value;
  pan: Animated.ValueXY;
}

class BottomSheet extends React.PureComponent<
  BottomSheetProps,
  BottomSheetState
> {
  panResponder?: PanResponderInstance;
  bottomSheetRef: BottomSheet | null = null;
  constructor(props: BottomSheetProps) {
    super(props);
    this.state = {
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
      pan: new Animated.ValueXY(),
    };
  }

  setModalVisible(visible: boolean) {
    const {closeFunction, height} = this.props;
    const {animatedHeight, pan} = this.state;
    if (visible) {
      this.setState({modalVisible: visible});
      Animated.timing(animatedHeight, {
        toValue: height,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }).start(() => {
        pan.setValue({x: 0, y: 0});
        this.setState({
          modalVisible: visible,
          animatedHeight: new Animated.Value(0),
        });
        if (typeof closeFunction === 'function') {
          closeFunction();
        }
      });
    }
  }

  onStartShouldSetPanResponder = () => true;

  onPanResponderMove = (event: {}, gestureState: {dy: number}) => {
    const {pan} = this.state;
    if (gestureState.dy > 0) {
      Animated.event([null, {dy: pan.y}], {
        useNativeDriver: false,
      })(event, gestureState);
    }
  };

  onPanResponderRelease = (event: {}, gestureState: {dy: number}) => {
    const {height} = this.props;
    const {pan} = this.state;
    try {
      const gestureLimitArea = height / 3;
      const gestureDistance = gestureState.dy;
      if (gestureDistance > gestureLimitArea) {
        this.setModalVisible(false);
      } else {
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: false,
        }).start();
      }
    } catch (error) {
      Alert.alert('Error', 'An unknown error occurred.');
    }
  };

  createPanResponder() {
    const {
      onStartShouldSetPanResponder,
      onPanResponderMove,
      onPanResponderRelease,
    } = this;

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder,
      onPanResponderMove,
      onPanResponderRelease,
    });
  }

  show() {
    this.setModalVisible(true);
  }

  close() {
    this.setModalVisible(false);
  }

  newClose = () => this.close();

  render() {
    const {
      children,
      backgroundColor,
      sheetBackgroundColor,
      draggable = true,
      onRequestClose,
      onClose = this.newClose,
      radius,
      testID,
    } = this.props;
    const {animatedHeight, pan, modalVisible} = this.state;
    const panStyle = {
      transform: pan.getTranslateTransform(),
    };
    const styleAnimated = {
      height: animatedHeight,
      borderTopRightRadius: radius || 10,
      borderTopLeftRadius: radius || 10,
      backgroundColor: sheetBackgroundColor || '#F3F3F3',
    };

    return (
      <>
        <Modal
          transparent
          visible={modalVisible}
          onRequestClose={onRequestClose}>
          <KeyboardAvoidingView behavior={'padding'} style={styles.flex1}>
            <View
              style={[
                styles.wrapper,
                {backgroundColor: backgroundColor || '#25252599'},
              ]}>
              <TouchableOpacity
                style={styles.background}
                activeOpacity={1}
                onPress={onClose}
                testID={testID}
              />
              <Animated.View
                {...(draggable &&
                  this.panResponder &&
                  this.panResponder.panHandlers)}
                style={[panStyle, styles.container, styleAnimated]}>
                {children}
              </Animated.View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
        <Button
          title="button"
          onPress={() => {
            this.bottomSheetRef?.show();
          }}
        />
        <BottomSheet
          ref={ref => (this.bottomSheetRef = ref)}
          backgroundColor="rgba(0, 0, 0, 0.50)"
          radius={responsiveFontSize(1)}
          height={responsiveHeight(30)}>
          <View style={styles.buttonView}>
            <Text style={styles.text}>BottomSheet</Text>
          </View>
        </BottomSheet>
      </>
    );
  }
}

export default BottomSheet;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  background: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    width: '100%',
    height: 0,
    overflow: 'hidden',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  buttonView: {flex: 1, alignContent: 'center', justifyContent: 'center'},
  text: {textAlign: 'center'},
});

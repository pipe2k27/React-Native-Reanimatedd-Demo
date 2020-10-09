import * as React from 'react';
import { Dimensions, Platform, StyleSheet, View, Text } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { Value, cond, set, eq, add } from 'react-native-reanimated';
import Constants from 'expo-constants';
import { diffClamp, onGestureEvent } from 'react-native-redash/lib/module/v1';
import styles from './styles';

const { width, height } = Dimensions.get('window');
const containerWidth = width;
const containerHeight =
  height - Constants.statusBarHeight - (Platform.OS === 'ios' ? 44 : 52);

const offsetX = new Value(containerWidth / 2);
const offsetY = new Value(containerHeight / 2);
const styler = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const withOffset = (value, state, offset = new Value(0)) =>
  cond(
    eq(state, State.END),
    [set(offset, add(offset, value)), offset],
    add(offset, value)
  );

const PanGesture = () => {
  const state = new Value(State.UNDETERMINED);
  const translationX = new Value(0);
  const translationY = new Value(0);
  const velocityX = new Value(0);
  const velocityY = new Value(0);
  const gestureHandler = onGestureEvent({
    state,
    translationX,
    translationY,
    velocityX,
    velocityY,
  });
  const translateX = diffClamp(
    withOffset(translationX, state, offsetX),
    0,
    containerWidth
  );
  const translateY = diffClamp(
    withOffset(translationY, state, offsetY),
    0,
    containerHeight
  );
  return (
    <View style={styler.container}>
      <Text style={{ fontSize: 20, marginBottom: 25, fontWeight: 'bold' }}>
        Usando useTimingTransition
      </Text>

      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={[
            styles.card,
            {
              transform: [{ translateY }],
            },
          ]}
        ></Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default PanGesture;

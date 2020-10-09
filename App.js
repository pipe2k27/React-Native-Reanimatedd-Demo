import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import CardsTransition from './components/CardsTransition/CardsTransition';
import Timing from './components/ClockLoop/index';
import PanGesture from './components/Gesture';
import UseTransition from './components/UseTimingTransition';
import UseTransition2 from './components/UseTimingTransition2';

export default function App() {
  return (
    <ScrollView>
      <View style={styles.containerMain}>
        <Text
          style={{
            fontSize: 40,
            marginBottom: 25,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          React Reanimated Demos
        </Text>
        <CardsTransition />
        <Timing />
        <UseTransition />
        <UseTransition2 />
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    alignItems: 'center',
    top: 100,
    height: 4000,
  },
});

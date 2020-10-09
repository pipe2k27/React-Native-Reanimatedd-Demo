import * as React from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import styles from './styles';

const { interpolate, Extrapolate } = Animated;
const size = 32;

// aca voy a usar progress que vienen dado por la position que devuelve el clock que creamos en el index

const Cards = ({ progress }) => {
  const cards = [0, 1, 2, 3, 4, 5];
  const delta = 1 / cards.length;
  return (
    <>
      {cards.map((i) => {
        const start = i * delta;
        const end = start + delta;
        const cardColor = `color${i}`;
        const color = styles[cardColor];

        // Esta es la parte donde interpolamos lo que querramos animar en todos los casos

        const opacity = interpolate(progress, {
          inputRange: [start, end],
          outputRange: [0, 1],
          extrapolate: Extrapolate.CLAMP,
        });
        const scale = interpolate(progress, {
          inputRange: [start, end],
          outputRange: [0.4, 1],
          extrapolate: Extrapolate.CLAMP,
        });
        const translateY = interpolate(progress, {
          inputRange: [start, end],
          outputRange: [70, 0],
          extrapolate: Extrapolate.CLAMP,
        });

        // aca uso un if  para interpolar animaciones de un lado y ddel otro dependiendo de si es par o impar
        let translateX = '';
        if (i % 2 == 0) {
          translateX = interpolate(progress, {
            inputRange: [start, end],
            outputRange: [250, 0],
            extrapolate: Extrapolate.CLAMP,
          });
        } else {
          translateX = interpolate(progress, {
            inputRange: [start, end],
            outputRange: [-250, 0],
            extrapolate: Extrapolate.CLAMP,
          });
        }

        return (
          // usar el animated view de REANIMATED y no el de React Native
          <Animated.View
            key={i}
            style={[
              styles.card,
              {
                opacity,
                transform: [{ scale }, { translateY }, { translateX }],
              },
              color,
            ]}
          >
            <Text style={[styles.text]}>Card</Text>
          </Animated.View>
        );
      })}
    </>
  );
};

export default Cards;

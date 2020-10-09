import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import {
  mix,
  transformOrigin,
  useTimingTransition,
} from 'react-native-redash/lib/module/v1';

// MUY IMPORTANTE: como usamos react reanimatedd v1 importar todo lo de react native redash desde 'react-native-redash/lib/module/v1'si no, rompe el codigo
import styles from './styles';

const { multiply, interpolate } = Animated;

// aca usamos esta funcion para obtener el ancho de la pagina
const { width } = Dimensions.get('window');
const styler = StyleSheet.create({
  container: {
    marginTop: 80,
    alignItems: 'center',
    height: 600,
    backgroundColor: 'white',
    width: '100%',
  },
  overlay: {
    // esta primera propiedadd basicamente setea la posicion en absolute y todas las direcciones en 0 asi queda una tarjeta arriba de la otra
    ...StyleSheet.absoluteFillObject,
    top: 200,
    left: 83,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// en esta transicion voy a hacer una mas complicada pero siguiendo la misma logica que anetes

const UseTransition2 = () => {
  const [toggled, setToggle] = useState(false);
  // useTimingTransition te permite usar una transicion qeu se ejecute de acuerdo a un cambio de estado
  // basicamente devuelve un vlor animado entre 0 y 1 en el tiempo que le especifiquemos
  const transitionVal = useTimingTransition(toggled, {
    duration: 800,
    easing: Easing.inOut(Easing.ease),
  });
  const cards = [5, 4, 3, 2, 1];
  return (
    <View style={styler.container}>
      <Text style={{ fontSize: 20, marginBottom: 25, fontWeight: 'bold' }}>
        useTimingTransition mas complejo
      </Text>

      {cards.map((card) => {
        // aca voy a usar el useTimingTransition ( en transitionVal) para interpolar entre 0 y 1
        const scale = interpolate(transitionVal, {
          inputRange: [0, 0.3, 0.5, 1],
          outputRange: [0.8 * (1 - card / 20), 1.2, 1, 1],
        });

        const translateY = interpolate(transitionVal, {
          inputRange: [0, 0.3, 0.8, 1],
          outputRange: [0, -20, 0, 0],
        });

        const rotate = interpolate(transitionVal, {
          inputRange: [0, 0.15, 1],
          outputRange: [-0.4 + 0.2 * card, 0, 0],
        });

        // aca usamos el valor de card como parametro para que se cuando se desplieguen las tarjetas queden en distintos lugares
        const top = interpolate(transitionVal, {
          inputRange: [0, 0.2, 0.3, 0.55, 1],
          outputRange: [200 + card * 9, 200, 200, 200 * (card / 5), 200 * card],
        });

        const translateX = multiply(transitionVal, 100);
        const cardColor = `color${card}`;
        const color = styles[cardColor];
        return (
          <Animated.View
            key={card.id}
            style={[
              styler.overlay,
              styles.card,
              color,
              {
                transform: [{ scale }, { translateY }, { rotate }],
                top: top,
              },
            ]}
          >
            <Text style={[styles.text]}>Card</Text>
          </Animated.View>
        );
      })}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setToggle((prev) => !prev)}
      >
        <Text style={styles.text}>Play</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UseTransition2;

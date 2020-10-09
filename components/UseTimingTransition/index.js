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
    alignItems: 'center',
    height: 600,
    backgroundColor: 'white',
    width: '100%',
  },
  overlay: {
    // esta primera propiedadd basicamente setea la posicion en absolute y todas las direcciones en 0 asi queda una tarjeta arriba de la otra
    ...StyleSheet.absoluteFillObject,
    top: 200,
    left: 85,

    justifyContent: 'center',
    alignItems: 'center',
  },
});

const UseTransition = () => {
  const [toggled, setToggle] = useState(false);
  // useTimingTransition te permite usar una transicion que se ejecute de acuerdo a un cambio de estado
  // basicamente devuelve un vlor animado entre 0 y 1 en el tiempo que le especifiquemos
  const transitionVal = useTimingTransition(toggled, {
    duration: 400,
    easing: Easing.inOut(Easing.ease),
  });
  const cards = [1, 0, -1];
  return (
    <View style={styler.container}>
      <Text style={{ fontSize: 20, marginBottom: 25, fontWeight: 'bold' }}>
        Usando useTimingTransition
      </Text>

      {cards.map((card, index) => {
        // aca voy a usar el useTimingTransition ( en transitionVal) para interpolar entre 0 y 1
        // puedo interpolar cualquier valor, lo que hace que pueda manejar cualquier property
        // aca por ejemplo voy a interpolar  posicion en y, pero tambien puedo interpolar escala, opacidad, etc

        const translateY = interpolate(transitionVal, {
          inputRange: [0, 0.03, 0.6, 1],
          outputRange: [0, -20, 40, 0],
        });

        // la animacion de rotacion se puede hacer usando mix que es una manera rapida de interpolar
        // lo que hace es define el valor animado y despues los dos valores entre los que interpola
        //        const rotate = multiply(rotation, mix(transitionVal, 0, 0.46));

        // igualmente usamos interpolacion que nos da mas precision
        const rotate = interpolate(transitionVal, {
          inputRange: [0, 0.1, 0.8, 1],
          outputRange: [0, 0, 0.6, card * 0.46],
        });

        // interpolar me permite hilar fino y acomodar la animacion al segundo exacto.
        // si quiero despues diferenciar un map puedo usar alguna propiedad numerica del array
        // en este caso use el numero card pero pudiera haber usado el index o cualquier otro

        // tambien puedo animar usando el multiplicador de reanimated
        // por ejemplo : const translateX = multiply(transitionVal, 10);

        const cardColor = `color${index}`;
        const color = styles[cardColor];
        return (
          <Animated.View
            key={card.id}
            style={[
              styler.overlay,
              styles.card,
              color,
              {
                // transform origin es una prop de redash que te permite correr el origen de donde se van a realizar las rotaciones
                transform: transformOrigin(
                  { x: -170, y: 0 },
                  { rotate },
                  { translateY }
                ),
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

export default UseTransition;

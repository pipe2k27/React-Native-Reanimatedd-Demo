import React, { useState, useRef } from 'react';
import { Text, TouchableOpacity, View, Button } from 'react-native';

import {
  Transition,
  Transitioning,
  TransitioningView,
} from 'react-native-reanimated';

import styles from './styles';

const transition = (
  // Transition toghether hace que se anime todo a la vez y transition change ejecuta los cambios.
  <Transition.Together>
    <Transition.Change interpolation="easeIn" durationMs={200} />
  </Transition.Together>
);

// aca vamos a definir el layout fijarse que en este tipo de transiciones se puede
// cambiar cosas como: posicion width height display etc pero no otras como : colores font size opacity
const layouts = {
  layout2: {
    card: {
      height: 150,
      width: '60%',
      opacity: 1,
    },
    container: {
      flexDirection: 'column',
      height: 500,
    },
  },
  layout1: {
    card: {
      width: '30%',
      height: 66,
      text: {},
      top: 200,
    },
    container: {
      flexDirection: 'row',
      height: 500,
    },
  },
};

const Card = ({ color, position, text }) => {
  const cardColor = styles[color];

  return (
    <View style={[styles.card, cardColor, position]}>
      <Text style={[styles.text, text]}>Card</Text>
    </View>
  );
};

const TryAnim = () => {
  // el use ref aca se empieza como nulo y despues se usa para referenciar a que componentes queremos aplicarle la animacion

  const ref = useRef(null);
  const cards = ['color1', 'color2', 'color3'];
  const [currentLayout, setCurrentLayout] = useState(layouts.layout1);

  return (
    <>
      <Text style={{ fontSize: 20, marginBottom: 25, fontWeight: 'bold' }}>
        Transicion Simple
      </Text>
      <Transitioning.View
        style={[styles.container, currentLayout.container]}
        // aca aplico la transicion que defini mas arriba
        transition={transition}
        ref={ref}
        // aca marco el view al  que quiero referenciar con la referencia que siempre debe arrancar como nula
      >
        {cards.map((card) => (
          <Card
            key={card}
            color={card}
            position={currentLayout.card}
            text={currentLayout.card.text}
          />
        ))}
      </Transitioning.View>
      <TouchableOpacity
        onPress={() => {
          // aca usa el use ref para referenciar el view que tiene las cards que van a ser animadas
          ref.current.animateNextTransition();
          if (currentLayout === layouts.layout2) {
            setCurrentLayout(layouts.layout1);
          } else {
            setCurrentLayout(layouts.layout2);
          }
        }}
        style={[styles.button, { marginBottom: 50 }]}
      >
        <Text style={styles.buttonText}>change</Text>
      </TouchableOpacity>
    </>
  );
};

export default TryAnim;

import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Clock,
  Easing,
  Value,
  and,
  block,
  clockRunning,
  cond,
  eq,
  not,
  set,
  startClock,
  stopClock,
  timing,
  useCode,
} from 'react-native-reanimated';
import { useClock, useValue } from 'react-native-redash/lib/module/v1';

// MUY IMPORTANTE: como usamos react reanimatedd v1 importar todo lo de react native redash desde 'react-native-redash/lib/module/v1'si no, rompe el codigo

import Cards from './cards';

import styles from './styles';

// aca vamos a hacer una animacion que este controladda por un reloj para asi poder animar otras cosas
// lo bueno de tener el clock es que podes interpolar y manejar las animaciones como quieras

// asi debe estar seteada una timing animation timing(
// clock,
//{ finished, position, frameTime, time },
//{ toValue, duration, easing }
//);

// esta es una funcion que toma un clock (ya creado) y lo configura y resetea. ademas devuelve el parametro que necesitamos (position)
const runTiming = (clock) => {
  // en esta primera const se setea todo a 0
  const state = {
    //esto va a ser 1 si ya termino
    finished: new Value(0),
    // este es el valor que va a manejar las animaciones
    position: new Value(0),
    // estos dos valores muestran cuanto paso de la animacion
    frameTime: new Value(0),
    time: new Value(0),
  };

  // aca seteamos la parte de config, esta bastante claro que hace
  const config = {
    toValue: new Value(1),
    duration: 1000,
    easing: Easing.inOut(Easing.ease),
  };

  // aca usa un block que pasa por todos los condicionales hasta el return (con es un if)
  return block([
    // si el reloj NO esta corriendo lo resetea
    cond(
      not(clockRunning(clock)),
      set(state.time, 0),
      timing(clock, state, config)
    ),

    // Aca cuando llega a uno resetea todo menos la posicion para que vaya y vuelva (la setea a lo opuesto)

    cond(eq(state.finished, 1), [
      set(state.finished, 0),
      set(state.frameTime, 0),
      set(state.time, 0),
      set(config.toValue, not(state.position)),
    ]),

    // aca devuelve el state position que es lo que va a manejar la animacion
    state.position,
  ]);
};

const Timing = () => {
  const [play, setPlay] = useState(false);
  // aca usa useClock y useValue de redash que lo que hace es mantener el valor de las cosas por mas que se rerendderize el componente. useState se resetea cada vez.
  // en useClock se crea el clock
  const clock = useClock();
  const progress = useValue(0);
  const isPlaying = useValue(0);

  //useCodde es basicamente lo mimsmo que un useEffect pero de reanimated y puede manejar ui thread

  useCode(() => set(isPlaying, play ? 1 : 0), [play]);

  // aca ocurre la logica. si la animacion se esta corriendo arranca el reloj, si la freno frena el reloj y va seteando el progress a lo que devuelve la timing function (posicion)
  useCode(
    () => [
      cond(and(isPlaying, not(clockRunning(clock))), startClock(clock)),
      cond(and(not(isPlaying), clockRunning(clock)), stopClock(clock)),
      set(progress, runTiming(clock)),
    ],
    []
  );
  return (
    <View style={styles.containerTiming}>
      <Text style={{ fontSize: 20, marginBottom: 25, fontWeight: 'bold' }}>
        Usando un Clock - Timing Animation
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setPlay((prev) => !prev)}
      >
        <Text style={styles.text}>Play</Text>
      </TouchableOpacity>

      <Cards progress={progress} />
    </View>
  );
};

export default Timing;

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  transitionContainer: {
    marginBottom: 100,
  },
  container: {
    height: 700,
    width: '100%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  card: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    height: 200,
    width: '80%',
    elevation: 1,
    borderRadius: 10,
    backgroundColor: '#0800a0',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
  color1: {
    backgroundColor: '#88e1f2',
  },
  color2: {
    backgroundColor: '#ffd082',
  },
  color3: {
    backgroundColor: '#222222',
  },
  button: {
    height: 60,
    width: 150,
    backgroundColor: '#ff7c7c',
    color: 'white',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    top: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

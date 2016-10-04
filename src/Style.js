import { StyleSheet } from 'react-native';

const Style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    backgroundColor: 'transparent',
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    fontWeight: '500',
  },
});

export default Style;

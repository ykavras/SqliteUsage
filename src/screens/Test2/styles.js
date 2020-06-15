import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  percent: {
    height: 40,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#d1d1d1',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  percentLinear: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    elevation: 1,
  },
  percentMask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#EDEDED',
    zIndex: 2,
    elevation: 2,
  },
  percentText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000000',
    zIndex: 3,
    elevation: 3,
  },
});

export default styles;

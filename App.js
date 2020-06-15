/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import SqLite from './src/screens/SqLite';

const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <SqLite />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {flex: 1},
  wrapper: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
});

console.disableYellowBox = true;

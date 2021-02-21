/* eslint-disable react/style-prop-object */
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import TabBar from './src/components/TabBar';

export default function App() {
  return (
    <View style={styles.container}>
      <TabBar />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171F33',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

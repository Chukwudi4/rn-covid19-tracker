import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Brief } from './screens/Brief';

export default function App() {
  return (
    <Brief/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TouchableOpacity, Alert, } from 'react-native';
import Stopwatch from './src/Stopwatch.js'
const App = () => {

  return (
    <View style={styles.container}>
      <Stopwatch/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
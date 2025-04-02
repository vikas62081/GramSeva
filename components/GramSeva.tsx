import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const GramSeva = (): React.JSX.Element => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Gram Seva</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4a90e2',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default GramSeva;

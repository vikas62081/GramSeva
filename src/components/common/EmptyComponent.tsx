import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface EmptyComponentProps {
  msg: string;
}

const EmptyComponent: React.FC<EmptyComponentProps> = ({msg}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{msg}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: '100%',
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
});

export default EmptyComponent;

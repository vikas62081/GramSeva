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
    flex: 1,
    paddingHorizontal: 20,
    marginTop: '20%',
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
});

export default EmptyComponent;

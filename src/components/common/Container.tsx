import React from 'react';
import {View, StyleSheet, ViewStyle, TextStyle} from 'react-native';

interface ContainerProps {
  children: React.ReactNode;
  padding?: boolean; // Optional flag to add padding to the container
}

const Container: React.FC<ContainerProps> = ({children, padding = true}) => {
  return <View style={[styles.container]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
});

export default Container;

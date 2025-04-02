import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface FormGroupProps {
  label?: string;
  children: React.ReactNode;
}

const FormGroup: React.FC<FormGroupProps> = ({label, children}) => {
  return (
    <View style={styles.group}>
      {label && <Text style={styles.label}>{label}</Text>}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  group: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
});

export default FormGroup;

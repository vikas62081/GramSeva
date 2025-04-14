import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

interface FormGroupProps {
  label?: string;
  children: React.ReactNode;
}

const FormGroup: React.FC<FormGroupProps> = ({label, children}) => {
  return (
    <View style={styles.group}>
      {label && (
        <Text style={styles.label} variant="titleMedium">
          {label}
        </Text>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  group: {
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
    opacity: 0.6,
  },
});

export default FormGroup;

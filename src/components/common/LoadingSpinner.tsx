import React from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import {ActivityIndicator, Text, useTheme} from 'react-native-paper';

interface LoadingSpinnerProps {
  loading: boolean;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  loading,
  text = 'Loading...',
}) => {
  const {colors} = useTheme();

  return (
    <Modal transparent visible={loading}>
      <View style={[styles.container, {backgroundColor: colors.backdrop}]}>
        <View style={[styles.card, {backgroundColor: colors.surface}]}>
          <ActivityIndicator size="large" />
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 12,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 16,
    fontSize: 16,
  },
});

export default LoadingSpinner;

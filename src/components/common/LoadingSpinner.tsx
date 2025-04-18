import React, {ReactNode} from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';

interface LoadingSpinnerProps {
  loading: boolean;
  children: ReactNode;
  content?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  loading,
  children,
  content = 'Please wait...',
}) => {
  return (
    <View style={{flex: 1}}>
      {children}
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#007bff" />
          {content && <Text style={styles.text}>{content}</Text>}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
    flex: 1,
    verticalAlign: 'middle',
    zIndex: 999,
  },
  text: {
    marginTop: 12,
    color: '#333',
    fontSize: 16,
  },
});

export default LoadingSpinner;

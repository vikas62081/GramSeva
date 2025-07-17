import React, {ReactNode} from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import {useTheme} from 'react-native-paper';

interface LoadingSpinnerProps {
  loading: boolean;
  children: ReactNode;
  text?: string;
  backgroundColor?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  loading,
  children,
  text = 'Please wait...',
  backgroundColor = 'transparent',
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {children}
      {loading && (
        <View style={[styles.overlay, {backgroundColor: backgroundColor}]}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          {text ? (
            <Text style={[styles.text, {color: theme.colors.onPrimary}]}>
              {text}
            </Text>
          ) : null}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LoadingSpinner;

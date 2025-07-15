import React, {ReactNode} from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import {useTheme} from 'react-native-paper';

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
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {children}
      {loading && (
        <View
          style={[styles.overlay, {backgroundColor: theme.colors.backdrop}]}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          {content ? (
            <Text style={[styles.text, {color: theme.colors.onPrimary}]}>
              {content}
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

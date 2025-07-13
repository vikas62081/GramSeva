import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {useTheme} from 'react-native-paper';
import Logo from './Logo';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Loading...',
}) => {
  const theme = useTheme();

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.logoContainer}>
        <Logo size="large" />
      </View>
      <ActivityIndicator
        size="large"
        color={theme.colors.primary}
        style={styles.spinner}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 40,
  },
  spinner: {
    marginTop: 20,
  },
});

export default LoadingScreen;

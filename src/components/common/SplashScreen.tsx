import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme, ActivityIndicator} from 'react-native-paper';
import Logo from './Logo';

const SplashScreen: React.FC = () => {
  const {colors} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Logo size="x-large" />
      <ActivityIndicator size="large" style={styles.spinner} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    marginTop: 32,
  },
});

export default SplashScreen;

import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import Container from '../components/common/Container';
import {useAuth} from '../context/AuthContext';

const HomeScreen = () => {
  const {user} = useAuth();

  return (
    <Container>
      <Text variant="headlineMedium" style={styles.title}>
        Welcome, {user?.name}!
      </Text>
      <Text variant="bodyLarge" style={styles.subtitle}>
        What would you like to do today?
      </Text>
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 24,
  },
});

export default HomeScreen;

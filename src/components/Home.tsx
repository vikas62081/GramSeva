import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Dashboard from './Dashboard';

interface HomeProps {
  navigation: any;
}

const Home = ({navigation}: HomeProps) => {
  return (
    <View style={styles.container}>
      <Dashboard navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;

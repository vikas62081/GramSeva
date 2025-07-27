import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'x-large';
}

const Logo: React.FC<LogoProps> = ({size = 'medium'}) => {
  const {colors} = useTheme();

  const getSize = () => {
    switch (size) {
      case 'small':
        return {width: 60, height: 60, title: 'titleMedium'};
      case 'medium':
        return {width: 80, height: 80, title: 'titleLarge'};
      case 'large':
        return {width: 120, height: 120, title: 'headlineSmall'};
      case 'x-large':
        return {width: 150, height: 150, title: 'headlineMedium'};
      default:
        return {width: 80, height: 80, title: 'titleLarge'};
    }
  };

  const {width, height, title} = getSize();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo1.png')}
        style={{width, height}}
        resizeMode="contain"
      />
      <Text
        variant={title as any}
        style={[styles.title, {color: colors.primary}]}>
        GramSeva
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    marginTop: 8,
    fontWeight: 'bold',
  },
});

export default Logo;

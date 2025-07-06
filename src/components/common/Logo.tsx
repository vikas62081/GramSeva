import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {useTheme} from 'react-native-paper';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showTagline?: boolean;
}

const Logo: React.FC<LogoProps> = ({size = 'medium', showTagline = true}) => {
  const theme = useTheme();

  const getSize = () => {
    switch (size) {
      case 'small':
        return {container: 60, text: 16, tagline: 12};
      case 'large':
        return {container: 100, text: 32, tagline: 16};
      default:
        return {container: 80, text: 24, tagline: 14};
    }
  };

  const sizes = getSize();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={[
          styles.logoImage,
          {
            width: sizes.container,
            height: sizes.container,
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {},
  appName: {
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  tagline: {
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
});

export default Logo;

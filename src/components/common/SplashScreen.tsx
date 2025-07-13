import React, {useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {useTheme} from 'react-native-paper';
import Logo from './Logo';

interface SplashScreenProps {
  onFinish: () => void;
  duration?: number;
}

const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinish,
  duration = 2000,
}) => {
  const theme = useTheme();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    // Fade in animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onFinish();
      });
    }, duration);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, onFinish, duration]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          opacity: fadeAnim,
        },
      ]}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{scale: scaleAnim}],
          },
        ]}>
        <Logo size="large" />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
});

export default SplashScreen;

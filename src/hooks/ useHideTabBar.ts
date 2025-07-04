import {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const useHideTabBar = () => {
  const navigation = useNavigation();
  const translateY = useRef(new Animated.Value(0)).current; // 0 means visible

  useEffect(() => {
    const parent = navigation.getParent?.();
    if (parent) {
      Animated.timing(translateY, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }).start();

      parent.setOptions({
        tabBarStyle: {
          transform: [{translateY: translateY}],
          position: 'absolute',
          backgroundColor: '#fff',
          height: 60,
          paddingBottom: 6,
        },
      });
    }

    return () => {
      if (parent) {
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();

        parent.setOptions({
          tabBarStyle: {
            transform: [{translateY: translateY}],
            position: 'absolute',
            backgroundColor: '#fff',
            height: 60,
            paddingBottom: 6,
          },
        });
      }
    };
  }, [navigation, translateY]);
};

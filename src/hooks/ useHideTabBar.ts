import {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

export const useHideTabBar = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const parent = navigation.getParent?.();
    if (parent) {
      parent.setOptions({
        tabBarStyle: {display: 'none'},
      });
    }

    return () => {
      if (parent) {
        parent.setOptions({
          tabBarStyle: {
            backgroundColor: '#fff',
            height: 60,
            paddingBottom: 6,
          },
        });
      }
    };
  }, [navigation]);
};

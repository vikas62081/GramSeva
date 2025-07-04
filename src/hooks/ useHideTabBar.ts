import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

export const useHideTabBar = (hide: boolean = true) => {
  const navigation = useNavigation();

  useEffect(() => {
    const parent = navigation.getParent?.();
    if (!parent) return;

    if (hide) {
      parent.setOptions({
        tabBarStyle: {
          display: 'none',
        },
      });
    }

    return () => {
      if (hide) {
        parent.setOptions({
          tabBarStyle: {
            display: 'flex',
            height: 60, // Reset to default height
          },
        });
      }
    };
  }, [navigation, hide]);
};

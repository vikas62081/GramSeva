import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

interface LazyLoaderProps {
  loading: boolean;
  fallback?: React.ReactNode;
  children: React.ReactNode;
  position?: 'center' | 'top';
  topMargin?: number;
}

const LazyLoader: React.FC<LazyLoaderProps> = ({
  loading,
  fallback,
  children,
  position = 'center',
  topMargin = 20,
}) => {
  if (loading) {
    const loaderStyle =
      position === 'center'
        ? styles.centeredLoader
        : [styles.topLoader, {marginTop: topMargin}];

    return (
      <View style={loaderStyle}>
        {fallback || <ActivityIndicator animating />}
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  centeredLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  topLoader: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
});

export default LazyLoader;

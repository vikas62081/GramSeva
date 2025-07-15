import React, {useEffect, useRef} from 'react';
import {View, Animated, StyleProp, ViewStyle} from 'react-native';

interface AnimatedProgressBarProps {
  progress: number; // 0 to 1
  height?: number;
  backgroundColor?: string;
  barColor?: string;
  style?: StyleProp<ViewStyle>;
  duration?: number;
}

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
  progress,
  height = 8,
  backgroundColor = '#fff',
  barColor = '#388e3c',
  style,
  duration = 700,
}) => {
  const animatedProgress = useRef(new Animated.Value(progress)).current;
  const prevProgress = usePrevious(progress);

  useEffect(() => {
    // Always animate from the last value, even on remount
    if (typeof prevProgress === 'number') {
      animatedProgress.setValue(prevProgress);
    }
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration,
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, duration]);

  return (
    <View
      style={[
        {
          height,
          borderRadius: height / 2,
          backgroundColor,
          overflow: 'hidden',
        },
        style,
      ]}>
      <Animated.View
        style={{
          height,
          borderRadius: height / 2,
          backgroundColor: barColor,
          width: animatedProgress.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%'],
          }),
        }}
      />
    </View>
  );
};

export default AnimatedProgressBar;

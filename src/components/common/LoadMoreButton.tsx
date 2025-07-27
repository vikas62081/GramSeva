import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

interface LoadMoreButtonProps {
  onPress: () => void;
  isLoading: boolean;
  hasMore: boolean;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  onPress,
  isLoading,
  hasMore,
}) => {
  if (!hasMore) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Button
        mode="elevated"
        onPress={onPress}
        disabled={isLoading}
        loading={isLoading}
        icon="arrow-down-circle-outline">
        Load More
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    alignItems: 'center',
  },
});

export default LoadMoreButton;

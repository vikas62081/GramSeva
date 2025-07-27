import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

interface LoadMoreButtonProps {
  onPress: () => void;
  isLoading: boolean;
  disabled?: boolean;
  hasMoreData?: boolean;
  loadingText?: string;
  buttonText?: string;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  onPress,
  isLoading,
  disabled = false,
  hasMoreData = true,
  loadingText = 'Loading...',
  buttonText = 'Load More',
}) => {
  if (!hasMoreData) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Button
        mode="contained-tonal"
        onPress={onPress}
        disabled={disabled || isLoading}
        loading={isLoading}
        style={styles.button}
        labelStyle={styles.label}>
        {isLoading ? loadingText : buttonText}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  button: {
    minWidth: 160,
  },
  label: {},
});

export default LoadMoreButton;

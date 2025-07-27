import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, useTheme, Icon} from 'react-native-paper';

interface EmptyComponentProps {
  message: string;
  icon?: string;
}

const EmptyComponent: React.FC<EmptyComponentProps> = ({
  message,
  icon = 'information-outline',
}) => {
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <Icon source={icon} size={48} color={colors.onSurfaceVariant} />
      <Text
        variant="titleMedium"
        style={[styles.message, {color: colors.onSurfaceVariant}]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  message: {
    textAlign: 'center',
    marginTop: 16,
  },
});

export default EmptyComponent;

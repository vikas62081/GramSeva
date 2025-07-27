import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {Theme} from '../theme';
import Text from './Text';

interface ButtonProps {
  onPress: () => void;
  label: string;
}

const Button: React.FC<ButtonProps> = ({onPress, label}) => {
  const theme = useTheme<Theme>();
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: theme.colors.primary}]}
      onPress={onPress}>
      <Text variant="body" style={{color: theme.colors.mainBackground}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default Button;

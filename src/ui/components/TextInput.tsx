import React from 'react';
import {TextInput as RNTextInput, StyleSheet} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {Theme} from '../theme';

interface TextInputProps extends React.ComponentProps<typeof RNTextInput> {}

const TextInput: React.FC<TextInputProps> = props => {
  const theme = useTheme<Theme>();
  return (
    <RNTextInput
      style={[
        styles.input,
        {
          borderColor: theme.colors.primary,
          color: theme.colors.mainForeground,
        },
      ]}
      placeholderTextColor={theme.colors.primaryLight}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
});

export default TextInput;

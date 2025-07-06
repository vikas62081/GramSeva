import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

interface EmptyComponentProps {
  msg: string;
}

const EmptyComponent: React.FC<EmptyComponentProps> = ({msg}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.message, {color: theme.colors.onSurfaceVariant}]}>
        {msg}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: '20%',
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default EmptyComponent;

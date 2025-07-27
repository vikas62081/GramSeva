import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {useTheme} from 'react-native-paper';

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  children,
  style,
  padding = true,
}) => {
  const {colors} = useTheme();
  const containerStyle = [
    styles.container,
    {backgroundColor: colors.background},
    padding && styles.padding,
    style,
  ];

  return <View style={containerStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  padding: {
    padding: 16,
  },
});

export default Container;

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

interface PillsProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

const Pills: React.FC<PillsProps> = ({options, selectedOption, onSelect}) => {
  return (
    <View style={styles.container}>
      {options.map(option => (
        <Button
          key={option}
          mode={selectedOption === option ? 'contained' : 'outlined'}
          style={[styles.pill]}
          onPress={() => onSelect(option)}>
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </Button>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
  },
  pill: {
    flex: 1,
    padding: 2,
  },
});

export default Pills;

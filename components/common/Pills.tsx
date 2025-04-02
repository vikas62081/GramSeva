import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface PillsProps {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
}

const Pills: React.FC<PillsProps> = ({options, selectedOption, onSelect}) => {
  return (
    <View style={styles.container}>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          style={[styles.pill, selectedOption === option && styles.activePill]}
          onPress={() => onSelect(option)}>
          <Text
            style={[
              styles.pillText,
              selectedOption === option && styles.activePillText,
            ]}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </Text>
        </TouchableOpacity>
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
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
  },
  activePill: {
    backgroundColor: '#63C7A6',
    borderColor: '#63C7A6',
  },
  pillText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activePillText: {
    color: '#ffffff',
  },
});

export default Pills;

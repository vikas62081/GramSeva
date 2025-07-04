import {Avatar, List, Text} from 'react-native-paper';
import {formatCurrency, formatDate} from '../../../../utils';
import {Expense} from '../../types';
import {StyleSheet} from 'react-native';
import React from 'react';

interface ExpenseItemProps {
  item: Expense;
  onPress: (item: Expense) => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({item, onPress}) => {
  return (
    <List.Item
      title={item.item}
      description={formatDate(item.created_at!)}
      onPress={() => onPress(item)}
      left={props => <Avatar.Icon icon="receipt" size={40} />}
      right={() => (
        <Text style={styles.costText}>{formatCurrency(item.cost)}</Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  costText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#DC3545',
  },
});

export default ExpenseItem;

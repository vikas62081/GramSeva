import {Avatar, List, Text} from 'react-native-paper';
import {formatCurrency, formatDate} from '../../../../utils';
import {Contributor} from '../../types';
import {StyleSheet} from 'react-native';
import React from 'react';

interface ContributorItemProps {
  item: Contributor;
  onPress: (item: Contributor) => void;
}
const ContributorItem: React.FC<ContributorItemProps> = ({item, onPress}) => {
  return (
    <List.Item
      title={item.name}
      description={formatDate(item.created_at!)}
      onPress={() => onPress(item)}
      left={props => <Avatar.Icon icon="person" size={40} />}
      right={() => (
        <Text style={styles.amountText}>{formatCurrency(item.amount)}</Text>
      )}
    />
  );
};

export default ContributorItem;

const styles = StyleSheet.create({
  amountText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#28A745',
  },
});

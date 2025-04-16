import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Text, Divider, ProgressBar, MD3Colors} from 'react-native-paper';
import {Event_} from '../types';

interface OverviewProps {
  event: Event_;
}

const Overview: React.FC<OverviewProps> = ({event}) => {
  const {
    total_contribution = 0,
    total_expenditure = 0,
    top_contributor,
  } = event || {};

  const balance = total_contribution - total_expenditure;
  const contributionPercent = useMemo(() => {
    if (total_contribution == 0 || total_expenditure == 0) return 0;
    try {
      return (total_expenditure / total_contribution)?.toFixed(2);
    } catch {
      return 0;
    }
  }, [total_expenditure, total_contribution]);
  return (
    <Card style={styles.container}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.heading}>
          Financial Summary
        </Text>
        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Total Contributions</Text>
            <Text style={styles.green}>₹{total_contribution}</Text>
          </View>
          <View>
            <Text style={styles.label}>Total Expenses</Text>
            <Text style={styles.red}>₹{total_expenditure}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label]}>Contributions vs Expenses</Text>
          <Text style={styles.percentText}>
            {Number(contributionPercent) * 100}%
          </Text>
        </View>

        <ProgressBar
          animatedValue={Number(contributionPercent)}
          progress={Number(contributionPercent)}
          color={balance > 0 ? MD3Colors.primary60 : MD3Colors.error60}
        />

        <Text style={[styles.label, {marginTop: 10}]}>Balance</Text>
        <Text style={balance > 0 ? styles.green : styles.red}>₹{balance}</Text>
        <Text variant="titleMedium" style={[styles.heading, {marginTop: 16}]}>
          Top Contributor
        </Text>
        <Text style={styles.label}>Highest contribution to this event</Text>

        <View style={[styles.row, {marginTop: 10}]}>
          <View>
            <Text variant="labelLarge">{top_contributor?.name || 'N/A'}</Text>
            <Text style={styles.label}>Contributed 42% of total</Text>
          </View>
          <Text style={styles.green}>₹{top_contributor?.amount}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default Overview;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
  },
  heading: {
    fontWeight: 'bold',
  },
  label: {
    color: '#6b6b6b',
    fontSize: 14,
  },
  green: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 2,
  },
  red: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  percentText: {
    marginLeft: 8,
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

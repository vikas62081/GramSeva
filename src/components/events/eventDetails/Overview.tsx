import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {Event_} from '../types';
import LazyLoader from '../../common/LazyLoader';

interface OverviewProps {
  event: Event_;
  loading: boolean;
}

const Overview: React.FC<OverviewProps> = ({event, loading}) => {
  const {
    total_contribution = 0,
    total_expenditure = 0,
    top_contributor,
  } = event || {};

  const balance = total_contribution - total_expenditure;
  const contributionPercent = useMemo(() => {
    if (total_contribution == 0 || total_expenditure == 0) return 1;
    try {
      return total_contribution / (total_expenditure + total_contribution);
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
        <LazyLoader loading={loading}>
          <View>
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
              {/* <Text style={styles.percentText}>{contributionPercent}%</Text> */}
            </View>
            {/* <ProgressBar
          animatedValue={Number(contributionPercent)}
          progress={Number(contributionPercent)}
          color={balance > 0 ? MD3Colors.primary60 : MD3Colors.error60}
        /> */}
            <View style={[styles.progressContainer]}>
              <View
                style={[
                  styles.progress,
                  {
                    width: `${Math.min(
                      Number(contributionPercent) * 100,
                      100,
                    )}%`,
                  },
                ]}
              />
            </View>
            <Text style={[styles.label, {marginTop: 10}]}>Balance</Text>
            <Text style={balance > 0 ? styles.green : styles.red}>
              ₹{balance}
            </Text>
            {top_contributor?.amount ? (
              <View>
                <Text
                  variant="titleMedium"
                  style={[styles.heading, {marginTop: 16}]}>
                  Top Contributor
                </Text>
                <View style={[{marginTop: 10}]}>
                  <Text style={styles.label}>
                    <Text variant="labelLarge">
                      {top_contributor?.name || 'N/A'}
                    </Text>{' '}
                    is the top contributor to this event with a{' '}
                    <Text variant="labelLarge">
                      {(
                        (top_contributor?.amount / total_contribution) *
                        100
                      ).toFixed(0)}
                      %{` `}
                    </Text>
                    share of the total contributions.{' '}
                  </Text>

                  {/* <Text style={styles.green}>₹{top_contributor?.amount}</Text> */}
                </View>
              </View>
            ) : (
              <></>
            )}
          </View>
        </LazyLoader>
      </Card.Content>
    </Card>
  );
};

export default Overview;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 12,
    marginHorizontal: 16,
  },
  progressContainer: {
    marginTop: 4,
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
    height: 4,
    backgroundColor: 'red',
  },
  progress: {
    height: '100%',
    backgroundColor: 'green',
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

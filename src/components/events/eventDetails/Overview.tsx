import React, {useMemo, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Text} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Event_} from '../types';
import LazyLoader from '../../common/LazyLoader';
import {formatCurrency} from '../../../utils';
import AnimatedProgressBar from '../../common/AnimatedProgressBar';

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

  const [animatedPercent, setAnimatedPercent] = useState(0);
  useEffect(() => {
    if (loading) {
      setAnimatedPercent(0);
    } else {
      setAnimatedPercent(Math.min(Number(contributionPercent), 1));
    }
  }, [loading, contributionPercent]);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerAccent}>
        <Text style={styles.headerText}>Financial Summary</Text>
      </View>
      <Card.Content>
        <LazyLoader loading={loading}>
          <View>
            <View style={styles.gridRow}>
              <View style={styles.gridItem}>
                <MaterialIcons
                  name="account-balance-wallet"
                  size={28}
                  color="#388e3c"
                  style={styles.icon}
                />
                <Text style={styles.gridLabel}>Contributions</Text>
                <Text style={styles.gridValueGreen}>
                  {formatCurrency(total_contribution)}
                </Text>
              </View>
              <View style={styles.gridItem}>
                <MaterialIcons
                  name="money-off"
                  size={28}
                  color="#d32f2f"
                  style={styles.icon}
                />
                <Text style={styles.gridLabel}>Expenses</Text>
                <Text style={styles.gridValueRed}>
                  {formatCurrency(total_expenditure)}
                </Text>
              </View>
              <View style={styles.gridItem}>
                <MaterialIcons
                  name={balance >= 0 ? 'trending-up' : 'trending-down'}
                  size={28}
                  color={balance >= 0 ? '#388e3c' : '#d32f2f'}
                  style={styles.icon}
                />
                <Text style={styles.gridLabel}>Balance</Text>
                <Text
                  style={
                    balance >= 0 ? styles.gridValueGreen : styles.gridValueRed
                  }>
                  {formatCurrency(balance)}
                </Text>
              </View>
            </View>
            <View style={styles.progressSection}>
              <View style={styles.progressLabelRow}>
                <MaterialIcons
                  name="pie-chart"
                  size={20}
                  color="#1976d2"
                  style={styles.icon}
                />
                <Text style={styles.progressLabel}>
                  Contributions vs Expenses
                </Text>
                <Text style={styles.percentText}>
                  {(contributionPercent * 100).toFixed(0)}%
                </Text>
              </View>
              <AnimatedProgressBar
                progress={animatedPercent}
                height={8}
                backgroundColor="#e0e0e0"
                barColor={balance >= 0 ? '#388e3c' : '#d32f2f'}
                style={{marginTop: 2}}
              />
            </View>
            {top_contributor?.amount ? (
              <>
                <View style={styles.divider} />
                <View style={styles.topContributorSection}>
                  <MaterialIcons
                    name="star"
                    size={24}
                    color="#fbc02d"
                    style={styles.icon}
                  />
                  <View>
                    <Text
                      variant="titleMedium"
                      style={[styles.heading, {marginLeft: 4}]}>
                      Top Contributor
                    </Text>
                    <Text style={styles.topContributorText}>
                      <Text style={styles.topContributorName}>
                        {top_contributor?.name || 'N/A'}
                      </Text>{' '}
                      contributed{' '}
                      <Text style={styles.topContributorAmount}>
                        {formatCurrency(top_contributor?.amount)}
                      </Text>{' '}
                      (
                      <Text style={styles.topContributorPercent}>
                        {(
                          (top_contributor?.amount / total_contribution) *
                          100
                        ).toFixed(0)}
                        %
                      </Text>
                      ) of total contributions.
                    </Text>
                  </View>
                </View>
              </>
            ) : null}
          </View>
        </LazyLoader>
      </Card.Content>
    </View>
  );
};

export default Overview;

const styles = StyleSheet.create({
  cardContainer: {
    // margin: 8,
    // borderRadius: 16,
    // backgroundColor: '#fff',
    // elevation: 3,
    // overflow: 'hidden',
  },
  headerAccent: {
    // backgroundColor: '#1976d2',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  headerText: {
    // color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.2,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
    marginBottom: 10,
    gap: 1,
  },
  gridItem: {
    flex: 1,
    alignItems: 'center',
  },
  gridLabel: {
    color: '#6b6b6b',
    fontSize: 13,
    marginTop: 2,
  },
  gridValueGreen: {
    color: '#388e3c',
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 2,
  },
  gridValueRed: {
    color: '#d32f2f',
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 2,
  },
  progressSection: {
    marginTop: 8,
    marginBottom: 8,
  },
  progressLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  progressLabel: {
    color: '#1976d2',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 2,
  },
  percentText: {
    marginLeft: 8,
    fontWeight: 'bold',
    color: '#1976d2',
    fontSize: 14,
  },
  progressBarBg: {
    width: '100%',
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 2,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 6,
    backgroundColor: '#388e3c',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 14,
    marginHorizontal: -16,
  },
  topContributorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffbe6',
    borderRadius: 10,
    padding: 10,
    marginTop: 2,
    marginBottom: 2,
    gap: 10,
  },
  topContributorText: {
    color: '#6b6b6b',
    fontSize: 14,
    marginTop: 2,
    marginRight: 2,
  },
  topContributorName: {
    color: '#1976d2',
    fontWeight: 'bold',
    fontSize: 15,
  },
  topContributorAmount: {
    color: '#388e3c',
    fontWeight: 'bold',
    fontSize: 15,
  },
  topContributorPercent: {
    color: '#fbc02d',
    fontWeight: 'bold',
    fontSize: 15,
  },
  icon: {
    marginRight: 4,
  },
  heading: {
    fontWeight: 'bold',
  },
});

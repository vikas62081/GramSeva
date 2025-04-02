import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {OverviewProps, Contributor, Expense} from '../types';
import {formatDate} from '../../../utils';

const Overview: React.FC<OverviewProps> = ({event}) => {
  const calculateTotalContributions = () => {
    return event.contributors.reduce(
      (sum: number, contributor: Contributor) => sum + contributor.amount,
      0,
    );
  };

  const calculateTotalExpenses = () => {
    return event.expenses.reduce(
      (sum: number, expense: Expense) => sum + expense.amount,
      0,
    );
  };

  const getHighestContributor = () => {
    if (event.contributors.length === 0) return null;
    return event.contributors.reduce((max: Contributor, current: Contributor) =>
      current.amount > max.amount ? current : max,
    );
  };

  const totalContributions = calculateTotalContributions();
  const totalExpenses = calculateTotalExpenses();
  const highestContributor = getHighestContributor();

  return (
    <View style={styles.container}>
      <View style={styles.dashboard}>
        <View style={styles.dashboardCard}>
          <View style={styles.cardHeader}>
            <MaterialIcons
              name="account-balance-wallet"
              size={24}
              color="#4CAF50"
            />
            <Text style={styles.cardTitle}>Contributions</Text>
          </View>
          <Text style={styles.cardAmount}>₹{totalContributions}</Text>
          {highestContributor && (
            <Text style={styles.cardSubtext}>
              Highest: {highestContributor.name} (₹{highestContributor.amount})
            </Text>
          )}
        </View>

        <View style={styles.dashboardCard}>
          <View style={styles.cardHeader}>
            <MaterialIcons name="receipt" size={24} color="#FF6B6B" />
            <Text style={styles.cardTitle}>Expenses</Text>
          </View>
          <Text style={styles.cardAmount}>₹{totalExpenses}</Text>
          <Text style={styles.cardSubtext}>
            Balance: ₹{totalContributions - totalExpenses}
          </Text>
        </View>
      </View>

      <View style={styles.detailsSection}>
        <Text style={styles.sectionTitle}>Event Details</Text>
        <View style={styles.detailRow}>
          <MaterialIcons name="event" size={20} color="#666" />
          <Text style={styles.detailText}>{formatDate(event.date)}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="schedule" size={20} color="#666" />
          <Text style={styles.detailText}>{event.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="location-on" size={20} color="#666" />
          <Text style={styles.detailText}>{event.venue}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons name="person" size={20} color="#666" />
          <Text style={styles.detailText}>{event.eventHead}</Text>
        </View>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{event.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  dashboard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  dashboardCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  cardAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  cardSubtext: {
    fontSize: 14,
    color: '#666',
  },
  detailsSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  descriptionSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});

export default Overview;

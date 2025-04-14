import React from 'react';
import {StyleSheet, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Text, Paragraph, Divider} from 'react-native-paper';
import {OverviewProps, Contributor} from '../types';
import {formatDate, getTime} from '../../../utils';

const Overview: React.FC<OverviewProps> = ({event}) => {
  const calculateTotalContributions = () => 100;
  const calculateTotalExpenses = () => 200;

  const getHighestContributor = () => {
    return null;
    if (event.contributors.length === 0) return null;
    return event.contributors.reduce((max: Contributor, current: Contributor) =>
      current.amount > max.amount ? current : max,
    );
  };

  const totalContributions = calculateTotalContributions();
  const totalExpenses = calculateTotalExpenses();
  const highestContributor = getHighestContributor();
  const balance = totalContributions - totalExpenses;

  return (
    <View style={styles.container}>
      {/* Summary Section */}
      <Text style={styles.sectionTitle}>Summary</Text>
      <Divider style={styles.divider} />

      <View style={styles.block}>
        <StatRow
          icon="account-balance-wallet"
          label="Contributions"
          value={`₹${totalContributions}`}
          color="#4CAF50"
        />
        {highestContributor && (
          <Text style={styles.subText}>
            Highest: {highestContributor.name} (₹{highestContributor.amount})
          </Text>
        )}
        <StatRow
          icon="receipt"
          label="Expenses"
          value={`₹${totalExpenses}`}
          color="#FF6B6B"
        />
        <StatRow
          icon="account-balance"
          label="Balance"
          value={`₹${balance}`}
          color={balance >= 0 ? '#4CAF50' : '#FF6B6B'}
        />
      </View>

      {/* Event Details */}
      <Text style={styles.sectionTitle}>Event Details</Text>
      <Divider style={styles.divider} />
      <View style={styles.block}>
        <DetailItem icon="event" text={formatDate(event.date)} />
        <DetailItem icon="schedule" text={getTime(event.date)} />
        <DetailItem icon="location-on" text={event.venue} />
        <DetailItem icon="person" text={event.eventHead.name} />
      </View>

      {/* Description */}
      <Text style={styles.sectionTitle}>Description</Text>
      <Divider style={styles.divider} />
      <View style={styles.block}>
        <Paragraph>{event.description}</Paragraph>
      </View>
    </View>
  );
};

const StatRow = ({
  icon,
  label,
  value,
  color,
}: {
  icon: string;
  label: string;
  value: string;
  color: string;
}) => (
  <View style={styles.statRow}>
    <MaterialIcons name={icon} size={20} color={color} />
    <Text variant="bodyMedium">
      {label}: <Text style={{color}}>{value}</Text>
    </Text>
  </View>
);

const DetailItem = ({icon, text}: {icon: string; text: string}) => (
  <View style={styles.detailRow}>
    <MaterialIcons name={icon} size={20} color="#666" />
    <Text variant="bodyMedium">{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 6,
  },
  divider: {
    marginBottom: 4,
  },
  block: {
    borderRadius: 8,
    padding: 12,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  statText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
  },
  subText: {
    fontSize: 14,
    marginLeft: 28,
    color: '#666',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 12,
  },

  paragraph: {
    fontSize: 15,
    color: '#444',
  },
});

export default Overview;

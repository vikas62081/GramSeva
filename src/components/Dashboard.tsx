import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
  Text,
  useTheme,
  ProgressBar,
  IconButton,
  ActivityIndicator,
  Button,
  Avatar,
  Appbar,
} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CommonActions} from '@react-navigation/native';
import {useDashboard} from '../hooks/useDashboard';
import {useAuth} from '../context/AuthContext';
import {formatCurrency} from '../utils';

export type TabParamList = {
  Home: undefined;
  Family: undefined;
  Events: undefined;
};

interface DashboardProps {
  navigation: any;
}

const Dashboard = ({navigation}: DashboardProps) => {
  const {colors} = useTheme();
  const {user} = useAuth();

  const {familiesOverview, latestEvent, ui, latestEventData} = useDashboard();

  const avatarUri = user?.name
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.name,
      )}&background=4a90e2&color=fff&size=128`
    : 'https://ui-avatars.com/api/?name=User&background=4a90e2&color=fff&size=128';

  if (ui.loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={{marginTop: 12}}>Loading dashboard...</Text>
      </View>
    );
  }
  if (ui.error) {
    return (
      <View style={styles.centered}>
        <Text style={{color: 'red', marginBottom: 8}}>
          Failed to load dashboard.
        </Text>
        <Button mode="contained" onPress={ui.onRefresh}>
          Retry
        </Button>
        {/* {ui.errorMessage && (
          <Text style={{marginTop: 8, color: '#888', fontSize: 12}}>
            {ui.errorMessage}
          </Text>
        )} */}
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={ui.refreshing} onRefresh={ui.onRefresh} />
      }>
      <Appbar.Header
        style={{
          height: 100,
          paddingHorizontal: 12,
        }}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Avatar.Image source={{uri: avatarUri}} size={48} />
          </TouchableOpacity>
          <View style={{flex: 1, marginLeft: 12}}>
            <Text
              variant="titleLarge"
              numberOfLines={1}
              style={styles.greeting}>
              Welcome back, {user?.name?.split(' ')?.[0] || 'User'}!
            </Text>
            <Text variant="bodySmall" style={{color: '#888'}}>
              Your village at a glance
            </Text>
          </View>
          <IconButton
            icon="notifications-none"
            size={26}
            onPress={() => {}}
            accessibilityLabel="Notifications"
          />
        </View>
      </Appbar.Header>
      {/* Village Statistics Card */}
      <Card style={[styles.card, styles.cardVillage]}>
        <Card.Content style={styles.cardContent}>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Village Statistics
          </Text>
          <View style={styles.statsGrid}>
            <View style={styles.statsGridRow}>
              <View style={styles.statsBoxFour}>
                {/* <MaterialIcons
                  name="groups"
                  size={40}
                  color={colors.primary}
                  style={styles.iconNoBg}
                /> */}
                <Text style={styles.statsLabelFour}>Population</Text>
                <Text style={styles.statsValueFour}>
                  {familiesOverview.population}
                </Text>
              </View>
              <View style={styles.statsBoxFour}>
                {/* <MaterialIcons
                  name="holiday-village"
                  size={40}
                  color="#ff9800"
                  style={styles.iconNoBg}
                /> */}
                <Text style={styles.statsLabelFour}>Families</Text>
                <Text style={styles.statsValueFour}>
                  {familiesOverview.families}
                </Text>
              </View>
            </View>
            <View style={styles.statsGridRow}>
              <View style={styles.statsBoxFour}>
                {/* <MaterialIcons
                  name="child-care"
                  size={40}
                  color="#4caf50"
                  style={styles.iconNoBg}
                /> */}
                <Text style={styles.statsLabelFour}>Children</Text>
                <Text style={styles.statsValueFour}>
                  {familiesOverview.demographics.children}
                </Text>
              </View>
              <View style={styles.statsBoxFour}>
                {/* <MaterialIcons
                  name="wc"
                  size={40}
                  color="#4caf50"
                  style={styles.iconNoBg}
                /> */}
                <Text style={styles.statsLabelFour}>Gender Ratio</Text>
                <View style={styles.sexRatioRow}>
                  <View style={styles.sexBadgeMale}>
                    <Text style={styles.sexBadgeText}>
                      M {familiesOverview.genderDistribution.malePercent}%
                    </Text>
                  </View>
                  <View style={styles.sexBadgeFemale}>
                    <Text style={styles.sexBadgeText}>
                      F {familiesOverview.genderDistribution.femalePercent}%
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Button
              compact
              icon="arrow-forward"
              contentStyle={{
                flexDirection: 'row-reverse',
                justifyContent: 'space-between',
              }}
              onPress={() => navigation.navigate('Family')}>
              View More
            </Button>
          </View>
        </Card.Content>
      </Card>
      {/* Event & Expenses Card */}
      <Card style={[styles.card, styles.cardEvent]}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.eventHeaderRow}>
            <Text variant="titleMedium" style={styles.cardTitle}>
              Event
            </Text>
            <View
              style={[
                styles.statusBadge,
                latestEvent.status === 'Current'
                  ? styles.current
                  : latestEvent.status === 'Upcoming'
                  ? styles.upcoming
                  : styles.last,
                styles.eventStatusModern,
              ]}>
              <Text style={styles.statusBadgeText}>{latestEvent.status}</Text>
            </View>
          </View>
          <Text style={styles.eventName}>{latestEvent.title}</Text>
          <View style={styles.eventDetailsModern}>
            <View style={styles.eventDetailItem}>
              <MaterialIcons
                name="calendar-month"
                size={28}
                color="#1976d2"
                style={styles.iconNoBg}
              />
              <Text style={styles.eventDetailModern}>{latestEvent.date}</Text>
            </View>
            <View style={styles.eventDetailItem}>
              <MaterialIcons
                name="supervisor-account"
                size={28}
                color="#8e24aa"
                style={styles.iconNoBg}
              />
              <Text style={styles.eventDetailModern}>{latestEvent.head}</Text>
            </View>
          </View>
          <View style={styles.eventDivider} />
          <View style={styles.expenseRowModern}>
            <View style={styles.expenseBoxModern}>
              <Text style={styles.expenseLabelModern}>Contribution</Text>
              <Text style={[styles.expenseValueModern, {color: '#388e3c'}]}>
                {formatCurrency(latestEvent.finances.contribution)}
              </Text>
            </View>
            <View style={styles.expenseBoxModern}>
              <Text style={styles.expenseLabelModern}>Expense</Text>
              <Text style={[styles.expenseValueModern, {color: '#e53935'}]}>
                {formatCurrency(latestEvent.finances.expense)}
              </Text>
            </View>
          </View>
          <ProgressBar
            progress={latestEvent.finances.fundingProgress}
            color="#388e3c"
            style={{
              height: 8,
              borderRadius: 4,
              marginTop: 8,
              backgroundColor: '#f5f7fa',
            }}
          />
          <View style={{alignItems: 'flex-end'}}>
            <Button
              compact
              icon="arrow-forward"
              contentStyle={{
                flexDirection: 'row-reverse',
                justifyContent: 'space-between',
              }}
              onPress={() => {
                if (latestEventData) {
                  navigation.push('LatestEvent', {event: latestEventData});
                } else {
                  navigation.navigate('Events');
                }
              }}>
              View More
            </Button>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  card: {
    borderRadius: 12,
    elevation: 1,
    marginBottom: 20,
    paddingVertical: 4,
    // backgroundColor: '#f5f7fa',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ede7f6',
  },
  cardVillage: {
    marginTop: 8,
    backgroundColor: '#f9f6ff',
  },
  cardEvent: {
    marginTop: 8,
    backgroundColor: '#f6f3ff',
  },
  cardContent: {
    justifyContent: 'center',
    paddingVertical: 8,
  },

  eventHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  eventStatusModern: {
    marginLeft: 8,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 14,
    elevation: 1,
  },
  eventDetailsModern: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 2,
    marginBottom: 2,
  },
  eventDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginRight: 12,
  },
  eventDetailModern: {
    color: '#555',
    fontSize: 14,
    marginLeft: 4,
    fontWeight: '500',
  },
  eventDivider: {
    height: 1,
    backgroundColor: '#e1e1e1',
    marginVertical: 8,
    borderRadius: 1,
    opacity: 0.5,
  },
  expenseRowModern: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
    marginBottom: 2,
    gap: 12,
  },
  expenseBoxModern: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 6,
    marginHorizontal: 2,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 1},
  },
  expenseLabelModern: {
    color: '#888',
    fontSize: 12,
    marginBottom: 2,
    fontWeight: '500',
  },
  expenseValueModern: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 1,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  // New styles for 2x2 grid
  statsGrid: {
    flexDirection: 'column',
    gap: 8,
    marginTop: 4,
    marginBottom: 8,
  },
  statsGridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  // New styles for the four-stat row
  statsRowFour: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginTop: 4,
    gap: 4,
  },
  statsBoxFour: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 1},
    minWidth: 70,
  },
  iconNoBg: {
    marginBottom: 2,
    marginTop: 2,
  },
  iconCircleFour: {
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  statsLabelFour: {
    color: '#888',
    fontSize: 14,
    // marginTop: 2,
    marginBottom: 2,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  statsValueFour: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
    marginTop: 1,
  },
  // End new styles

  // Sex ratio badges
  sexRatioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 2,
  },
  sexBadgeMale: {
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 4,
    minWidth: 44,
    alignItems: 'center',
  },
  sexBadgeFemale: {
    backgroundColor: '#fce4ec',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 44,
    alignItems: 'center',
  },
  sexBadgeText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#1976d2',
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginTop: 4,
  },
  statsBox: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
    paddingVertical: 4,
  },
  statsLabel: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
  statsValue: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#222',
    marginTop: 2,
  },
  ageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 4,
  },
  ageBox: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
    paddingVertical: 2,
  },
  ageLabel: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
  ageValue: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
    marginTop: 2,
  },
  iconCircle: {
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  statusBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  current: {
    backgroundColor: '#388e3c',
  },
  upcoming: {
    backgroundColor: '#1976d2',
  },
  last: {
    backgroundColor: '#e53935',
  },
  eventName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
    color: '#222',
    marginTop: 2,
  },
  eventDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 2,
  },
  eventDetail: {
    color: '#555',
    fontSize: 14,
    marginLeft: 4,
    marginRight: 8,
  },
  expenseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 2,
  },
  expenseBox: {
    flex: 1,
    alignItems: 'center',
  },
  expenseLabel: {
    color: '#888',
    fontSize: 12,
  },
  expenseValue: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 2,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Dashboard;

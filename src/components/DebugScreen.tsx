import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {
  Card,
  Text,
  useTheme,
  Button,
  Divider,
  List,
  Chip,
  Banner,
  Appbar,
} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useAuth} from '../context/AuthContext';
import {useDashboard} from '../hooks/useDashboard';
import PageHeader from './common/PageHeader';

const DebugScreen = () => {
  const {colors} = useTheme();
  const {user} = useAuth();
  const {familiesOverview, latestEvent, ui, latestEventData} = useDashboard();

  const debugInfo = {
    environment: __DEV__ ? 'Development' : 'Production',
    platform: require('react-native').Platform.OS,
    version: '1.0.0',
    buildNumber: '1',
    deviceInfo: {
      brand: require('react-native').Platform.constants?.Brand || 'Unknown',
      model: require('react-native').Platform.constants?.Model || 'Unknown',
    },
  };

  const handleClearStorage = async () => {
    try {
      const AsyncStorage =
        require('@react-native-async-storage/async-storage').default;
      await AsyncStorage.clear();
      console.log('Storage cleared successfully');
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  };

  const handleTestAPI = () => {
    console.log('Testing API connection...');
    // Add API test logic here
  };

  return (
    <ScrollView style={styles.container}>
      {/* Debug Banner */}
      <Appbar.Header>
        <Appbar.Content title={'DEV ENV'} />
      </Appbar.Header>
      {/* Environment Info */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Environment Information
          </Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Environment</Text>
              <Chip
                mode="outlined"
                textStyle={{color: __DEV__ ? '#388e3c' : '#e53935'}}
                style={[
                  styles.chip,
                  {borderColor: __DEV__ ? '#388e3c' : '#e53935'},
                ]}>
                {debugInfo.environment}
              </Chip>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Platform</Text>
              <Chip mode="outlined" style={styles.chip}>
                {debugInfo.platform}
              </Chip>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Version</Text>
              <Chip mode="outlined" style={styles.chip}>
                {debugInfo.version}
              </Chip>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Build</Text>
              <Chip mode="outlined" style={styles.chip}>
                {debugInfo.buildNumber}
              </Chip>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* User Information */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            User Information
          </Text>
          <List.Item
            title="User ID"
            description={user?.id || 'Not logged in'}
            left={props => <List.Icon {...props} icon="account" />}
          />
          <List.Item
            title="Name"
            description={user?.name || 'N/A'}
            left={props => <List.Icon {...props} icon="account-circle" />}
          />
          <List.Item
            title="Email"
            description={user?.email || 'N/A'}
            left={props => <List.Icon {...props} icon="email" />}
          />
          <List.Item
            title="Role"
            description={user?.role || 'N/A'}
            left={props => <List.Icon {...props} icon="security" />}
          />
        </Card.Content>
      </Card>

      {/* Dashboard Data */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Dashboard Data Status
          </Text>
          <List.Item
            title="Loading State"
            description={ui.loading ? 'Loading...' : 'Loaded'}
            left={props => (
              <List.Icon
                {...props}
                icon={ui.loading ? 'loading' : 'check-circle'}
                color={ui.loading ? '#ff9800' : colors.primary}
              />
            )}
          />
          <List.Item
            title="Error State"
            description={ui.error ? 'Error occurred' : 'No errors'}
            left={props => (
              <List.Icon
                {...props}
                icon={ui.error ? 'error' : 'check-circle'}
                color={ui.error ? colors.error : colors.primary}
              />
            )}
          />
          <List.Item
            title="Latest Event"
            description={latestEventData ? 'Available' : 'Not available'}
            left={props => (
              <List.Icon
                {...props}
                icon={latestEventData ? 'event' : 'event-busy'}
                color={latestEventData ? colors.primary : colors.error}
              />
            )}
          />
        </Card.Content>
      </Card>

      {/* Debug Actions */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Debug Actions
          </Text>
          <View style={styles.buttonGrid}>
            <Button
              mode="outlined"
              icon="database-remove"
              onPress={handleClearStorage}
              style={styles.actionButton}>
              Clear Storage
            </Button>
            <Button
              mode="outlined"
              icon="api"
              onPress={handleTestAPI}
              style={styles.actionButton}>
              Test API
            </Button>
            <Button
              mode="outlined"
              icon="refresh"
              onPress={ui.onRefresh}
              style={styles.actionButton}>
              Refresh Data
            </Button>
            <Button
              mode="outlined"
              icon="console"
              onPress={() => console.log('Debug log test')}
              style={styles.actionButton}>
              Test Console
            </Button>
          </View>
        </Card.Content>
      </Card>

      {/* Device Information */}
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Device Information
          </Text>
          <List.Item
            title="Brand"
            description={debugInfo.deviceInfo.brand}
            left={props => <List.Icon {...props} icon="phone" />}
          />
          <List.Item
            title="Model"
            description={debugInfo.deviceInfo.model}
            left={props => <List.Icon {...props} icon="devices" />}
          />
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  debugBanner: {
    backgroundColor: '#fff3cd',
    borderColor: '#ffeaa7',
    borderWidth: 1,
    marginHorizontal: 12,
    marginTop: 8,
    marginBottom: 8,
  },
  card: {
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 1,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  infoItem: {
    flex: 1,
    minWidth: '45%',
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  chip: {
    alignSelf: 'flex-start',
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    minWidth: '45%',
  },
});

export default DebugScreen;

import React from 'react';
import {ScrollView, StyleSheet, RefreshControl} from 'react-native';
import {List, Divider, Text, Card} from 'react-native-paper';
import {useAuth} from '../context/AuthContext';
import PageHeader from '../components/common/PageHeader';
import {useHideTabBar} from '../hooks/ useHideTabBar';
import {formatDate, getRoleInfo, getStatusInfo} from '../utils';
import {useUserRefresh} from '../hooks/useUserRefresh';
import Container from '../components/common/Container';

const AccountInfoScreen = ({navigation}: any) => {
  useHideTabBar();
  const {user} = useAuth();
  const {refreshing, onRefresh} = useUserRefresh();

  if (!user) {
    return (
      <Container style={styles.centered}>
        <Text variant="titleMedium">No user data available.</Text>
      </Container>
    );
  }

  const {label: roleLabel, color: roleColor} = getRoleInfo(user.role);
  const {label: statusLabel, color: statusColor} = getStatusInfo(user.status);

  return (
    <>
      <PageHeader
        title="Account Information"
        onBack={() => navigation?.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Container style={styles.container}>
          <Card>
            <List.Section>
              <List.Subheader>Personal Details</List.Subheader>
              <List.Item
                title="Name"
                description={user.name}
                left={props => <List.Icon {...props} icon="account" />}
              />
              <Divider />
              <List.Item
                title="Phone"
                description={user.phone}
                left={props => <List.Icon {...props} icon="phone" />}
              />
              <Divider />
              <List.Item
                title="Email"
                description={user.email || 'Not provided'}
                left={props => <List.Icon {...props} icon="email" />}
              />
              <Divider />
              <List.Item
                title="Gender"
                description={user.gender || 'Not specified'}
                left={props => <List.Icon {...props} icon="gender-male-female" />}
              />
            </List.Section>
          </Card>

          <Card style={styles.card}>
            <List.Section>
              <List.Subheader>Account Status</List.Subheader>
              <List.Item
                title="Role"
                description={roleLabel}
                descriptionStyle={{color: roleColor}}
                left={props => (
                  <List.Icon {...props} icon="security" color={roleColor} />
                )}
              />
              <Divider />
              <List.Item
                title="Status"
                description={statusLabel}
                descriptionStyle={{color: statusColor}}
                left={props => (
                  <List.Icon {...props} icon="circle" color={statusColor} />
                )}
              />
            </List.Section>
          </Card>

          <Card style={styles.card}>
            <List.Section>
              <List.Subheader>Timestamps</List.Subheader>
              <List.Item
                title="Joined On"
                description={formatDate(user.created_at)}
                left={props => <List.Icon {...props} icon="calendar-plus" />}
              />
              <Divider />
              <List.Item
                title="Last Updated"
                description={formatDate(user.updated_at)}
                left={props => <List.Icon {...props} icon="calendar-clock" />}
              />
            </List.Section>
          </Card>
        </Container>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
});

export default AccountInfoScreen;

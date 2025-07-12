import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {List, Divider, useTheme} from 'react-native-paper';
import {useAuth} from '../context/AuthContext';
import PageHeader from '../components/common/PageHeader';
import {useHideTabBar} from '../hooks/ useHideTabBar';
import {formatDate} from '../utils';

const AccountInfoScreen = ({navigation}: any) => {
  useHideTabBar();
  const theme = useTheme();
  const {user} = useAuth();

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return theme.colors.primary;
      case 'inactive':
        return theme.colors.error;
      default:
        return theme.colors.outline;
    }
  };

  const getRoleInfo = (role?: string) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return {
          label: 'Admin',
          color: theme.colors.error,
          backgroundColor: theme.colors.errorContainer,
        };
      case 'viewer':
        return {
          label: 'User',
          color: theme.colors.primary,
          backgroundColor: theme.colors.primaryContainer,
        };
      default:
        return {
          label: role || 'User',
          color: theme.colors.outline,
          backgroundColor: theme.colors.surfaceVariant,
        };
    }
  };

  if (!user) {
    return (
      <View
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <List.Item
          title="No user data available"
          titleStyle={[styles.errorText, {color: theme.colors.onBackground}]}
        />
      </View>
    );
  }

  const roleInfo = getRoleInfo(user.role);

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.colors.background}]}
      showsVerticalScrollIndicator={false}>
      <PageHeader
        title="Personal Information"
        onBack={() => navigation?.goBack()}
      />
      <List.Section>
        <List.Item
          title="Name"
          description={user.name}
          left={props => <List.Icon {...props} icon="person" />}
          titleStyle={[styles.itemTitle, {color: theme.colors.onSurface}]}
          descriptionStyle={[
            styles.itemDescription,
            {color: theme.colors.onSurfaceVariant},
          ]}
        />
        <Divider />

        <List.Item
          title="Phone"
          description={user.phone}
          left={props => <List.Icon {...props} icon="phone" />}
          titleStyle={[styles.itemTitle, {color: theme.colors.onSurface}]}
          descriptionStyle={[
            styles.itemDescription,
            {color: theme.colors.onSurfaceVariant},
          ]}
        />
        <Divider />

        <List.Item
          title="Email"
          description={user.email || 'Not provided'}
          left={props => <List.Icon {...props} icon="email" />}
          titleStyle={[styles.itemTitle, {color: theme.colors.onSurface}]}
          descriptionStyle={[
            styles.itemDescription,
            {color: theme.colors.onSurfaceVariant},
          ]}
        />
        <Divider />

        <List.Item
          title="Gender"
          description={user.gender || 'Not specified'}
          left={props => <List.Icon {...props} icon="gender-male-female" />}
          titleStyle={[styles.itemTitle, {color: theme.colors.onSurface}]}
          descriptionStyle={[
            styles.itemDescription,
            {color: theme.colors.onSurfaceVariant},
          ]}
        />
      </List.Section>

      <List.Section>
        <List.Subheader
          style={[
            styles.sectionHeader,
            {color: theme.colors.onSurfaceVariant},
          ]}>
          Account Information
        </List.Subheader>

        <List.Item
          title="Role"
          description={roleInfo.label}
          left={props => (
            <List.Icon
              {...props}
              icon="shield-account"
              color={roleInfo.color}
            />
          )}
          titleStyle={[styles.itemTitle, {color: theme.colors.onSurface}]}
          descriptionStyle={[styles.itemDescription, {color: roleInfo.color}]}
        />
        <Divider />

        <List.Item
          title="Status"
          description={user.status?.toUpperCase() || 'UNKNOWN'}
          left={props => (
            <List.Icon
              {...props}
              icon="circle"
              color={getStatusColor(user.status)}
            />
          )}
          titleStyle={[styles.itemTitle, {color: theme.colors.onSurface}]}
          descriptionStyle={[
            styles.itemDescription,
            {color: getStatusColor(user.status)},
          ]}
        />
        <Divider />

        <List.Item
          title="Family ID"
          description={user.family_id || 'Not assigned'}
          left={props => <List.Icon {...props} icon="home" />}
          titleStyle={[styles.itemTitle, {color: theme.colors.onSurface}]}
          descriptionStyle={[
            styles.itemDescription,
            {color: theme.colors.onSurfaceVariant},
          ]}
        />
      </List.Section>

      <List.Section>
        <List.Subheader
          style={[
            styles.sectionHeader,
            {color: theme.colors.onSurfaceVariant},
          ]}>
          Account Details
        </List.Subheader>

        <List.Item
          title="Created"
          description={
            user.created_at ? formatDate(user.created_at) : 'Unknown'
          }
          left={props => <List.Icon {...props} icon="calendar-month" />}
          titleStyle={[styles.itemTitle, {color: theme.colors.onSurface}]}
          descriptionStyle={[
            styles.itemDescription,
            {color: theme.colors.onSurfaceVariant},
          ]}
        />
        <Divider />

        <List.Item
          title="Last Updated"
          description={
            user.updated_at ? formatDate(user.updated_at) : 'Unknown'
          }
          left={props => <List.Icon {...props} icon="calendar-month" />}
          titleStyle={[styles.itemTitle, {color: theme.colors.onSurface}]}
          descriptionStyle={[
            styles.itemDescription,
            {color: theme.colors.onSurfaceVariant},
          ]}
        />
      </List.Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemDescription: {
    fontSize: 14,
    marginTop: 2,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default AccountInfoScreen;

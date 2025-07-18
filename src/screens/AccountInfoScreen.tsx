import React from 'react';
import {View, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {List, Divider, useTheme} from 'react-native-paper';
import {useAuth} from '../context/AuthContext';
import PageHeader from '../components/common/PageHeader';
import {useHideTabBar} from '../hooks/ useHideTabBar';
import {formatDate, getRoleInfo, getStatusColor} from '../utils';
import {useUserRefresh} from '../hooks/useUserRefresh';

const AccountInfoScreen = ({navigation}: any) => {
  useHideTabBar();
  const theme = useTheme();
  const {user} = useAuth();
  const {refreshing, onRefresh} = useUserRefresh();

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

  const roleInfo = getRoleInfo(theme, user.role);

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.colors.background}]}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[theme.colors.primary]}
          tintColor={theme.colors.primary}
        />
      }>
      <PageHeader
        title="Personal Information"
        onBack={() => navigation?.goBack()}
      />
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
        left={props => (
          <List.Icon
            {...props}
            icon={user.gender == 'Male' ? 'man' : 'woman'}
          />
        )}
        titleStyle={[styles.itemTitle, {color: theme.colors.onSurface}]}
        descriptionStyle={[
          styles.itemDescription,
          {color: theme.colors.onSurfaceVariant},
        ]}
      />

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
            <List.Icon {...props} icon="security" color={roleInfo.color} />
          )}
          titleStyle={[styles.itemTitle, {color: theme.colors.onSurface}]}
          descriptionStyle={[styles.itemDescription, {color: roleInfo.color}]}
        />
        <Divider />

        <List.Item
          title="Status"
          description={user.status || 'Unknown'}
          left={props => (
            <List.Icon
              {...props}
              icon="circle"
              color={getStatusColor(theme, user.status)}
            />
          )}
          titleStyle={[styles.itemTitle, {color: theme.colors.onSurface}]}
          descriptionStyle={[
            styles.itemDescription,
            {color: getStatusColor(theme, user.status)},
          ]}
        />
        <Divider />

        {/* <List.Item
          title="Family ID"
          description={user.family_id || 'Not assigned'}
          left={props => <List.Icon {...props} icon="home" />}
          titleStyle={[styles.itemTitle, {color: theme.colors.onSurface}]}
          descriptionStyle={[
            styles.itemDescription,
            {color: theme.colors.onSurfaceVariant},
          ]}
        /> */}
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

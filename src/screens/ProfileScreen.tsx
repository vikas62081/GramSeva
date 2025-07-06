import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {Button, Avatar, Chip, useTheme} from 'react-native-paper';
import {useAuth} from '../context/AuthContext';

const ProfileScreen = () => {
  const theme = useTheme();
  const {user, logout} = useAuth();

  // Generate avatar URI based on user's name
  const avatarUri = user?.name
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.name,
      )}&background=4a90e2&color=fff&size=128`
    : 'https://ui-avatars.com/api/?name=User&background=4a90e2&color=fff&size=128';

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!user) {
    return (
      <View
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <Text style={[styles.errorText, {color: theme.colors.onBackground}]}>
          No user data available
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.avatarContainer}>
        <Avatar.Image source={{uri: avatarUri}} size={80} />
        <Text style={[styles.name, {color: theme.colors.onBackground}]}>
          {user.name}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoSection}>
          <Text
            style={[styles.sectionTitle, {color: theme.colors.onBackground}]}>
            Personal Information
          </Text>

          <View style={styles.infoRow}>
            <Text
              style={[styles.label, {color: theme.colors.onSurfaceVariant}]}>
              Phone
            </Text>
            <Text style={[styles.value, {color: theme.colors.onBackground}]}>
              {user.phone}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text
              style={[styles.label, {color: theme.colors.onSurfaceVariant}]}>
              Email
            </Text>
            <Text style={[styles.value, {color: theme.colors.onBackground}]}>
              {user.email || 'Not provided'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text
              style={[styles.label, {color: theme.colors.onSurfaceVariant}]}>
              Gender
            </Text>
            <Text style={[styles.value, {color: theme.colors.onBackground}]}>
              {user.gender || 'Not specified'}
            </Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text
            style={[styles.sectionTitle, {color: theme.colors.onBackground}]}>
            Account Information
          </Text>

          <View style={styles.infoRow}>
            <Text
              style={[styles.label, {color: theme.colors.onSurfaceVariant}]}>
              Role
            </Text>
            <Chip mode="outlined" compact>
              {user.role || 'User'}
            </Chip>
          </View>

          <View style={styles.infoRow}>
            <Text
              style={[styles.label, {color: theme.colors.onSurfaceVariant}]}>
              Status
            </Text>
            <Chip mode="outlined" compact style={[]}>
              {user.status?.toUpperCase() || 'UNKNOWN'}
            </Chip>
          </View>

          <View style={styles.infoRow}>
            <Text
              style={[styles.label, {color: theme.colors.onSurfaceVariant}]}>
              Family ID
            </Text>
            <Text style={[styles.value, {color: theme.colors.onBackground}]}>
              {user.family_id || 'Not assigned'}
            </Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text
            style={[styles.sectionTitle, {color: theme.colors.onBackground}]}>
            Account Details
          </Text>

          <View style={styles.infoRow}>
            <Text
              style={[styles.label, {color: theme.colors.onSurfaceVariant}]}>
              Created
            </Text>
            <Text style={[styles.value, {color: theme.colors.onBackground}]}>
              {user.created_at ? formatDate(user.created_at) : 'Unknown'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text
              style={[styles.label, {color: theme.colors.onSurfaceVariant}]}>
              Last Updated
            </Text>
            <Text style={[styles.value, {color: theme.colors.onBackground}]}>
              {user.updated_at ? formatDate(user.updated_at) : 'Unknown'}
            </Text>
          </View>
        </View>
      </View>

      <Button
        mode="outlined"
        labelStyle={{fontWeight: 'bold', paddingVertical: 8}}
        style={[styles.logoutBtn]}
        // labelStyle={{color: theme.colors.onError, fontWeight: 'bold'}}
        onPress={logout}>
        Logout
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },

  infoContainer: {
    width: '100%',
    marginBottom: 32,
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 2,
    textAlign: 'right',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  logoutBtn: {
    width: '100%',
    borderRadius: 12,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 50,
  },
});

export default ProfileScreen;

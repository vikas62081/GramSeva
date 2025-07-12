import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {Avatar, Chip, useTheme, List, Divider} from 'react-native-paper';
import {useAuth} from '../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const ProfileScreen = ({navigation}: any) => {
  const theme = useTheme();
  const {user, logout} = useAuth();
  // Generate avatar URI based on user's name
  const avatarUri = user?.name
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.name,
      )}&background=4a90e2&color=fff&size=128`
    : 'https://ui-avatars.com/api/?name=User&background=4a90e2&color=fff&size=128';

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
        <Text style={[styles.errorText, {color: theme.colors.onBackground}]}>
          No user data available
        </Text>
      </View>
    );
  }

  const roleInfo = getRoleInfo(user.role);

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.colors.background}]}
      showsVerticalScrollIndicator={false}>
      {/* Header Section with Avatar, Name, and Role */}
      <View style={styles.headerContainer}>
        <View style={styles.avatarSection}>
          <Avatar.Image source={{uri: avatarUri}} size={100} />
          <View style={styles.roleChipOverlay}>
            <Chip
              mode="flat"
              compact
              style={[
                styles.roleChip,
                {backgroundColor: roleInfo.backgroundColor},
              ]}
              textStyle={{color: roleInfo.color, fontSize: 12}}>
              {roleInfo.label}
            </Chip>
          </View>
        </View>
        <Text style={[styles.name, {color: theme.colors.onBackground}]}>
          {user.name}
        </Text>
        <Text style={[styles.phone, {color: theme.colors.onSurfaceVariant}]}>
          {user.phone}
        </Text>
      </View>

      {/* Menu List */}
      <View style={styles.menuContainer}>
        <List.Section>
          <List.Subheader
            style={[styles.menuHeader, {color: theme.colors.onSurfaceVariant}]}>
            Account
          </List.Subheader>

          {/* Account Info */}
          <List.Item
            title="Account Info"
            description="View full profile details"
            left={props => <List.Icon {...props} icon="account-circle" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={[styles.menuTitle, {color: theme.colors.onSurface}]}
            descriptionStyle={[
              styles.menuDescription,
              {color: theme.colors.onSurfaceVariant},
            ]}
            onPress={() => navigation.navigate('AccountInfo')}
          />
          <Divider />

          {/* New Users */}
          <List.Item
            title="New Users"
            description="Manage user accounts"
            left={props => <List.Icon {...props} icon="manage-accounts" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={[styles.menuTitle, {color: theme.colors.onSurface}]}
            descriptionStyle={[
              styles.menuDescription,
              {color: theme.colors.onSurfaceVariant},
            ]}
            onPress={() => navigation.navigate('Users')}
          />
          <Divider />

          {/* Logout */}
          <List.Item
            title="Logout"
            description="Sign out of your account"
            left={props => (
              <List.Icon {...props} icon="logout" color={theme.colors.error} />
            )}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={[styles.menuTitle, {color: theme.colors.error}]}
            descriptionStyle={[
              styles.menuDescription,
              {color: theme.colors.onSurfaceVariant},
            ]}
            onPress={logout}
          />
        </List.Section>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  avatarSection: {
    position: 'relative',
    marginBottom: 16,
  },
  roleChipOverlay: {
    position: 'absolute',
    bottom: -8,
    right: -8,
  },
  roleChip: {
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  phone: {
    fontSize: 16,
    textAlign: 'center',
  },
  menuContainer: {
    flex: 1,
  },
  menuHeader: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  menuDescription: {
    fontSize: 14,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 50,
  },
});

export default ProfileScreen;

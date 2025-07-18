import React, {useState} from 'react';
import {View, StyleSheet, Text, ScrollView, RefreshControl} from 'react-native';
import {Avatar, Chip, useTheme, List, Divider} from 'react-native-paper';
import {useAuth} from '../context/AuthContext';
import {useUserRefresh} from '../hooks/useUserRefresh';

import {getRoleInfo} from '../utils';
import {useRBAC} from '../context/RBACContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProfileScreen = ({navigation}: any) => {
  const theme = useTheme();
  const {user, logout} = useAuth();
  const {isAdmin} = useRBAC();
  const {refreshing, onRefresh} = useUserRefresh();
  const [loggingOut, setLoggingOut] = useState(false);

  // Generate avatar URI based on user's name
  const avatarUri = user?.name
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.name,
      )}&background=4a90e2&color=fff&size=128`
    : 'https://ui-avatars.com/api/?name=User&background=4a90e2&color=fff&size=128';

  const handleMyFamilyView = () => {
    navigation.push('MyFamilyDetails', {
      familyId: user?.family_id,
    });
  };

  const handleLogout = () => {
    navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
    setLoggingOut(true);
    setTimeout(() => {
      setLoggingOut(false);
      navigation.getParent()?.setOptions({tabBarStyle: undefined});
      logout();
    }, 1500);
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

  const roleInfo = getRoleInfo(theme, user.role);

  return (
    <>
      <LoadingSpinner
        loading={loggingOut}
        text="Logging out"
        backgroundColor="rgba(0, 0, 0, 0.4)">
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
            <Text
              style={[styles.phone, {color: theme.colors.onSurfaceVariant}]}>
              {user.phone}
            </Text>
          </View>

          {/* Menu List */}
          <View style={styles.menuContainer}>
            <List.Section>
              <List.Subheader
                style={[
                  styles.menuHeader,
                  {color: theme.colors.onSurfaceVariant},
                ]}>
                Account
              </List.Subheader>

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
              <List.Item
                title="My Family"
                description="View and manage family details"
                descriptionNumberOfLines={1}
                left={props => <List.Icon {...props} icon="group" />}
                right={props => <List.Icon {...props} icon="chevron-right" />}
                titleStyle={[styles.menuTitle, {color: theme.colors.onSurface}]}
                descriptionStyle={[
                  styles.menuDescription,
                  {color: theme.colors.onSurfaceVariant},
                ]}
                onPress={handleMyFamilyView}
              />
              <Divider />

              {isAdmin && (
                <>
                  <List.Item
                    title="Verify New Users"
                    description="Manage newly registered accounts"
                    left={props => (
                      <List.Icon {...props} icon="manage-accounts" />
                    )}
                    right={props => (
                      <List.Icon {...props} icon="chevron-right" />
                    )}
                    titleStyle={[
                      styles.menuTitle,
                      {color: theme.colors.onSurface},
                    ]}
                    descriptionStyle={[
                      styles.menuDescription,
                      {color: theme.colors.onSurfaceVariant},
                    ]}
                    onPress={() => navigation.navigate('NewUsers')}
                  />
                  <Divider />
                </>
              )}

              {/* Logout */}
              <List.Item
                title="Logout"
                description="Sign out of your account"
                left={props => (
                  <List.Icon
                    {...props}
                    icon="logout"
                    color={theme.colors.error}
                  />
                )}
                right={props => <List.Icon {...props} icon="chevron-right" />}
                titleStyle={[styles.menuTitle, {color: theme.colors.error}]}
                descriptionStyle={[
                  styles.menuDescription,
                  {color: theme.colors.onSurfaceVariant},
                ]}
                onPress={handleLogout}
                disabled={loggingOut}
              />
            </List.Section>
          </View>
        </ScrollView>
      </LoadingSpinner>
    </>
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
  modalOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
});

export default ProfileScreen;

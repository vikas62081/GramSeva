import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Button, Avatar} from 'react-native-paper';
import {useAuth} from '../context/AuthContext';

const ProfileScreen = () => {
  // @ts-ignore
  const theme = require('styled-components').useTheme();
  const colors = theme.colors;
  const {user, logout} = useAuth();

  // Hardcoded fallback user if not logged in
  const profile = user || {
    name: 'John Doe',
    phone: '+91 9876543210',
    email: 'john@example.com',
    gender: 'Male',
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.avatarContainer}>
        <Avatar.Text
          size={80}
          label={profile.name ? profile.name[0] : 'U'}
          style={{backgroundColor: colors.primary}}
          color={colors.onPrimary || '#fff'}
        />
        <Text style={[styles.name, {color: colors.text}]}>{profile.name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.label, {color: colors.subtext}]}>Phone</Text>
        <Text style={[styles.value, {color: colors.text}]}>
          {profile.phone}
        </Text>
        <Text style={[styles.label, {color: colors.subtext}]}>Email</Text>
        <Text style={[styles.value, {color: colors.text}]}>
          {profile.email}
        </Text>
        <Text style={[styles.label, {color: colors.subtext}]}>Gender</Text>
        <Text style={[styles.value, {color: colors.text}]}>
          {profile.gender}
        </Text>
      </View>
      <Button
        mode="contained"
        style={[styles.logoutBtn, {backgroundColor: colors.error}]}
        labelStyle={{color: '#fff', fontWeight: 'bold'}}
        onPress={logout}>
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
  },
  infoContainer: {
    width: '100%',
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    marginTop: 12,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
  },
  logoutBtn: {
    marginTop: 32,
    width: '100%',
    borderRadius: 12,
    paddingVertical: 8,
  },
});

export default ProfileScreen;

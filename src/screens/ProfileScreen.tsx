import React, {useState} from 'react';
import {ScrollView, StyleSheet, RefreshControl, View} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Chip,
  Divider,
  List,
  Text,
  useTheme,
} from 'react-native-paper';
import {useAuth} from '../context/AuthContext';
import {useRBAC} from '../context/RBACContext';
import {useUserRefresh} from '../hooks/useUserRefresh';
import {getRoleInfo} from '../utils';
import Container from '../components/common/Container';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProfileScreen = ({navigation}: any) => {
  const {user, logout} = useAuth();
  const {isAdmin} = useRBAC();
  const {refreshing, onRefresh} = useUserRefresh();
  const [loggingOut, setLoggingOut] = useState(false);
  const {colors} = useTheme();

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(logout, 1500);
  };

  if (!user) {
    return (
      <Container style={styles.centered}>
        <Text variant="titleMedium">No user data available.</Text>
      </Container>
    );
  }

  const {label, backgroundColor, color} = getRoleInfo(user.role);
  const avatarLabel = user.name
    .split(' ')
    .map(n => n[0])
    .join('');

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: colors.background}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Container style={styles.container}>
          <Card style={styles.profileCard}>
            <Card.Content style={styles.cardContent}>
              <Avatar.Text label={avatarLabel} size={80} style={styles.avatar} />
              <View style={styles.textContainer}>
                <Text variant="headlineSmall" style={styles.name}>
                  {user.name}
                </Text>
                <Text variant="bodyLarge">{user.phone}</Text>
              </View>
              <Chip
                icon="information"
                style={[styles.chip, {backgroundColor}]}
                textStyle={{color}}>
                {label}
              </Chip>
            </Card.Content>
          </Card>

          <List.Section>
            <List.Subheader>Account</List.Subheader>
            <List.Item
              title="Account Info"
              left={props => <List.Icon {...props} icon="account-outline" />}
              onPress={() => navigation.navigate('AccountInfo')}
            />
            <Divider />
            <List.Item
              title="My Family"
              left={props => <List.Icon {...props} icon="account-group-outline" />}
              onPress={() =>
                navigation.push('MyFamilyDetails', {familyId: user.family_id})
              }
            />
            {isAdmin && (
              <>
                <Divider />
                <List.Item
                  title="Verify New Users"
                  left={props => (
                    <List.Icon {...props} icon="account-multiple-plus-outline" />
                  )}
                  onPress={() => navigation.navigate('NewUsers')}
                />
              </>
            )}
          </List.Section>

          <Button
            mode="contained"
            onPress={handleLogout}
            disabled={loggingOut}
            loading={loggingOut}
            icon="logout"
            style={styles.logoutButton}>
            Logout
          </Button>
        </Container>
      </ScrollView>
      <LoadingSpinner loading={loggingOut} text="Logging out..." />
    </>
  );
};

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 16,
  },
  profileCard: {
    marginBottom: 24,
  },
  cardContent: {
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    marginBottom: 16,
  },
  textContainer: {
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
  },
  chip: {
    marginTop: 16,
  },
  logoutButton: {
    marginTop: 32,
  },
});

export default ProfileScreen;

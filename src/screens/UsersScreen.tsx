import React, {useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {
  Surface,
  Text,
  ActivityIndicator,
  Menu,
  IconButton,
  Divider,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import SearchHeader from '../components/common/SearchHeader';
import {
  useGetUsersQuery,
  useUpdateUserStatusMutation,
} from '../store/slices/userApiSlice';
import {usePaginatedList} from '../hooks/usePaginatedList';

import {User} from '../store/slices/authApiSlice';
import {EventDetailsScreenNavigationProp} from '../navigation/types';
import {useHideTabBar} from '../hooks/ useHideTabBar';
import {useSnackbar} from '../context/SnackbarContext';

interface UserCardProps {
  user: User;
  onUpdateStatus: (userId: string, status: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({user, onUpdateStatus}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = (visible: boolean) => () => setMenuVisible(visible);

  const formattedDate = new Date(user.created_at).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Surface style={styles.card}>
      <View style={styles.row}>
        <View style={styles.flex1}>
          <Text style={styles.name}>{user.name}</Text>

          {[
            {label: 'Phone', value: user.phone},
            {label: 'Status', value: user.status},
            {label: 'Created At', value: formattedDate},
          ].map(({label, value}) => (
            <View key={label} style={styles.metaRow}>
              <Text style={styles.metaLabel}>{label}:</Text>
              <Text
                style={[
                  styles.metaValue,
                  label === 'Status' &&
                    (value === 'Active'
                      ? styles.statusActive
                      : styles.statusInactive),
                ]}>
                {value}
              </Text>
            </View>
          ))}
        </View>

        <Menu
          visible={menuVisible}
          onDismiss={toggleMenu(false)}
          anchor={
            <IconButton
              icon="more-vert"
              onPress={toggleMenu(true)}
              accessibilityLabel="More options"
            />
          }>
          <Menu.Item
            onPress={() => {
              onUpdateStatus(user.id, 'Active');
              toggleMenu(false);
            }}
            title="Add User to Family"
            leadingIcon="person-add-alt-1"
          />
          <Divider />
          <Menu.Item
            onPress={() => {
              onUpdateStatus(user.id, 'Suspended');
              toggleMenu(false);
            }}
            title="Pause This Request"
            leadingIcon="block"
          />
        </Menu>
      </View>
    </Surface>
  );
};

const UsersScreen = () => {
  useHideTabBar();
  const navigation = useNavigation<EventDetailsScreenNavigationProp>();
  const {showSnackbar} = useSnackbar();

  const {
    data: users,
    isFetching,
    isRefreshing,
    searchQuery,
    handleLoadMore,
    handleRefresh,
    handleSearch,
    hasMorePages,
    showInitialLoader,
    ready,
  } = usePaginatedList<
    User,
    {page?: number; limit?: number; search?: string; status: string}
  >({
    queryHook: useGetUsersQuery,
    limit: 10,
    queryParams: {status: 'Pending'},
  });

  const [updateUserStatus, {isLoading: isUpdating}] =
    useUpdateUserStatusMutation();

  const handleUpdate = async (userId: string, status: string) => {
    try {
      await updateUserStatus({userId, status}).unwrap();
      showSnackbar('User status updated succesffuly');
    } catch (e: any) {
      showSnackbar(e.data.message, 'error');
    } finally {
    }
  };

  if (showInitialLoader) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Surface style={styles.container}>
      <SearchHeader
        title="New Users"
        onSearch={handleSearch}
        placeholder="Search user..."
        isFetching={isFetching}
        showAddButton={false}
        goBack={() => navigation.goBack()}
      />

      <View style={styles.content}>
        <FlatList
          data={users}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <UserCard user={item} onUpdateStatus={handleUpdate} />
          )}
          contentContainerStyle={[users.length === 0 && styles.centered]}
          ListEmptyComponent={<Text>No users found.</Text>}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.9}
          showsVerticalScrollIndicator={false}
          onRefresh={handleRefresh}
          refreshing={isRefreshing}
          ListFooterComponent={
            ready && users.length > 0 && hasMorePages ? (
              <View style={styles.footer}>
                <ActivityIndicator />
              </View>
            ) : null
          }
        />
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  card: {
    marginBottom: 14,
    padding: 18,
    borderRadius: 16,
    elevation: 2,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  flex1: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  metaLabel: {
    fontSize: 13,
    color: '#888',
    fontWeight: '500',
    marginRight: 4,
  },
  metaValue: {
    fontSize: 13,
    color: '#333',
    fontWeight: '400',
  },
  statusActive: {
    color: '#388e3c',
  },
  statusInactive: {
    color: '#d32f2f',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
});

export default UsersScreen;
function showSnackbar(arg0: string) {
  throw new Error('Function not implemented.');
}

import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {
  Surface,
  Text,
  ActivityIndicator,
  IconButton,
  Divider,
  List,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import SearchHeader from '../components/common/SearchHeader';
import BottomSheet from '../components/common/BottomSheet';
import {
  useGetUsersQuery,
  useUpdateUserStatusMutation,
} from '../store/slices/userApiSlice';
import {usePaginatedList} from '../hooks/usePaginatedList';

import {User} from '../store/slices/authApiSlice';
import {EventDetailsScreenNavigationProp} from '../navigation/types';
import {useHideTabBar} from '../hooks/ useHideTabBar';
import {useSnackbar} from '../context/SnackbarContext';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {formatDate} from '../utils';

interface UserCardProps {
  user: User;
  onOptionsPress?: () => void;
}

const UserCard: React.FC<UserCardProps> = ({user, onOptionsPress}) => {
  const formattedDate = formatDate(user.created_at);

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

        <IconButton
          icon="more-vert"
          onPress={onOptionsPress}
          accessibilityLabel="More options"
        />
      </View>
    </Surface>
  );
};

const NewUsersScreen = () => {
  useHideTabBar();
  const navigation = useNavigation<EventDetailsScreenNavigationProp>();
  const {showSnackbar} = useSnackbar();

  // Bottom sheet state
  const [sheetVisible, setSheetVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null); // 'Active' or 'Suspended'

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
    refetch: refetchUsers,
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

  useEffect(() => {
    refetchUsers();
  }, []);

  const openSheet = (user: User) => {
    setSelectedUser(user);
    setSheetVisible(true);
    setUpdatingStatus(null);
  };
  const closeSheet = () => {
    setSheetVisible(false);
    setSelectedUser(null);
    setUpdatingStatus(null);
  };

  // Show spinner for the option being updated
  const handleSheetUpdate = async (userId: string, status: string) => {
    setUpdatingStatus(status);
    try {
      await updateUserStatus({userId, status}).unwrap();
      refetchUsers();
      showSnackbar('User status updated succesffuly');
    } catch (e: any) {
      showSnackbar(e.data.message, 'error');
    } finally {
      setTimeout(() => {
        closeSheet();
      }, 500);
    }
  };

  return (
    <Surface style={styles.container}>
      <LoadingSpinner loading={showInitialLoader}>
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
              <UserCard user={item} onOptionsPress={() => openSheet(item)} />
            )}
            contentContainerStyle={[users.length === 0 && styles.centered]}
            ListEmptyComponent={
              ready &&
              users.length === 0 &&
              !showInitialLoader &&
              !isFetching ? (
                <Text>No new users found.</Text>
              ) : null
            }
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
        <BottomSheet
          visible={sheetVisible && !!selectedUser}
          onDismiss={closeSheet}>
          <View>
            <List.Item
              disabled={isUpdating}
              key="add-user"
              title="Add User to Family"
              description="Activate and add user to family group"
              left={() => <IconButton icon="person-add-alt-1" size={24} />}
              right={() =>
                updatingStatus === 'Active' ? (
                  <ActivityIndicator size={18} style={{marginRight: 8}} />
                ) : null
              }
              onPress={() => {
                if (!updatingStatus)
                  handleSheetUpdate(selectedUser!.id, 'Active');
              }}
            />
            <Divider key="divider1" />
            <List.Item
              disabled={isUpdating}
              key="pause-request"
              title="Pause This Request"
              description="Suspend this user's request temporarily"
              left={() => <IconButton icon="block" size={24} />}
              right={() =>
                updatingStatus === 'Suspended' ? (
                  <ActivityIndicator size={18} style={{marginRight: 8}} />
                ) : null
              }
              onPress={() => {
                if (!updatingStatus)
                  handleSheetUpdate(selectedUser!.id, 'Suspended');
              }}
            />
            <Divider key="divider2" />
            <List.Item
              disabled={isUpdating}
              key="cancel"
              title="Cancel"
              onPress={closeSheet}
              titleStyle={styles.sheetCancel}
            />
          </View>
        </BottomSheet>
      </LoadingSpinner>
    </Surface>
  );
};

const styles = StyleSheet.create({
  sheetCancel: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    paddingVertical: 10,
    fontWeight: '600',
  },
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

export default NewUsersScreen;

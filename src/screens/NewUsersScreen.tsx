import React, {useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {
  Card,
  Text,
  Menu,
  IconButton,
  Divider,
  useTheme,
  Avatar,
  Chip,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import PageHeader from '../components/common/PageHeader';
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
import EmptyComponent from '../components/common/EmptyComponent';
import LoadMoreButton from '../components/common/LoadMoreButton';
import {formatDate, getStatusInfo} from '../utils';
import Container from '../components/common/Container';

const UserItem = ({
  user,
  onUpdate,
}: {
  user: User;
  onUpdate: (id: string, status: string) => void;
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const {colors} = useTheme();
  const {label, color} = getStatusInfo(user.status);

  const avatarLabel = user.name
    .split(' ')
    .map(n => n[0])
    .join('');

  return (
    <Card style={styles.card}>
      <Card.Title
        title={user.name}
        subtitle={user.phone}
        left={props => <Avatar.Text {...props} label={avatarLabel} />}
        right={props => (
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <IconButton
                {...props}
                icon="dots-vertical"
                onPress={() => setMenuVisible(true)}
              />
            }>
            <Menu.Item
              onPress={() => onUpdate(user.id, 'Active')}
              title="Activate User"
              leadingIcon="check"
            />
            <Divider />
            <Menu.Item
              onPress={() => onUpdate(user.id, 'Suspended')}
              title="Suspend User"
              leadingIcon="cancel"
            />
          </Menu>
        )}
      />
      <Card.Content>
        <View style={styles.chipContainer}>
          <Chip icon="info" textStyle={{color}} style={{backgroundColor: color}}>
            {label}
          </Chip>
          <Chip icon="calendar">{formatDate(user.created_at)}</Chip>
        </View>
      </Card.Content>
    </Card>
  );
};

const NewUsersScreen = () => {
  useHideTabBar();
  const navigation = useNavigation<EventDetailsScreenNavigationProp>();
  const {showSnackbar} = useSnackbar();
  const {
    data: users,
    isFetching,
    searchQuery,
    handleLoadMore,
    handleRefresh,
    handleSearch,
    hasMorePages,
    showInitialLoader,
  } = usePaginatedList<User, {search?: string; status: string}>({
    queryHook: useGetUsersQuery,
    queryParams: {status: 'Pending'},
  });
  const [updateUserStatus, {isLoading: isUpdating}] =
    useUpdateUserStatusMutation();

  const handleUpdate = async (userId: string, status: string) => {
    try {
      await updateUserStatus({userId, status}).unwrap();
      showSnackbar('User status updated successfully.');
    } catch (e: any) {
      showSnackbar(e.data?.message || 'An error occurred.', 'error');
    }
  };

  return (
    <Container>
      <PageHeader title="New Users" onBack={navigation.goBack} />
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <UserItem user={item} onUpdate={handleUpdate} />
        )}
        onRefresh={handleRefresh}
        refreshing={isFetching}
        ListEmptyComponent={
          !isFetching ? (
            <EmptyComponent message="No new users to verify." />
          ) : null
        }
        ListFooterComponent={
          <LoadMoreButton
            isLoading={isFetching}
            hasMore={hasMorePages}
            onPress={handleLoadMore}
          />
        }
        contentContainerStyle={styles.listContent}
      />
      <LoadingSpinner loading={isUpdating || showInitialLoader} />
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  listContent: {
    paddingBottom: 16,
  },
});

export default NewUsersScreen;

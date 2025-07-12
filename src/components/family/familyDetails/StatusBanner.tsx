import React, {useMemo, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Portal, Dialog, RadioButton, Text} from 'react-native-paper';
import {useUpdateUserStatusMutation} from '../../../store/slices/userApiSlice';
import {useRBAC} from '../../../context/RBACContext';
import {capitalize} from '../../../utils';
import {useSnackbar} from '../../../context/SnackbarContext';

interface RoleBannerProps {
  userId: string;
  status: string;
}

const StatusBanner: React.FC<RoleBannerProps> = ({userId, status}) => {
  const {isAdmin, canEditSelf} = useRBAC();
  const {showSnackbar} = useSnackbar();
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(status);

  const [updateUserStatus, {isLoading: isUpdating}] =
    useUpdateUserStatusMutation();

  const handleUpdate = async () => {
    try {
      await updateUserStatus({userId, status: selectedStatus}).unwrap();
      showSnackbar('User status updated succesffuly');
    } catch (e: any) {
      showSnackbar(e.data.message, 'error');
    } finally {
      setShowRoleDialog(false);
    }
  };

  const isHimself = useMemo(() => canEditSelf(userId), []);
  if (!isAdmin || isHimself) return null;

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.roleText}>
          Role: <Text style={styles.bold}>{capitalize(status || '')}</Text>
        </Text>
        <Button mode="outlined" onPress={() => setShowRoleDialog(true)}>
          Update Role
        </Button>
      </View>

      <Portal>
        <Dialog
          visible={showRoleDialog}
          onDismiss={() => setShowRoleDialog(false)}>
          <Dialog.Title>Change User Role</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group
              onValueChange={setSelectedStatus}
              value={selectedStatus}>
              <RadioButton.Item label="Pending" value="Pending" />
              <RadioButton.Item label="Active" value="Active" />
              <RadioButton.Item label="Suspended" value="Suspended" />
            </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              disabled={isUpdating}
              onPress={() => setShowRoleDialog(false)}>
              Cancel
            </Button>
            <Button
              disabled={isUpdating}
              loading={isUpdating}
              onPress={handleUpdate}>
              Update
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginVertical: 8,

    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  roleText: {
    fontSize: 14,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default StatusBanner;

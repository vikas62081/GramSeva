import {MD3Theme} from 'react-native-paper';

export const getStatusColor = (theme: MD3Theme, status?: string) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return theme.colors.primary;
    case 'suspended':
      return theme.colors.error;
    default:
      return theme.colors.outline;
  }
};

export const getRoleInfo = (theme: MD3Theme, role?: string) => {
  switch (role?.toLowerCase()) {
    case 'admin':
      return {
        label: 'Admin',
        color: theme.colors.error,
        backgroundColor: theme.colors.errorContainer,
      };
    case 'user':
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

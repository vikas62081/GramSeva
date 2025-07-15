import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useRBAC} from '../../context/RBACContext';

const PendingApprovalBanner: React.FC = () => {
  const theme = useTheme();
  const {isPendingUser} = useRBAC();

  if (!isPendingUser) return null;

  return (
    <View
      style={[
        styles.pendingBanner,
        {backgroundColor: theme.colors.tertiaryContainer},
      ]}>
      <MaterialIcons
        name="warning"
        size={22}
        color={theme.colors.error}
        style={{marginRight: 8}}
      />
      <Text variant="labelLarge" style={[{color: theme.colors.error}]}>
        Admin approval pending - limited access
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pendingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginBottom: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});

export default PendingApprovalBanner;

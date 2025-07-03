import React from 'react';
import {View, StyleSheet} from 'react-native';
import {FamilyMember} from '../types';
import {IconButton, Text} from 'react-native-paper';

interface MemberCardProps {
  member: FamilyMember;
  onEdit: (member: FamilyMember) => void;
  nameById: Record<string, string>;
}

const MemberCard: React.FC<MemberCardProps> = ({member, nameById, onEdit}) => {
  return (
    <View style={styles.memberItem}>
      <View style={styles.memberInfo}>
        <Text variant="labelLarge" style={styles.memberName}>
          {member.name}
        </Text>
        <Text variant="bodySmall" style={styles.metaText}>
          {member.relationship} • {nameById[member.parentId!] || 'Unknown'} •{' '}
          {member.gender}
        </Text>
      </View>
      <IconButton
        icon="mode-edit-outline"
        size={20}
        mode="contained-tonal"
        containerColor="#f0f0f0"
        onPress={() => onEdit(member)}
        style={styles.icon}
        accessibilityLabel={`Edit ${member.name}`}
        testID={`edit-${member.id}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  memberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  memberInfo: {
    flex: 1,
    marginRight: 8,
  },
  memberName: {
    fontWeight: '600',
  },
  metaText: {
    marginTop: 4,
    color: '#666',
  },
  icon: {
    marginLeft: 8,
    borderRadius: 20,
  },
});

export default MemberCard;

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {FamilyMember} from '../types';
import {IconButton, Text, Avatar, Chip} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface MemberCardProps {
  member: FamilyMember;
  onEdit: (member: FamilyMember) => void;
  nameById: Record<string, string>;
}

const MemberCard: React.FC<MemberCardProps> = ({member, nameById, onEdit}) => {
  // Get initials for avatar
  const initials = member.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <View style={styles.memberItem}>
      <Avatar.Text
        label={initials}
        size={40}
        style={[
          styles.avatar,
          {backgroundColor: member.gender === 'Female' ? '#fce4ec' : '#e3f2fd'},
        ]}
        color={member.gender === 'Female' ? '#d81b60' : '#1976d2'}
      />
      <View style={styles.memberInfo}>
        <Text variant="labelLarge" style={styles.memberName}>
          {member.name}
        </Text>
        <View style={styles.metaRow}>
          <Chip
            compact
            style={[
              styles.chip,
              member.gender === 'Female' ? styles.chipFemale : styles.chipMale,
            ]}
            textStyle={styles.chipText}
            icon={() => (
              <MaterialIcons
                name={member.gender === 'Female' ? 'female' : 'male'}
                size={14}
                color={member.gender === 'Female' ? '#d81b60' : '#1976d2'}
              />
            )}>
            {member.gender}
          </Chip>
          <Chip
            compact
            style={styles.chip}
            textStyle={styles.chipText}
            icon={'supervisor-account'}>
            {member.relationship}
          </Chip>
          <Chip
            compact
            style={styles.chip}
            textStyle={styles.chipText}
            icon={() => (
              <MaterialIcons name="account-child" size={14} color="#888" />
            )}>
            {nameById[member.parentId!] || 'Unknown'}
          </Chip>
        </View>
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    marginRight: 14,
    alignSelf: 'flex-start',
  },
  memberInfo: {
    flex: 1,
    marginRight: 8,
  },
  memberName: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 2,
    color: '#222',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 2,
  },
  chip: {
    backgroundColor: '#f5f5f5',
    marginRight: 4,
    borderRadius: 12,
    paddingHorizontal: 2,
    paddingVertical: 0,
  },
  chipText: {
    fontSize: 11,
    color: '#555',
  },
  chipMale: {
    backgroundColor: '#e3f2fd',
  },
  chipFemale: {
    backgroundColor: '#fce4ec',
  },
  metaText: {
    color: '#888',
    fontSize: 12,
    marginLeft: 4,
  },
  icon: {
    marginLeft: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
});

export default MemberCard;

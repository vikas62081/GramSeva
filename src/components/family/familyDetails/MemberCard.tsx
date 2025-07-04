import React from 'react';
import {View, StyleSheet} from 'react-native';
import {FamilyMember} from '../types';
import {IconButton, Text, Avatar} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getInitials} from '../../../utils';

interface MemberCardProps {
  member: FamilyMember;
  onEdit: (member: FamilyMember) => void;
  nameById: Record<string, string>;
}

const MemberCard: React.FC<MemberCardProps> = ({member, nameById, onEdit}) => {
  const initials = getInitials(member.name);

  const relatedName = nameById[member.parentId!] || 'Unknown';
  const genderIcon = member.gender === 'Female' ? 'female' : 'male';
  const genderColor = member.gender === 'Female' ? '#d81b60' : '#1976d2';

  return (
    <View style={styles.memberItem}>
      <Avatar.Text
        label={initials}
        size={40}
        style={[
          styles.avatar,
          {backgroundColor: member.gender === 'Female' ? '#fce4ec' : '#e3f2fd'},
        ]}
        color={genderColor}
      />
      <View style={styles.memberInfo}>
        <Text variant="labelLarge" style={styles.memberName}>
          {member.name}
        </Text>
        <View style={styles.metaRow}>
          <MaterialIcons name={genderIcon} size={13} color={genderColor} />
          <Text
            numberOfLines={1}
            style={[styles.metaText, {color: genderColor}]}>
            {' '}
            {member.gender}
          </Text>
          <Text style={styles.dot}> • </Text>
          <MaterialIcons name="supervisor-account" size={13} color="#777" />
          <Text style={styles.metaText} numberOfLines={1} ellipsizeMode="tail">
            {' '}
            {member.relationship} of {relatedName}
          </Text>
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
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 14,
    elevation: 2,
  },
  avatar: {
    marginRight: 12,
    alignSelf: 'flex-start',
  },
  memberInfo: {
    flex: 1,
    marginRight: 4, // reduced right margin
  },
  memberName: {
    // fontWeight: '700',
    // fontSize: 15,
    marginBottom: 4,
    // color: '#222',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    overflow: 'hidden',
  },
  metaText: {
    fontSize: 11.5,
    color: '#555',
    flexShrink: 1,
  },
  dot: {
    fontSize: 12,
    color: '#aaa',
    marginHorizontal: 4,
  },
  icon: {
    marginLeft: 4,
    marginTop: 2,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
});

export default MemberCard;

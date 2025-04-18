import React from 'react';
import {View, StyleSheet} from 'react-native';
import {FamilyMember} from '../types';
import {IconButton, Text} from 'react-native-paper';

interface MemberCardProps {
  member: FamilyMember;
  onEdit: (member: FamilyMember) => void;
}

const MemberCard: React.FC<MemberCardProps> = ({member, onEdit}) => {
  return (
    <View key={member.id} style={[styles.memberItem]}>
      <View style={styles.memberInfo}>
        <Text variant="labelLarge">{member.name}</Text>
        <Text variant="bodySmall">
          {member.relationship} • {member.gender}
        </Text>
      </View>
      <IconButton onPress={() => onEdit(member)} icon="edit"></IconButton>
    </View>
  );
};

const styles = StyleSheet.create({
  memberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  memberInfo: {
    flex: 1,
  },
});

export default MemberCard;

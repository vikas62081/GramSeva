import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FamilyMember} from '../types';

interface MemberCardProps {
  member: FamilyMember;
  onEdit: (member: FamilyMember) => void;
}

const MemberCard: React.FC<MemberCardProps> = ({member, onEdit}) => {
  return (
    <View key={member.id} style={[styles.memberItem]}>
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{member.name}</Text>
        <Text style={styles.memberDetails}>
          {member.relationship} • {member.gender}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => onEdit(member)}
        style={styles.editButton}>
        <MaterialIcons name="edit" size={24} color="#63C7A6" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  memberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
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
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  memberDetails: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    padding: 4,
  },
});

export default MemberCard;

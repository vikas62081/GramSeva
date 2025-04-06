import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Family} from './types';

interface MemberProps {
  family: Family;
  onPress: (id: string) => void;
}

const Member: React.FC<MemberProps> = ({family, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.memberCard}
      onPress={() => onPress(family.id!)}>
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{family.name}</Text>
        <Text style={styles.memberRole}>{family.gender}</Text>
        <Text style={styles.memberCount}>{family.members} family members</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#636E72" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  memberCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
  },
  memberRole: {
    fontSize: 14,
    color: '#636E72',
    marginBottom: 4,
  },
  memberCount: {
    fontSize: 12,
    color: '#888',
  },
});

export default Member;

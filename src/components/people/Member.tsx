import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Member {
  id: string;
  name: string;
  relationship: string;
  memberCount: number;
}

interface MemberProps {
  family: any;
  onPress: (id: string) => void; // Function to handle navigation
}

const Member: React.FC<MemberProps> = ({family, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.familyCard}
      onPress={() => onPress(family.id)}>
      <View style={styles.familyInfo}>
        <Text style={styles.familyName}>{family.name}</Text>
        <Text style={styles.familyRole}>{family.relationship}</Text>
        <Text style={styles.memberCount}>
          {family.memberCount} family members
        </Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#636E72" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {marginTop: 12},
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    elevation: 3,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  memberDetails: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  navigateIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  familyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  familyInfo: {
    flex: 1,
  },
  familyName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
  },
  familyRole: {
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

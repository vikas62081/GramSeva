import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface FamilyDetailHeaderProps {
  name: string;
  relationship: string;
  onAdd: () => void;
}

const FamilyDetailHeader: React.FC<FamilyDetailHeaderProps> = ({
  name,
  relationship,
  onAdd,
}) => {
  return (
    <>
      <View style={styles.header}>
        <Avatar.Image
          size={100}
          source={{
            uri: 'https://buildingontheword.org/files/2014/12/family.jpg',
          }}
        />
        <Text style={styles.familyName}>{name}</Text>
        <Text style={styles.familyRole}>{relationship}</Text>
      </View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Family Members</Text>
        <TouchableOpacity onPress={onAdd} style={styles.addButton}>
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginVertical: 16,
  },
  familyImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  familyName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  familyRole: {
    fontSize: 16,
    color: '#666',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3436',
  },
  addButton: {
    backgroundColor: '#63C7A6',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FamilyDetailHeader;

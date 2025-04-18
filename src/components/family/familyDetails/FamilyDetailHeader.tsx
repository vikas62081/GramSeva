import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Avatar, IconButton, Text} from 'react-native-paper';

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
        <Text variant="headlineSmall">{name}</Text>
        {relationship && <Text style={styles.familyRole}>{relationship}</Text>}
      </View>
      <View style={styles.sectionHeader}>
        <Text variant="titleMedium">Family Members</Text>
        <IconButton onPress={onAdd} icon="add" mode="contained"></IconButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  familyImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
});

export default FamilyDetailHeader;

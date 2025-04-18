import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Avatar, IconButton, Text} from 'react-native-paper';

interface FamilyDetailHeaderProps {
  name: string;
  relationship: string;
  familyCount?: number;
  onAdd: () => void;
  imageUrl?: string;
}
const fallbackImg = 'https://buildingontheword.org/files/2014/12/family.jpg';
const FamilyDetailHeader: React.FC<FamilyDetailHeaderProps> = ({
  name,
  relationship = 'Head',
  familyCount = 6,
  onAdd,
  imageUrl = fallbackImg,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {imageUrl ? (
          <Image source={{uri: imageUrl}} style={styles.image} />
        ) : (
          <Avatar.Icon icon="person" size={64} style={styles.image} />
        )}
        <View style={styles.titleContainer}>
          <Text variant="titleMedium">{name}</Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {relationship} • Total members: {familyCount}
          </Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text variant="titleMedium">Family Members</Text>
        <IconButton onPress={onAdd} icon="add" mode="contained" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  image: {
    borderRadius: 8,
    width: 64,
    height: 64,
    marginRight: 16,
    backgroundColor: '#eee',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '600',
  },
  subtitle: {
    color: '#6c6c6c',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
});

export default FamilyDetailHeader;

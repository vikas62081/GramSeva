import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Avatar, IconButton, Text} from 'react-native-paper';
import {FamilyMember} from '../types';

interface FamilyDetailHeaderProps {
  family: FamilyMember;
  onAdd: () => void;
  imageUrl?: string;
  isEditAllowed: boolean;
}
const fallbackImg = 'https://buildingontheword.org/files/2014/12/family.jpg';

const FamilyDetailHeader: React.FC<FamilyDetailHeaderProps> = ({
  family,
  onAdd,
  imageUrl = fallbackImg,
  isEditAllowed = false,
}) => {
  const {name, members = [], relationship = 'Head'} = family;
  const familyCount = Array.isArray(members) ? members.length : 0;
  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <View style={styles.avatarContainer}>
          {imageUrl ? (
            <Image source={{uri: imageUrl}} style={styles.avatarImage} />
          ) : (
            <Avatar.Icon icon="person" size={64} style={styles.avatarImage} />
          )}
          <View style={styles.memberCountBadge}>
            <Text style={styles.memberCountText}>{familyCount}</Text>
          </View>
        </View>
        <View style={styles.titleContainer}>
          <Text variant="titleLarge" style={styles.familyName}>
            {name}
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {relationship}
          </Text>
        </View>
        {isEditAllowed && (
          <IconButton
            onPress={onAdd}
            icon="add"
            mode="contained"
            style={styles.addButton}
            containerColor="#63C7A6"
            iconColor="#fff"
            size={28}
          />
        )}
      </View>
      <View style={styles.sectionHeader}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Family Members
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatarImage: {
    borderRadius: 32,
    width: 64,
    height: 64,
    backgroundColor: '#eee',
  },
  memberCountBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#63C7A6',
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    elevation: 2,
  },
  memberCountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  familyName: {
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 2,
    color: '#222',
  },
  subtitle: {
    color: '#6c6c6c',
    marginTop: 2,
    fontWeight: '500',
  },
  addButton: {
    marginLeft: 8,
    borderRadius: 24,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 2,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
});

export default FamilyDetailHeader;

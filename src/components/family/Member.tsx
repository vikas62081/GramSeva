import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Family} from './types';
import {Text, Avatar} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {capitalize, getInitials} from '../../utils';
import {useRBAC} from '../../context/RBACContext';

interface MemberProps {
  family: Family;
  onPress: (id: string) => void;
}

const Member: React.FC<MemberProps> = ({family, onPress}) => {
  // Get initials for avatar
  const initials = getInitials(family.name);
  const {isAdmin} = useRBAC();

  return (
    <TouchableOpacity
      onPress={() => onPress(family.id!)}
      style={styles.touchable}>
      {/* <Card mode="elevated" style={styles.card}> */}
      <View style={styles.cardContent}>
        <View style={styles.avatarContainer}>
          <Avatar.Text
            label={initials}
            size={48}
            style={styles.avatar}
            labelStyle={{fontSize: 16, fontWeight: 'bold'}}
            color="#1976d2"
          />
          <View style={styles.memberCountBadge}>
            <MaterialIcons name="people" size={14} color="#fff" />
            <Text style={styles.memberCountText}>{family.members}</Text>
          </View>
        </View>
        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text
              variant="titleMedium"
              style={styles.familyName}
              numberOfLines={1}
              ellipsizeMode="tail">
              {family.name}
            </Text>
            <MaterialIcons
              name={family.gender === 'Female' ? 'female' : 'male'}
              size={18}
              color={family.gender === 'Female' ? '#d81b60' : '#1976d2'}
              style={styles.genderIcon}
            />
          </View>
          <View style={{flexDirection: 'row', gap: 8}}>
            <Text variant="labelMedium" style={styles.metaText}>
              {family.gender}
            </Text>
            {isAdmin && family.status && (
              <Text variant="labelSmall" style={styles.statusText}>
                Status: {capitalize(family.status)}
              </Text>
            )}
          </View>
        </View>
        <MaterialIcons
          name="chevron-right"
          size={28}
          color="#888"
          style={styles.chevron}
        />
      </View>
      {/* </Card> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 16,
    // marginBottom: 2,
    backgroundColor: '#fff',
  },
  card: {
    borderRadius: 16,
    elevation: 2,
    backgroundColor: '#f8f9fa',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    paddingHorizontal: 2,
    marginBottom: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    backgroundColor: '#e3f2fd',
  },
  memberCountBadge: {
    position: 'absolute',
    bottom: -6,
    right: -2,
    backgroundColor: '#63C7A6',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 2,
    minWidth: 28,
    borderWidth: 2,
    borderColor: '#fff',
    elevation: 2,
  },
  memberCountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 3,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  familyName: {
    fontWeight: '600',
    fontSize: 15,
    color: '#222',
    marginRight: 4,
    letterSpacing: 0.1,
  },
  genderIcon: {
    marginLeft: 2,
    marginTop: 1,
  },
  metaText: {
    color: '#888',
    marginTop: 1,
    letterSpacing: 0.1,
  },
  statusText: {
    color: '#1976d2',
    marginTop: 1,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  chevron: {
    marginLeft: 8,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
});

export default Member;

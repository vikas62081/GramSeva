import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text, Avatar, Card, IconButton} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Event_} from '../types';
import {formatDateTime} from '../../../utils';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';

interface EventDetailsHeaderProps {
  event?: Event_;
  onEdit?: () => void;
}

const EventDetailsHeader: React.FC<EventDetailsHeaderProps> = ({
  event,
  onEdit,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  if (!event) {
    return null;
  }
  const {
    thumbnail_url,
    title = '',
    description = '',
    date,
    venue = '',
    eventHead,
  } = event || {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {thumbnail_url ? (
          <Image source={{uri: thumbnail_url}} style={styles.image} />
        ) : (
          <Avatar.Icon icon="calendar-month" size={64} style={styles.image} />
        )}
        <View style={styles.titleContainer}>
          <Text variant="titleMedium" style={styles.title}>
            {title}
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {description}
          </Text>
        </View>
        <IconButton
          mode="contained"
          icon="edit"
          size={24}
          onPress={onEdit}
          style={styles.editIcon}
          accessibilityLabel="Edit Event"
        />
      </View>

      <View style={styles.infoRow}>
        <MaterialIcons
          name="event"
          size={20}
          color="#555"
          style={styles.icon}
        />
        <Text variant="labelLarge">{date ? formatDateTime(date) : 'N/A'}</Text>
      </View>

      <View style={styles.infoRow}>
        <MaterialIcons
          name="location-on"
          size={20}
          color="#555"
          style={styles.icon}
        />
        <Text variant="labelLarge">{venue || 'N/A'}</Text>
      </View>

      <Text style={styles.headLabel}>
        Head of Event:{' '}
        <Text variant="labelLarge">{eventHead?.name || 'N/A'}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginBottom: 12},
  header: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  editIcon: {
    marginLeft: 'auto',
    marginTop: -8,
  },
  image: {
    borderRadius: 8,
    width: 64,
    height: 64,
    marginRight: 16,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    // fontWeight: 'bold',
  },
  subtitle: {
    color: '#6c6c6c',
    marginTop: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  icon: {
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
  },
  headLabel: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
  },
  headName: {
    fontWeight: 'bold',
    color: '#000',
  },
});

export default EventDetailsHeader;

import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Family} from './types';
import {Card, IconButton, Text} from 'react-native-paper';

interface MemberProps {
  family: Family;
  onPress: (id: string) => void;
}

const Member: React.FC<MemberProps> = ({family, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress(family.id!)}>
      <Card mode="contained">
        <Card.Title
          titleVariant="titleMedium"
          title={family.name}
          subtitle={
            <View style={styles.subTitle}>
              <Text variant="bodySmall">{family.gender}</Text>
              <View style={styles.memberCount}></View>
              <Text variant="bodySmall">{family.members} Members</Text>
            </View>
          }
          subtitleNumberOfLines={1}
          subtitleVariant="bodySmall"
          titleNumberOfLines={1}
          right={props => (
            <IconButton
              {...props}
              icon="chevron-right"
              onPress={() => onPress(family.id!)}
            />
          )}
        />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  subTitle: {flexDirection: 'row', gap: 8, opacity: 0.8},
  memberCount: {
    display: 'flex',
    width: 5,
    height: 5,
    backgroundColor: '#aaa',
    borderRadius: 50,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default Member;

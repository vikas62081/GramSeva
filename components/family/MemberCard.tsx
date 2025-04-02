import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {MemberCardProps} from './types';

const MemberCard: React.FC<MemberCardProps> = ({member, onClick}) => (
  <TouchableOpacity
    onPress={() => onClick(member)}
    style={{
      padding: 8,
      borderWidth: 1,
      borderRadius: 10,
      alignItems: 'center',
      backgroundColor: '#f9f9f9',
    }}>
    <Image
      source={{uri: member.profilePicture}}
      style={{width: 50, height: 50, borderRadius: 25}}
    />
    <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 5}}>
      {member.name}
    </Text>
    <Text style={{fontSize: 12, color: 'gray'}}>{member.relationship}</Text>
  </TouchableOpacity>
);

export default MemberCard;

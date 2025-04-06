// PeopleDetailsContainer.tsx
import React, {useMemo, useState} from 'react';
import {Modal, StyleSheet, FlatList, Text, Alert} from 'react-native';

import MemberCard from './MemberCard';
import PeopleForm from './PeopleForm';

import {FamilyMember} from '../types';
import {
  PeopleDetailsScreenNavigationProp,
  PeopleDetailsScreenRouteProp,
} from '../../../navigation/types';
import PeopleDetailHeader from './PeopleDetailHeader';
import {mockFamily} from '../../mock';
import {getFamilyDropdownOptions} from '../../../utils';

interface FamilyData {
  id: string;
  name: string;
  relationship: string;
  gender: string;
  members: FamilyMember[];
}

interface PeopleDetailsScreenProps {
  navigation: PeopleDetailsScreenNavigationProp;
  route: PeopleDetailsScreenRouteProp;
}
const PeopleDetailsContainer: React.FC<PeopleDetailsScreenProps> = ({
  navigation,
}) => {
  const [family, setFamily] = useState<FamilyData>(mockFamily);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(
    null,
  );
  const [formData, setFormData] = useState({
    name: '',
    dob: new Date(),
    gender: 'male',
    relationship: '',
    relationshipWith: '',
  });

  const relatedTo = useMemo(() => getFamilyDropdownOptions(family), []);

  const handleAddMember = () => {
    if (
      !formData.name ||
      !formData.dob ||
      !formData.gender ||
      !formData.relationship ||
      !formData.relationshipWith
    ) {
      Alert.alert('Missing Fields', 'Please complete all the required fields.');
      return;
    }

    const newMember: FamilyMember = {
      id: Date.now().toString(),
      name: formData.name,
      dob: formData.dob.toISOString(),
      gender: formData.gender,
      relationship: formData.relationship,
      parentId: formData.relationshipWith || undefined,
    };

    setFamily(prev => ({
      ...prev,
      members: [...prev.members, newMember],
    }));

    setShowAddMemberModal(false);
    resetForm();
  };

  const handleUpdateMember = () => {
    if (!selectedMember || !formData.name || !formData.relationship) {
      return;
    }

    const updateMembers = (members: FamilyMember[]): FamilyMember[] => {
      return members.map(member => {
        if (member.id === selectedMember.id) {
          return {
            ...member,
            name: formData.name,
            dob: formData.dob.toISOString(),
            gender: formData.gender,
            relationship: formData.relationship,
            parentId: formData.relationshipWith || undefined,
          };
        }
        if (member.members) {
          return {
            ...member,
            members: updateMembers(member.members),
          };
        }
        return member;
      });
    };

    setFamily(prev => ({
      ...prev,
      members: updateMembers(prev.members),
    }));

    setShowAddMemberModal(false);
    setSelectedMember(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      dob: new Date(),
      gender: 'male',
      relationship: '',
      relationshipWith: '',
    });
  };

  const handleEditMember = (member: FamilyMember) => {
    setSelectedMember(member);
    setFormData({
      name: member.name,
      dob: member.dob ? new Date(member.dob) : new Date(),
      gender: member.gender,
      relationship: member.relationship,
      relationshipWith: member.parentId || '',
    });
    setShowAddMemberModal(true);
  };

  const handleAddBtnClick = () => {
    setSelectedMember(null);
    resetForm();
    setShowAddMemberModal(true);
  };
  return (
    <>
      <PeopleDetailHeader
        name={family.name}
        relationship={family.relationship}
        onAdd={handleAddBtnClick}
      />
      <FlatList
        data={family.members}
        renderItem={({item}) => (
          <MemberCard key={item.id} member={item} onEdit={handleEditMember} />
        )}
        ListEmptyComponent={
          <Text style={{textAlign: 'center', marginTop: 120}}>
            No members found.
          </Text>
        }
      />

      <Modal visible={showAddMemberModal} animationType="slide" transparent>
        <PeopleForm
          selectedMember={selectedMember}
          formData={formData}
          setFormData={setFormData}
          onClose={() => {
            setShowAddMemberModal(false);
            resetForm();
            setSelectedMember(null);
          }}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          handleUpdateMember={handleUpdateMember}
          handleAddMember={handleAddMember}
          relatedTo={relatedTo}
        />
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  content: {
    flex: 1,
    padding: 16,
  },
});

export default PeopleDetailsContainer;

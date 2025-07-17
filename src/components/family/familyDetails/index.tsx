import React, {useMemo, useState} from 'react';
import {FlatList, Alert} from 'react-native';
import MemberCard from './MemberCard';
import {FamilyMember} from '../types';
import {
  FamilyDetailsScreenNavigationProp,
  FamilyDetailsScreenRouteProp,
} from '../../../navigation/types';
import {getFamilyDropdownOptions, normalizeObjectStrings} from '../../../utils';
import FamilyDetailHeader from './FamilyDetailHeader';
import FamilyMemberForm from './FamilyMemberForm';
import {
  useAddFamilyMemberMutation,
  useGetFamilyByIdQuery,
  useUpdateFamilyMemberMutation,
} from '../../../store/slices/familyApiSlice';
import EmptyComponent from '../../common/EmptyComponent';
import {useHideTabBar} from '../../../hooks/ useHideTabBar';
import {useSnackbar} from '../../../context/SnackbarContext';
import {useRBAC} from '../../../context/RBACContext';
import StatusBanner from './StatusBanner';
import LoadingSpinner from '../../common/LoadingSpinner';

interface FamilyDetailsScreenProps {
  navigation: FamilyDetailsScreenNavigationProp;
  route: FamilyDetailsScreenRouteProp;
}
const FamilyDetailsContainer: React.FC<FamilyDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  useHideTabBar();
  const {showSnackbar} = useSnackbar();
  const {canEditFamily, isAdmin} = useRBAC();
  const {familyId} = route.params || {};

  const {
    data: family,
    isLoading,
    error,
    isFetching,
  } = useGetFamilyByIdQuery(familyId);
  const [addMember, {isLoading: isAdding}] = useAddFamilyMemberMutation();
  const [updateMember, {isLoading: isUpdating}] =
    useUpdateFamilyMemberMutation();
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(
    null,
  );

  const nameById = useMemo(() => {
    if (!family) return {};
    return {
      [family.id!]: family.name.split(' ')[0],
      ...family.members!.reduce((acc, member) => {
        acc[member.id!] = member.name.split(' ')[0];
        return acc;
      }, {} as Record<string, string>),
    };
  }, [family]);

  const [formData, setFormData] = useState<FamilyMember>({
    name: '',
    dob: new Date(),
    gender: 'Male',
    relationship: '',
    parentId: '',
  });

  const relatedTo = useMemo(() => getFamilyDropdownOptions(family!), [family]);
  const handleAddMember = async () => {
    if (
      !formData.name ||
      !formData.dob ||
      !formData.gender ||
      !formData.relationship ||
      !formData.parentId
    ) {
      Alert.alert('Missing Fields', 'Please complete all the required fields.');
      return;
    }

    const newMember: FamilyMember = {
      name: formData.name,
      dob: formData.dob,
      gender: formData.gender,
      relationship: formData.relationship,
      parentId: formData.parentId || undefined,
    };

    try {
      await addMember({
        familyId,
        member: normalizeObjectStrings(newMember),
      }).unwrap();
      setShowAddMemberModal(false);
      resetForm();
      showSnackbar('Family member added successfully');
    } catch (err) {
      showSnackbar('Failed to add family member', 'error');
    }
  };

  const handleUpdateMember = async () => {
    if (!selectedMember || !formData.name || !formData.relationship) {
      return;
    }

    try {
      await updateMember({
        familyId,
        memberId: selectedMember.id!,
        member: normalizeObjectStrings(formData),
      }).unwrap();
      showSnackbar('Family member updated successfully');
      setShowAddMemberModal(false);
      setSelectedMember(null);
      resetForm();
    } catch (err) {
      showSnackbar('Failed to update family member', 'error');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      dob: new Date(),
      gender: 'Male',
      relationship: '',
      parentId: '',
    });
  };

  const handleEditMember = (member: FamilyMember) => {
    setSelectedMember(member);
    setFormData({
      name: member.name,
      dob: member.dob ? new Date(member.dob) : new Date(),
      gender: member.gender,
      relationship: member.relationship,
      parentId: member.parentId || '',
    });
    setShowAddMemberModal(true);
  };

  const handleAddBtnClick = () => {
    setSelectedMember(null);
    resetForm();
    setShowAddMemberModal(true);
  };

  const isEditAllowed = useMemo(
    () => canEditFamily(family?.id!) || isAdmin,
    [family],
  );

  if (isFetching || isLoading) {
    return (
      <LoadingSpinner loading={isFetching || isLoading} text="Loading...">
        <></>
      </LoadingSpinner>
    );
  }
  return (
    <>
      <StatusBanner userId={family?.head_user_id!} status={family?.status!} />
      <FlatList
        data={family!.members || []}
        renderItem={({item}) => (
          <MemberCard
            key={item.id}
            member={item}
            nameById={nameById}
            onEdit={handleEditMember}
            isEditAllowed={isEditAllowed}
          />
        )}
        ListHeaderComponent={
          <FamilyDetailHeader
            family={family!}
            onAdd={handleAddBtnClick}
            isEditAllowed={isEditAllowed}
          />
        }
        ListEmptyComponent={<EmptyComponent msg="No member found." />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 32, paddingTop: 4}}
        keyboardShouldPersistTaps="handled"
      />

      {showAddMemberModal && (
        <FamilyMemberForm
          isLoading={isAdding || isUpdating}
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
      )}
    </>
  );
};

export default FamilyDetailsContainer;

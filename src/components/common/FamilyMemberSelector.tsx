import React from 'react';
import {useNavigation} from '@react-navigation/native';
import ReusableSelector from './ReusableSelector';
import {FamilyMember} from '../family/types';
import SearchSelectorListener from './SearchSelectorListener';

const FamilyMemberSelector = ({route}: any) => {
  const navigation = useNavigation();
  const {members, onSelect, title = 'Select Family Member'} = route.params;
  const handleSelect = (member: FamilyMember) => {
    SearchSelectorListener.emit(member);
    if (onSelect) onSelect(member);
    navigation.goBack();
  };

  return (
    <ReusableSelector
      data={members}
      labelKey="label"
      valueKey="value"
      onSelect={handleSelect}
      searchPlaceholder="Search by name"
    />
  );
};

export default FamilyMemberSelector;

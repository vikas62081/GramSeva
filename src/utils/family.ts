import {FamilyMember} from '../components/family/types';

export const getFamilyDropdownOptions = (family: FamilyMember) => {
  if (!family) return [];

  const options = [
    {
      label: family.name,
      value: family.id,
    },
    ...(family.members ?? []).map((member: FamilyMember) => ({
      label: member.name,
      value: member.id,
    })),
  ];

  return options;
};

export interface FamilyData {
  familyId: string;
  headOfFamily: string;
  members: FamilyMember[];
}

export interface MemberCardProps {
  member: FamilyMember;
  onClick: (member: FamilyMember) => void;
}

export interface Family {
  id: string;
  name: string;
  relationship: string;
  memberCount: number;
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  parentId?: string;
  gender: string;
  dob?: string;
  members?: FamilyMember[];
}

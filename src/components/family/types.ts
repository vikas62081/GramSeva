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
  id?: string;
  name: string;
  gender: string;
  relationship: string;
  members: number;
  phone: string;
}

export interface FamilyMember {
  id?: string;
  name: string;
  gender: string;
  dob: Date;
  relationship: string;
  parentId?: string;
  members?: FamilyMember[];
}

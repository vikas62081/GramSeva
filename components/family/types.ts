export interface FamilyMember {
  userId: string;
  name: string;
  dobYear: number;
  gender: string;
  relationship: string;
  profilePicture: string;
}

export interface FamilyData {
  familyId: string;
  headOfFamily: string;
  members: FamilyMember[];
}

export interface MemberCardProps {
  member: FamilyMember;
  onClick: (member: FamilyMember) => void;
}

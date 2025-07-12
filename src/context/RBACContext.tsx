import React, {createContext, useContext, ReactNode, useMemo} from 'react';
import {useAuth} from './AuthContext';

// Enums for role and status
export enum UserRole {
  admin = 'Admin',
  editor = 'Editor',
  user = 'User',
}

export enum UserStatus {
  pending = 'Pending',
  active = 'Active',
  suspended = 'Suspended',
}

interface RBACContextType {
  isAdmin: boolean;
  isActiveUser: boolean;
  isPendingUser: boolean;
  canEditFamily: (familyId: string) => boolean;
  canEditSelf: (userId: string) => boolean;
}

const RBACContext = createContext<RBACContextType | undefined>(undefined);

interface RBACProviderProps {
  children: ReactNode;
}

export const RBACProvider: React.FC<RBACProviderProps> = ({children}) => {
  const {user} = useAuth();

  const isAdmin = useMemo(() => user?.role === UserRole.admin, [user?.role]);
  const isActiveUser = useMemo(
    () => user?.status === UserStatus.active,
    [user?.status],
  );
  const isPendingUser = useMemo(
    () => user?.status === UserStatus.pending,
    [user?.status],
  );

  // Determines if a user can edit their own data
  const canEditFamily = (familyId: string): boolean => {
    return user?.family_id === familyId;
  };

  const canEditSelf = (userId: string): boolean => {
    return user?.id === userId && user.status === UserStatus.active;
  };

  const value = useMemo(
    () => ({
      isAdmin,
      isActiveUser,
      isPendingUser,
      canEditFamily,
      canEditSelf,
    }),
    [isAdmin, isActiveUser, isPendingUser, user?.id, user?.status],
  );

  return <RBACContext.Provider value={value}>{children}</RBACContext.Provider>;
};

export const useRBAC = (): RBACContextType => {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error('useRBAC must be used within an RBACProvider');
  }
  return context;
};

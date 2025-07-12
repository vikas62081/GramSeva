import React, {createContext, useContext, ReactNode, useMemo} from 'react';
import {useAuth} from './AuthContext';

export enum UserRole {
  admin = 'admin',
  editor = 'editor',
  viewer = 'viewer',
}

export enum UserStatus {
  pending = 'pending',
  active = 'active',
  inactive = 'inactive',
  suspended = 'suspended',
}

interface RBACContextType {
  isAdmin: boolean;
  isActiveUser: boolean;
  isPendingUser: boolean;
  canEditSelf: (userId: string) => boolean;
}

const RBACContext = createContext<RBACContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const RBACProvider: React.FC<Props> = ({children}) => {
  const {user} = useAuth();

  const isAdmin = useMemo(() => user?.role === UserRole.admin, [user]);
  const isActiveUser = useMemo(
    () => user?.status === UserStatus.active,
    [user],
  );
  const isPendingUser = useMemo(
    () => user?.status === UserStatus.pending,
    [user],
  );

  const canEditSelf = (userId: string) =>
    user?.status === UserStatus.active && user?.id === userId;

  const value = useMemo(
    () => ({isAdmin, isActiveUser, isPendingUser, canEditSelf}),
    [isAdmin, isActiveUser, isPendingUser, canEditSelf],
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

import {useGetUserQuery} from '../store/slices/userApiSlice';
import {useAuth} from '../context/AuthContext';
import {useRefreshControl} from './useRefreshControl';

export const useUserRefresh = () => {
  const {user} = useAuth();

  const {refetch: refetchUser} = useGetUserQuery(user?.id!, {
    skip: !user?.id,
  });

  const refreshUserData = async () => {
    if (user?.id) {
      await refetchUser();
    }
  };

  return useRefreshControl(refreshUserData);
};

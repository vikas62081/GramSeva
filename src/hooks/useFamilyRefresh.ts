import {useCallback, useState} from 'react';
import {useGetFamilyByIdQuery} from '../store/slices/familyApiSlice';

export function useFamilyRefresh(familyId: string) {
  const {refetch} = useGetFamilyByIdQuery(familyId);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  return {refreshing, onRefresh};
}

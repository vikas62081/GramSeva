import {useCallback, useEffect, useState} from 'react';

interface UsePreviewListProps<T> {
  queryHook: (params: any) => {
    data?: {data?: T[]};
    isLoading: boolean;
    isFetching: boolean;
    error?: unknown;
    refetch: () => Promise<any>;
  };
  queryParams?: Record<string, any>;
  limit?: number;
}

interface UsePreviewListReturn<T> {
  data: T[];
  isLoading: boolean;
  isFetching: boolean;
  error?: unknown;
  refetch: () => void;
}

export function usePreviewList<T>({
  queryHook,
  queryParams = {},
  limit = 5,
}: UsePreviewListProps<T>): UsePreviewListReturn<T> {
  const [data, setData] = useState<T[]>([]);

  const {
    data: response,
    isLoading,
    isFetching,
    error,
    refetch,
  } = queryHook({
    ...queryParams,
    limit,
  });

  // Update local data only when response changes
  useEffect(() => {
    const list = Array.isArray(response?.data) ? response?.data : [];
    setData(list);
  }, [response]);

  const handleRefresh = useCallback(() => {
    try {
      refetch();
    } catch (err) {
      console.error('Preview list refresh failed:', err);
    }
  }, [refetch]);

  return {
    data,
    isLoading,
    isFetching,
    error,
    refetch: handleRefresh,
  };
}

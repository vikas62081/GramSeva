import {useState, useEffect, useCallback, useRef} from 'react';
import {Pagination} from '../store/types';

interface UsePaginatedListProps<T> {
  queryHook: (params: Record<string, any>) => {
    data?: Pagination<T[]>;
    isLoading: boolean;
    isFetching: boolean;
    refetch: () => void;
  };
  queryParams?: Record<string, any>;
  limit?: number;
  searchDebounceMs?: number;
  accumulateData?: boolean;
}

interface UsePaginatedListReturn<T> {
  data: T[];
  pagination: Pagination<T[]> | null;
  isLoading: boolean;
  isFetching: boolean;
  isRefreshing: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleLoadMore: () => void;
  handleRefresh: () => void;
  handleSearch: (query: string) => void;
  hasMorePages: boolean;
  currentPage: number;
  refetch: () => void;
}

export function usePaginatedList<T>({
  queryHook,
  queryParams = {},
  limit = 10,
  searchDebounceMs = 300,
  accumulateData = true,
}: UsePaginatedListProps<T>): UsePaginatedListReturn<T> {
  const [params, setParams] = useState({
    page: 1,
    limit,
    search: '',
  });

  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [combinedData, setCombinedData] = useState<T[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshToken, setRefreshToken] = useState(0);

  const searchChangedRef = useRef(false);

  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      const trimmed = params.search.trim();
      if (trimmed !== debouncedSearch) {
        searchChangedRef.current = true;
        setDebouncedSearch(trimmed);
      }
    }, searchDebounceMs);

    return () => clearTimeout(timeout);
  }, [params.search, searchDebounceMs, debouncedSearch]);

  // Reset to page 1 when search is debounced
  useEffect(() => {
    if (!searchChangedRef.current) return;

    searchChangedRef.current = false;
    setCombinedData([]);
    setParams(prev => ({...prev, page: 1}));
  }, [debouncedSearch]);

  // Whether to actually run the query
  const shouldQuery = !(searchChangedRef.current && params.page > 1);

  const {
    data: response,
    isLoading,
    isFetching,
    refetch,
  } = shouldQuery
    ? queryHook({
        ...queryParams,
        page: params.page,
        limit: params.limit,
        search: debouncedSearch || undefined,
        refreshToken,
      })
    : {data: undefined, isLoading: false, isFetching: false, refetch: () => {}};

  // Accumulate or replace data
  useEffect(() => {
    if (!response) return;

    const newData = response.data ?? [];

    setCombinedData(prev =>
      accumulateData && params.page > 1 ? [...prev, ...newData] : newData,
    );
  }, [response]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setCombinedData([]);
    setParams(prev => ({...prev, page: 1}));
    setRefreshToken(prev => prev + 1);
    setTimeout(() => setIsRefreshing(false), 500);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (
      response &&
      !isFetching &&
      !searchChangedRef.current &&
      params.page < response.total_pages
    ) {
      setParams(prev => ({...prev, page: prev.page + 1}));
    }
  }, [response, isFetching, params.page]);

  const handleSearch = useCallback((query: string) => {
    searchChangedRef.current = true;
    setParams(prev => ({...prev, search: query, page: 1}));
  }, []);

  return {
    data: accumulateData ? combinedData : response?.data ?? [],
    pagination: response ?? null,
    isLoading,
    isFetching,
    isRefreshing,
    searchQuery: params.search,
    setSearchQuery: query =>
      setParams(prev => ({...prev, search: query, page: 1})),
    handleLoadMore,
    handleRefresh,
    handleSearch,
    hasMorePages: response ? params.page < response.total_pages : false,
    currentPage: params.page,
    refetch,
  };
}

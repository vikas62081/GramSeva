import {useState, useEffect, useCallback, useRef} from 'react';
import {Pagination} from '../store/types';

interface UsePaginatedListProps<T> {
  queryHook: any;
  queryParams?: Record<string, any>;
  limit?: number;
  searchDebounceMs?: number;
  accumulateData?: boolean;
}

interface UsePaginatedListReturn<T> {
  data: T[];
  pagination: Pagination<T[]> | null;
  allData: T[];
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
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [allData, setAllData] = useState<T[]>([]);
  const [paginationInfo, setPaginationInfo] = useState<Pagination<T[]> | null>(
    null,
  );
  const lastFetchedPageRef = useRef<number>(0);

  const {
    data: response,
    isLoading,
    isFetching,
    refetch,
  } = queryHook({
    page: currentPage,
    limit,
    search: debouncedSearchQuery || undefined,
    ...queryParams,
  });

  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, searchDebounceMs);

    return () => clearTimeout(timeout);
  }, [searchQuery, searchDebounceMs]);

  // Reset data on new search
  useEffect(() => {
    setCurrentPage(1);
    setAllData([]);
    setPaginationInfo(null);
    lastFetchedPageRef.current = 0;
  }, [debouncedSearchQuery]);

  // Process response
  useEffect(() => {
    const responseData = Array.isArray(response)
      ? response
      : response?.data ?? [];

    if (!responseData) return;

    const newData =
      currentPage === 1 ? responseData : [...allData, ...responseData];

    // Avoid setting same data repeatedly
    if (JSON.stringify(newData) !== JSON.stringify(allData)) {
      setAllData(newData);
    }

    lastFetchedPageRef.current = currentPage;

    setPaginationInfo({
      data: responseData,
      page: currentPage,
      limit,
      total_pages:
        response?.total_pages ??
        (responseData.length === limit ? currentPage + 1 : currentPage),
      total_count: response?.total_count ?? newData.length,
    });
  }, [response]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    setCurrentPage(1);
    setAllData([]);
    setPaginationInfo(null);
    lastFetchedPageRef.current = 0;
    try {
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  }, [refetch]);

  const handleLoadMore = useCallback(() => {
    const hasMore = paginationInfo
      ? currentPage < paginationInfo.total_pages
      : true;

    if (hasMore && lastFetchedPageRef.current !== currentPage + 1) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, paginationInfo]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const hasMorePages = paginationInfo
    ? currentPage < paginationInfo.total_pages
    : false;

  return {
    data: allData,
    pagination: paginationInfo,
    allData,
    isLoading,
    isFetching,
    isRefreshing,
    searchQuery,
    setSearchQuery,
    handleLoadMore,
    handleRefresh,
    handleSearch,
    hasMorePages,
    currentPage,
    refetch,
  };
}

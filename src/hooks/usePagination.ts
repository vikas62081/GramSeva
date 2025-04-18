import {useState} from 'react';

interface PaginationOptions<T> {
  initialPage?: number;
  initialSearch?: Record<string, string> | string | null;
  initialData?: T[];
}

const usePagination = <T>({
  initialPage = 1,
  initialSearch = null,
  initialData = [],
}: PaginationOptions<T> = {}) => {
  const [data, setData] = useState<T[]>(initialData);
  const [paginationState, setPaginationState] = useState({
    page: initialPage,
    search: initialSearch,
  });

  const updateData = (newDataset: T[]) => {
    setData(prev => [...prev, ...newDataset]);
  };

  const updatePage = async (newPage = paginationState.page) => {
    await setPaginationState(pre => ({...pre, page: newPage + 1}));
  };

  const updateSearch = (newSearch: string | Record<string, string>) => {
    setPaginationState(pre => ({
      ...pre,
      page: initialPage,
      search:
        typeof newSearch == 'string'
          ? newSearch
          : {...(pre.search as Record<string, string>), ...newSearch},
    }));
    setData([]);
  };

  const handleRefresh = () => {
    updateSearch('hey');
  };

  return {
    data,
    paginationState,
    setData,
    updateData,
    updateSearch,
    updatePage,
  };
};

export default usePagination;

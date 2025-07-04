import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {usePaginatedList} from '../../hooks/usePaginatedList';
import {useGetFamiliesQuery} from '../../store/slices/familyApiSlice';

import ReusableSelector from './ReusableSelector';
import SearchSelectorListener from './SearchSelectorListener';

const FamilyHeadSelector = ({route}: any) => {
  const navigation = useNavigation();
  const {onSelect, people: peopleParam} = route.params || {};

  let people: {id: string; name: string}[] = [];
  let isLoading = false;
  let isFetching = false;
  let handleLoadMore = () => {};
  let handleRefresh = () => {};
  let searchQuery = '';
  let setSearchQuery = (q: string) => {};
  let hasMorePages = false;
  let searchFn;

  if (peopleParam && Array.isArray(peopleParam)) {
    people = peopleParam;
  } else {
    const paginated = usePaginatedList<any>({
      queryHook: useGetFamiliesQuery,
      limit: 10,
      accumulateData: true,
    });
    people = paginated.data;
    isLoading = paginated.isLoading;
    isFetching = paginated.isFetching;
    handleLoadMore = paginated.handleLoadMore;
    handleRefresh = paginated.handleRefresh;
    searchQuery = paginated.searchQuery;
    setSearchQuery = paginated.setSearchQuery;
    hasMorePages = paginated.hasMorePages;
    searchFn = setSearchQuery;
  }

  const handleSelect = (person: {id: string; name: string}) => {
    SearchSelectorListener.emit(person);
    if (onSelect) onSelect(person);
    navigation.goBack();
  };

  return (
    <ReusableSelector
      data={people}
      labelKey="name"
      valueKey="id"
      onSelect={handleSelect}
      searchFn={searchFn}
      isLoading={isLoading}
      isFetching={isFetching}
      onLoadMore={handleLoadMore}
      onRefresh={handleRefresh}
      hasMorePages={hasMorePages}
      searchPlaceholder="Search by name"
    />
  );
};

export default FamilyHeadSelector;

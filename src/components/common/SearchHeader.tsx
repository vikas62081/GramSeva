import React, {useState, useEffect, useCallback, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {Appbar, Searchbar, Divider} from 'react-native-paper';
import {placeholderTextColor} from '../../theme';

// Debounce hook
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

interface SearchHeaderProps {
  title: string;
  onSearch: (query: string) => void;
  onAdd?: () => void;
  addIcon?: string;
  placeholder?: string;
  debounceDelay?: number;
  isFetching?: boolean;
  showAddButton?: boolean;
  goBack?: () => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({
  title,
  onSearch,
  onAdd,
  addIcon = 'add',
  placeholder = 'Search...',
  debounceDelay = 300,
  isFetching = false,
  showAddButton = true,
  goBack = null,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const lastSearchRef = useRef('');

  // Debounce search query
  const debouncedSearchQuery = useDebounce(searchQuery, debounceDelay);

  // Check if search is loading
  const isSearchLoading = isFetching;
  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Toggle search visibility
  const toggleSearch = useCallback(() => {
    setIsSearchVisible(!isSearchVisible);
    if (isSearchVisible) {
      setSearchQuery('');
    }
  }, [isSearchVisible]);

  // Call onSearch when debounced value changes (only if different from last search)
  useEffect(() => {
    if (debouncedSearchQuery !== lastSearchRef.current) {
      lastSearchRef.current = debouncedSearchQuery;
      onSearch(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery, onSearch]);

  return (
    <>
      {isSearchVisible ? (
        <Appbar.Header style={{paddingHorizontal: 0}}>
          {/* <Appbar.Action icon="arrow-back" onPress={toggleSearch} /> */}
          <Searchbar
            loading={isSearchLoading}
            placeholder={placeholder}
            onChangeText={handleSearch}
            value={searchQuery}
            onIconPress={toggleSearch}
            style={styles.headerSearchBar}
            autoFocus
            clearIcon="close"
            icon="arrow-back"
            inputStyle={styles.searchInput}
            mode="view"
            showDivider={false}
            placeholderTextColor={placeholderTextColor}
          />
          <Divider />
        </Appbar.Header>
      ) : (
        <Appbar.Header>
          {goBack && <Appbar.Action icon="arrow-back" onPress={goBack} />}
          <Appbar.Content title={title} />
          <Appbar.Action icon="search" onPress={toggleSearch} />
          {showAddButton && onAdd && (
            <Appbar.Action mode="contained" icon={addIcon} onPress={onAdd} />
          )}
        </Appbar.Header>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  headerSearchBar: {
    elevation: 4,
    flex: 1,
    height: 48,
    backgroundColor: 'transparent',
    borderColor: '#ddd',
    borderBottomWidth: 1,
  },
  searchInput: {
    color: '#222',
    alignSelf: 'auto',
  },
});

export default SearchHeader;

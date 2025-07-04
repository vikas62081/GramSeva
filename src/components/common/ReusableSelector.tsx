import React, {useState, useMemo, useCallback} from 'react';
import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {
  Text,
  Searchbar,
  ActivityIndicator,
  Surface,
  Appbar,
} from 'react-native-paper';

interface ReusableSelectorProps<T> {
  data: T[];
  labelKey: string;
  valueKey: string;
  onSelect: (item: T) => void;
  searchFn?: (query: string) => void; // If provided, triggers server-side search
  isLoading?: boolean;
  isFetching?: boolean;
  onLoadMore?: () => void;
  onRefresh?: () => void;
  hasMorePages?: boolean;
  searchPlaceholder?: string;
  headerTitle?: string;
}

function ReusableSelector<T extends Record<string, any>>({
  data,
  labelKey,
  valueKey,
  onSelect,
  searchFn,
  isLoading = false,
  isFetching = false,
  onLoadMore,
  onRefresh,
  hasMorePages = false,
  searchPlaceholder = 'Search...',
  headerTitle = 'Select Item',
}: ReusableSelectorProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');

  // Client-side filter if no searchFn
  const filteredData = useMemo(() => {
    if (searchFn) return data;
    if (!searchQuery) return data;
    return data.filter(item =>
      String(item[labelKey]).toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [data, labelKey, searchQuery, searchFn]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (searchFn) searchFn(query);
  };

  const renderItem = useCallback(
    ({item}: {item: T}) => (
      <TouchableOpacity style={styles.row} onPress={() => onSelect(item)}>
        <Text style={styles.name}>{item[labelKey]}</Text>
      </TouchableOpacity>
    ),
    [onSelect, labelKey],
  );

  return (
    <Surface style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title={headerTitle} />
      </Appbar.Header>
      <View style={{padding: 16}}>
        <Searchbar
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChangeText={handleSearch}
          style={styles.searchBar}
          icon="search"
          clearIcon="close"
        />
        {isLoading ? (
          <ActivityIndicator style={{marginTop: 24}} />
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={item => String(item[valueKey])}
            renderItem={renderItem}
            onEndReached={() => {
              if (hasMorePages && !isFetching && onLoadMore) onLoadMore();
            }}
            onRefresh={onRefresh}
            refreshing={isFetching}
            ListEmptyComponent={
              <Text style={{textAlign: 'center', marginTop: 32}}>
                No results found.
              </Text>
            }
            style={{maxHeight: 400}}
          />
        )}
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchBar: {
    marginBottom: 12,
    borderRadius: 8,
  },
  row: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  name: {
    fontSize: 16,
    color: '#222',
  },
});

export default ReusableSelector;

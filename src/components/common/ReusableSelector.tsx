import {useNavigation} from '@react-navigation/native';
import React, {useState, useMemo, useCallback} from 'react';
import {FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {
  Text,
  Searchbar,
  ActivityIndicator,
  Surface,
  Divider,
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
}: ReusableSelectorProps<T>) {
  const navigation = useNavigation();
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
      <Searchbar
        placeholder={searchPlaceholder}
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.searchBar}
        inputStyle={styles.searchInput}
        icon="arrow-back"
        clearIcon="close"
        mode="view"
        showDivider={false}
        onIconPress={() => navigation.goBack()}
        placeholderTextColor={'#999'}
      />
      <Divider />
      {isLoading ? (
        <ActivityIndicator style={{marginTop: 24}} />
      ) : (
        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 12,
          }}
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
        />
      )}
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    backgroundColor: 'transparent',
    height: 56,
    borderColor: '#ddd',
    borderBottomWidth: 1,
  },
  searchInput: {
    color: '#222',
    alignSelf: 'auto',
  },
  row: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  name: {
    fontSize: 16,
    color: '#222',
  },
});

export default ReusableSelector;

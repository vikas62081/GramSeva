import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({onSearch}) => {
  const [query, setQuery] = useState('');

  const handleSearch = (text: string) => {
    setQuery(text);
    onSearch(text);
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Members"
        placeholderTextColor="#999" // Ensures placeholder is visible
        value={query}
        onChangeText={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
  },
  searchInput: {
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
});

export default Search;

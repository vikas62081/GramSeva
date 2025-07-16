import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Animated,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {placeholderTextColor} from '../../theme';

interface TabHeaderProps {
  title: string;
  onAdd?: () => void;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
  rightIcon?: string;
  onRightIconPress?: () => void;
}

const TabHeader: React.FC<TabHeaderProps> = ({
  title,
  onAdd,
  showSearch = false,
  onSearch,
  rightIcon,
  onRightIconPress,
}) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchWidth = new Animated.Value(0);

  const toggleSearch = () => {
    const toValue = isSearchVisible ? 0 : 1;
    setIsSearchVisible(!isSearchVisible);
    Animated.spring(searchWidth, {
      toValue,
      useNativeDriver: false,
    }).start();
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    onSearch?.(text);
  };

  const closeSearch = () => {
    handleSearch('');
    toggleSearch();
  };
  return (
    <View style={styles.header}>
      {isSearchVisible ? (
        <Animated.View
          style={[
            styles.searchContainer,
            {
              width: searchWidth.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor={placeholderTextColor}
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus
          />
        </Animated.View>
      ) : (
        <Text style={styles.headerTitle}>{title}</Text>
      )}
      <View style={styles.rightIcons}>
        {showSearch && (
          <TouchableOpacity onPress={closeSearch} style={styles.iconButton}>
            <MaterialIcons
              name={isSearchVisible ? 'close' : 'search'}
              size={24}
              color="#1A1A1A"
            />
          </TouchableOpacity>
        )}
        {onAdd && !isSearchVisible && (
          <TouchableOpacity style={styles.createButton} onPress={onAdd}>
            <MaterialIcons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        )}
        {rightIcon && onRightIconPress && !isSearchVisible && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.iconButton}>
            <MaterialIcons name={rightIcon} size={24} color="#1A1A1A" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1A1A1A',
    flex: 1,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  createButton: {
    backgroundColor: '#63C7A6',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchContainer: {
    flex: 1,
    marginRight: 16,
  },
  searchInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1A1A1A',
  },
});

export default TabHeader;

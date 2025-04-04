import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import TabHeader from '../common/TabHeader';
import {Family} from './types';
import Member from './Member';
import {FlatList} from 'react-native';

type RootStackParamList = {
  PeopleList: undefined;
  PeopleDetails: {familyId: string};
};

type PeopleScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PeopleList'
>;

interface PeopleScreenProps {
  navigation: PeopleScreenNavigationProp;
}

const PeopleContainer: React.FC<PeopleScreenProps> = ({navigation}) => {
  const [families, setFamilies] = useState<Family[]>([
    {id: '1', name: 'John Doe', relationship: 'Head', memberCount: 7},
    {id: '2', name: 'Jane Smith', relationship: 'Manager', memberCount: 5},
    {id: '3', name: 'Sara Connor', relationship: 'Assistant', memberCount: 4},
  ]);

  const [filteredFamilies, setFilteredFamilies] = useState(families);

  const handleSearch = (query: string) => {
    if (query === '') {
      setFilteredFamilies(families);
    } else {
      setFilteredFamilies(
        families.filter(family =>
          family.name.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    }
  };

  const handleFamilyPress = (familyId: string) => {
    navigation.navigate('PeopleDetails', {familyId});
  };

  const handleAddFamily = () => {
    // TODO: Implement add family functionality
    console.log('Add family pressed');
  };

  return (
    <View style={styles.container}>
      <TabHeader
        title="People"
        showSearch
        onSearch={handleSearch}
        onAdd={handleAddFamily}
      />
      <View style={styles.content}>
        <FlatList
          data={filteredFamilies}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Member key={item.id} family={item} onPress={handleFamilyPress} />
          )}
          ListEmptyComponent={
            <Text style={{textAlign: 'center', marginTop: 120}}>
              No members found.
            </Text>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default PeopleContainer;

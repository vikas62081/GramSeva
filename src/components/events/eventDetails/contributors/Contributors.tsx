import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ContributorsProps, Contributor} from '../../types';
import ContributorForm from './ContributorForm';
import {formatDate} from '../../../../utils';

const Contributors: React.FC<ContributorsProps> = ({
  contributors,
  onAddContributor,
  onEditContributor,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedContributor, setSelectedContributor] = useState<
    Contributor | undefined
  >();

  const handleSubmit = (data: {name: string; amount: number}) => {
    if (selectedContributor) {
      onEditContributor({
        ...data,
        id: selectedContributor.id,
        date: selectedContributor.date,
      });
    } else {
      onAddContributor(data);
    }
    setShowForm(false);
    setSelectedContributor(undefined);
  };

  const handleEdit = (contributor: Contributor) => {
    setSelectedContributor(contributor);
    setShowForm(true);
  };

  const renderItem = ({item}: {item: Contributor}) => (
    <TouchableOpacity
      onPress={() => {
        handleEdit(item);
      }}>
      <View style={styles.contributorCard}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="person" size={28} color="#63C7A6" />
        </View>
        <View style={styles.contributorInfo}>
          <Text style={styles.contributorName}>{item.name}</Text>
          <Text style={styles.contributorDate}>{formatDate(item.date)}</Text>
        </View>
        <Text style={styles.contributorAmount}>₹{item.amount}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Contributors</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setSelectedContributor(undefined);
            setShowForm(true);
          }}>
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={contributors}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      <ContributorForm
        visible={showForm}
        onClose={() => {
          setShowForm(false);
          setSelectedContributor(undefined);
        }}
        onSubmit={handleSubmit}
        initialData={selectedContributor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 20,
  },
  contributorCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  contributorInfo: {
    flex: 1,
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#B2E6D5', // Light blue background
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  contributorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  contributorDate: {
    fontSize: 13,
    color: '#777',
  },
  contributorAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28A745',
  },
});

export default Contributors;

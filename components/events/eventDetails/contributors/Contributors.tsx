import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ContributorsProps, Contributor} from '../../types';
import ContributorForm from './ContributorForm';

const Contributors: React.FC<ContributorsProps> = ({
  contributors,
  onAddContributor,
  onEditContributor,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedContributor, setSelectedContributor] = useState<
    Contributor | undefined
  >();

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
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
    <View style={styles.contributorCard}>
      <View style={styles.contributorInfo}>
        <Text style={styles.contributorName}>{item.name}</Text>
        <Text style={styles.contributorDate}>{formatDate(item.date)}</Text>
        <Text style={styles.contributorAmount}>₹{item.amount}</Text>
      </View>
      <TouchableOpacity onPress={() => handleEdit(item)}>
        <MaterialIcons name="edit" size={24} color="#666" />
      </TouchableOpacity>
    </View>
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
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
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
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contributorInfo: {
    flex: 1,
  },
  contributorName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  contributorDate: {
    fontSize: 12,
    color: '#666',
  },
  contributorAmount: {
    fontSize: 14,
    color: '#666',
  },
});

export default Contributors;

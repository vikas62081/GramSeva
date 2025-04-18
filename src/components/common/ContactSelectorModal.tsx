import React, {useState} from 'react';
import {
  View,
  FlatList,
  SectionList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Modal,
  Portal,
  Text,
  Searchbar,
  List,
  RadioButton,
  Button,
  Surface,
} from 'react-native-paper';

type Contact = {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  owes?: string;
};

type Section = {
  title: string;
  data: Contact[];
};

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onSelect: (contact: Contact | null) => void;
  sections: Section[];
};

const ContactSelectorModal = ({
  visible,
  onDismiss,
  onSelect,
  sections,
}: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredSections = sections
    .map(section => ({
      ...section,
      data: section.data.filter(
        contact =>
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.phone.includes(searchQuery),
      ),
    }))
    .filter(section => section.data.length > 0);

  const handleSelect = (contact: Contact) => {
    setSelectedId(contact.id);
    onSelect(contact);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}>
        <Surface style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Contacts</Text>
            <Button onPress={onDismiss} mode="text" compact>
              Done
            </Button>
          </View>

          <Searchbar
            placeholder="Name, phone or card number"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchBar}
          />

          <RadioButton.Group
            onValueChange={val => setSelectedId(val)}
            value={selectedId || ''}>
            <SectionList
              sections={filteredSections}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => handleSelect(item)}>
                  <Image source={{uri: item.avatar}} style={styles.avatar} />
                  <View style={styles.contactInfo}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.phone}>{item.phone}</Text>
                  </View>
                  {item.owes && (
                    <Surface style={styles.owesTag}>
                      <Text style={styles.owesText}>{item.owes}</Text>
                    </Surface>
                  )}
                  <RadioButton value={item.id} />
                </TouchableOpacity>
              )}
              renderSectionHeader={({section}) => (
                <Text style={styles.sectionHeader}>{section.title}</Text>
              )}
            />
          </RadioButton.Group>
        </Surface>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    maxHeight: '90%',
  },
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchBar: {
    marginBottom: 12,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
  },
  phone: {
    color: '#777',
  },
  owesTag: {
    backgroundColor: '#CFFCF1',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 8,
  },
  owesText: {
    fontSize: 12,
    color: '#0E9F6E',
  },
  sectionHeader: {
    marginTop: 16,
    fontWeight: '700',
    fontSize: 14,
    color: '#999',
  },
});

export default ContactSelectorModal;

{
  /* <ContactSelectorModal
  visible={showModal}
  onDismiss={() => setShowModal(false)}
  onSelect={(contact) => {
    console.log('Selected contact:', contact);
    setShowModal(false);
  }}
  sections={[
    {
      title: 'M',
      data: [
        { id: '1', name: 'Marion Nash', phone: '191-900-1830', avatar: 'https://i.pravatar.cc/150?img=1' },
        { id: '2', name: 'Miguel Walters', phone: '313-287-8383', avatar: 'https://i.pravatar.cc/150?img=2', owes: 'Owes you $20' },
      ],
    },
    {
      title: 'N',
      data: [
        { id: '3', name: 'Nathan Richards', phone: '035-238-8333', avatar: 'https://i.pravatar.cc/150?img=3' },
        { id: '4', name: 'Nickie Franklin', phone: '379-788-4623', avatar: 'https://i.pravatar.cc/150?img=4' },
        { id: '5', name: 'Nora Holland', phone: '543-198-2356', avatar: 'https://i.pravatar.cc/150?img=5' },
      ],
    },
  ]}
/> */
}

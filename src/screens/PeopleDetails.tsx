import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  SafeAreaView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import PageHeader from '../components/common/PageHeader';
import FormGroup from '../components/common/FormGroup';
import Pills from '../components/common/Pills';
import {
  PeopleDetailsScreenNavigationProp,
  PeopleDetailsScreenRouteProp,
} from '../navigation/types';
import PeopleDetailsContainer from '../components/people/peopleDetails';

interface PeopleDetailsScreenProps {
  navigation: PeopleDetailsScreenNavigationProp;
  route: PeopleDetailsScreenRouteProp;
}

const PeopleDetailsScreen: React.FC<PeopleDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Family Details" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <PeopleDetailsContainer navigation={navigation} route={route} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  content: {
    flex: 1,
    padding: 16,
  },
});

export default PeopleDetailsScreen;

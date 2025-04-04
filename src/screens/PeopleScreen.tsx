import React, {useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TabHeader from '../components/common/TabHeader';
import PeopleContainer from '../components/people';

type RootStackParamList = {
  PeopleList: undefined;
  PeopleDetails: {familyId: string};
};

type PeopleScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PeopleList'
>;

interface Family {
  id: string;
  name: string;
  relationship: string;
  memberCount: number;
}

interface PeopleScreenProps {
  navigation: PeopleScreenNavigationProp;
}

const PeopleScreen: React.FC<PeopleScreenProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <PeopleContainer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
});

export default PeopleScreen;

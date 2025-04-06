import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import FamilyContainer from '../components/family';

type RootStackParamList = {
  FamilyList: undefined;
  FamilyDetails: {familyId: string};
};

type FamilyScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'FamilyList'
>;

interface Family {
  id: string;
  name: string;
  relationship: string;
  memberCount: number;
}

interface FamilyScreenProps {
  navigation: FamilyScreenNavigationProp;
}

const FamilyScreen: React.FC<FamilyScreenProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <FamilyContainer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
});

export default FamilyScreen;

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
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
  const theme = useTheme();

  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <FamilyContainer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FamilyScreen;
